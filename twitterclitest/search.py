"""
  Simple client script to search tweets (pulling the amsterdam event).
"""
import os
import sys
import tweepy

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
    statuses = api.search(q='outage',geocode='52.3747157,4.898614,20km',count=10,since='2015-03-27',until='2015-03-28')
    if statuses:
        for status in statuses:
            print status

    
#    page = 1
#    while True:
#        statuses = api.search(q='outage',geocode='52.3747157%2C4.898614%2C20km',count=10,since='2015-03-27',until='2015-03-28')
#        if statuses:
#            for status in statuses:
#                print status
#        else:
#            # All done
#            break
#        break
#        page += 1  # next page

if __name__ == "__main__":
    main()


