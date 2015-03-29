# ripe-hackathon-disco
At the april 2015 RIPE Hackathon (the first one?!) this project was created. The aim of the project is to show realtime internet outages as a heatmap. This map should be enriched with 3rd party data, esp. Twitter trending topics.

The presentation can be found zipped in the presentation directory. It probably gives more background information. We hate writing readme's ;)

Trello Board
==========================
https://trello.com/b/azZsHxgX/ripe-hackathon-disco


Deploy Instances to AWS
==========================

    ansible-playbook -i hosts_hackathon.yml site.yml


Deploy Elasticsearch to AWS instance
==========================
Elasticsearch is deployed using a docker image.
 
* [merlijntishauser/elasticsearch](https://registry.hub.docker.com/u/merlijntishauser/elasticsearch/)
* [github repo](https://github.com/merlijntishauser/elastic)


    ansible-playbook -i hosts_hackathon.yml  deploy/elastic.yml

Setup a Twitter River to ElasticSearch
==========================

```json
{
  "type": "twitter",
  "twitter": {
    "oauth": {
      "consumer_key": "---your consumer key---",
      "consumer_secret": "--- your consumer secret ---",
      "access_token": "--- access application token ---",
      "access_token_secret": "--- and the application secret ---"
    },
    "filter": {
      "tracks": "flood,overstroming,poweroutage, stroomstoring,bliksem,lightning",
      "language": "nl,en"
    }
  },
  "index": {
    "index": "atlas_twitter_river",
    "type": "status",
    "bulk_size": 100,
    "flush_interval": "5s",
    "retry_after": "10s"
  }
}

```
