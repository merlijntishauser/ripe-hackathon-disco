# ripe-hackathon-disco
POC for hackathon

just a readme, fill me

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
