import psycopg2
import json
import os
from datetime import datetime
conn = psycopg2.connect(f"dbname={os.environ.get('PGDATABASE')} user={os.environ.get('PGUSER')} password={os.environ.get('PGPASSWORD')} host={os.environ.get('PGHOST')}")
class saveScript():
    def __init__(self):
        self.tableName = ['posts', 'users', 'have_tag', 'get_token']
        self.storedPath = './backup/'
        self.schema = {
            self.tableName[0]: ['id', 'title', 'banner', 'content', 'des', 'author', 'is_draft', 'publish_time'],
            self.tableName[1]: ['id', 'name', 'password'],
            self.tableName[2]: ['post_id', 'name'],
            self.tableName[3]: ['user_id', 'token']
        }
        self.saveFiles = {
            self.tableName[0]: 'posts.json',
            self.tableName[1]: 'users.json',
            self.tableName[2]: 'have_tag.json',
            self.tableName[3]: 'get_token.json'
        }
    def saveData(self, data):
        if isinstance(data, datetime):
            return data.timestamp()
        return data 
    def save(self, saveFile, query, querySchema):
        try :
            with open(saveFile, 'w') as f:
                json.dump({}, f)
            with conn.cursor() as curs:
                curs.execute(query)
                for result in curs.fetchall():
                    cache = {}
                    with open(saveFile, 'r') as f:
                        cache = json.load(f)
                    tmp = {}
                    for i, column in enumerate(querySchema[1:]):
                        tmp[column] = self.saveData(result[i + 1])
                    cache[result[0]] = tmp
                    with open(saveFile, 'w') as f:
                        json.dump(cache, f, indent=4)
        except Exception as e:
            print(e)
    def run(self):
        for t in self.tableName:
            query = f"SELECT {', '.join(self.schema[t])} FROM {t}"
            self.save(f"{self.storedPath}{self.saveFiles[t]}", query, self.schema[t])
        pass
Script = saveScript()
Script.run()
conn.close()
