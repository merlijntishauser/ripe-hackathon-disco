from datetime import datetime
from elasticsearch import Elasticsearch
es = Elasticsearch(['52.16.250.194'])

doc = {
    'author': 'apietila',
    'text': 'Elasticsearch: cool. bonsai cool.',
    'timestamp': datetime.now()
}
    
res = es.index(index="test-index", doc_type='tweet', id=1, body=doc)
print(res['created'])

res = es.get(index="test-index", doc_type='tweet', id=1)
print(res['_source'])
