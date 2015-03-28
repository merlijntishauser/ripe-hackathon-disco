import tweepy
from datetime import datetime
from elasticsearch import Elasticsearch

#ES_HOST='52.16.250.194'
ES_HOST='localhost:9200'
ES_INDEX='ams-tweet-index'
keywords = ['outage','power outage','stroom','stroomstoring']

def main():
    if (not 'TWITTER_KEY' in os.environ or
        not 'TWITTER_SECRET' in os.environ or
        not 'TWITTER_ATOKEN' in os.environ or
        not 'TWITTER_ASECRET' in os.environ):
        print 'set env TWITTER_*'
        sys.exit(-1);

    consumer_key = os.environ['TWITTER_KEY']
    consumer_secret = os.environ['TWITTER_SECRET']
    access_token = os.environ['TWITTER_ATOKEN']
    access_token_secret = os.environ['TWITTER_ASECRET']

    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)

    api = tweepy.API(auth)

    # fetch app keywords
    for kv in keywords:
        print kv,datetime.now()
        es = Elasticsearch([ES_HOST])
        for status in tweepy.Cursor(api.search, geocode='52.3747157,4.898614,20km',since='2015-03-27',until='2015-03-28',wait_on_rate_limit=True,wait_on_rate_limit_notify=True).items():
            # make sure we don't have dupl tweets
            check = es.search(index=ES_INDEX, q='id:'+str(status._json['id']))
            if (check and check['hits']['total'] > 0):
                continue
            res = es.index(index=ES_INDEX, doc_type='tweet', body=status._json)

if __name__ == "__main__":
    main()
