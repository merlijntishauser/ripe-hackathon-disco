"""
  Dump tweets of the Amsterdamn outage to elastic search.
"""
import os
import sys
import time
import tweepy
from datetime import datetime
from elasticsearch import Elasticsearch

ES_HOST='52.16.250.194'
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
        es = Elasticsearch([ES_HOST])
    
        page = 1
        while True:
            statuses = api.search(q=kv,geocode='52.3747157,4.898614,20km',count=100,since='2015-03-27',until='2015-03-28', page=page)
            print datetime.now(),page,kv,len(statuses)
            if statuses:
                for status in statuses:
                    res = es.index(index=ES_INDEX, doc_type='tweet', body=status)
            else:
                # All done
                break
            page += 1  # next page

        # now sleep for the window so we don't hit the rate limit
        time.sleep(15*60)
        
if __name__ == "__main__":
    main()



