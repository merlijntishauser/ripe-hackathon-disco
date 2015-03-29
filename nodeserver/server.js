var debug = require('debug')('disco-rest-node')
var _ = require('underscore');
var express = require('express');
var bodyParser = require('body-parser')
var es = require('elasticsearch');
var Twitter = require('twitter');
var geocoder = require('geocoder');

// configs in env
var esip = process.env.ES_HOST || 'elastic.thepanicbutton.nl';
var esport = process.env.ES_PORT || 9200;
var port = process.env.PORT || 3000;
var twconfig = {
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET,
    access_token_key: process.env.TWITTER_ATOKEN,
    access_token_secret: process.env.TWITTER_ASECRET
};

// init API clients
var esclient = new es.Client({
  host: esip+':'+esport,
  log: 'trace'
});

var twclient = new Twitter(twconfig);
var trendscache = [];
twclient.get('trends/available', {}, function(error, obj, response) {
    if (error) {
        console.error(error);
        process.exit(-1);
    }
    trendscache = obj;
});

var getwoeid = function(c, type) {
    type = type || 12; // country
    return _.find(trendscache, function(cr) {
        return (cr.placeType.code === type && cr.countryCode === c); 
    });
}

// main app
var app = express();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

// we'll be behind a proxy
app.enable('trust proxy');

// middleware
app.use(allowCrossDomain);
app.use(bodyParser.json());

// default error handler
app.use(function(err, req, res, next) {
    debug(err);
    debug(err.stack);
    res.type('application/json');
    res.status(500).send({ error: "internal server error",
			   details: err});
});

app.all('/trending', function(req, res) {
    debug(req.query);
    
    var handleerr = function(err) {
        res.status(500).send({ error: "internal server error",
			       details: err});
        return;
    }

    geocoder.reverseGeocode( req.query.lat, req.query.lng, function ( err, data ) {
        var place = { woeid : 1, name : "World" }; // default
        if (!err && data && data.results && data.results.length > 0) {
            var country = _.find(data.results[0].address_components, function(c) {
                console.log(c);
                return _.contains(c.types, 'country');
            });
            if (country) {
                place = getwoeid(country.short_name) || place;
            }
        }
        
        esclient.get({
            index: 'trending-index',
            type: 'trends',
            id: place.woeid
        }, function (error, response) {
            console.log(response);

            var ts = Date.now();
            if (!response || response.error || !response.found || (ts - response._source.queryts) > 5*60*1000) {
                // get/refresh trending topics
                twclient.get('trends/place', {id: place.woeid}, function(error, trends, resp) {
                    if (error) return handlerr(error);
                    
                    console.log(trends);

                    if (response.found) {
                        esclient.update({
                            index: 'trending-index',
                            type: 'trends',
                            id: place.woeid,
                            body: {
                                doc: {
                                    trends: trends,
                                    queryts : ts
                                }
                            }
                        }, function (error, response) {
                            if (error) console.error(error);
                        });
                    } else {                    
                        // cache to elastic search
                        esclient.create({
                            index: 'trending-index',
                            type: 'trends',
                            id: place.woeid,
                            body: {
                                place : place,
                                trends : trends,
                                queryts : ts
                            }
                        }, function (error, response) {
                            if (error) console.error(error);
                        });
                    }
                    
                    res.status(200).send(trends);
                });
            } else {
                // send cached topics
                res.status(200).send(response._source.trends);
            }
        });
    });
});

// just forward the query to the es rest API
app.all('/essearch/:idx', function(req, res) {
    esclient.search({
        index: req.params.idx,
        q: req.query.q
    }).then(function (body) {
        var hits = body.hits.hits;
        res.status(200).send(hits);
    }, function (error) {
        console.trace(error.message);
        res.status(500).send({ error: "internal server error",
			       details: error});
    });    
});

// start!
var server = app.listen(port, function() {
    debug("listening on %s:%d",
	  server.address().address, server.address().port);
});
