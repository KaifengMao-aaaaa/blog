import psycopg2
import json
import os
from datetime import datetime
conn = psycopg2.connect(f"dbname={os.environ.get('PGDATABASE')} user={os.environ.get('PGUSER')} password={os.environ.get('PGPASSWORD')} host={os.environ.get('PGHOST')}")
class restoreScript():
    def __init__(self):
        self.tableName = ['users', 'posts','have_tag', 'get_token']
        self.storedPath = './backup/'
        self.schema = {
            self.tableName[0]: ['id', 'name', 'password'],
            self.tableName[1]: ['id', 'title', 'banner', 'content', 'des', 'author', 'is_draft', 'publish_time'],
            self.tableName[2]: ['post_id', 'name'],
            self.tableName[3]: ['user_id', 'token']
        }
        self.saveFiles = {
            self.tableName[0]: 'users.json',
            self.tableName[1]: 'posts.json',
            self.tableName[2]: 'have_tag.json',
            self.tableName[3]: 'get_token.json'
        }
        self.timestampToDatetime = ['publish_time']
        conn.autocommit = False
    def preProcess(self, data):
        for column in data.keys():
            if column in self.timestampToDatetime:
                data[column] = datetime.fromtimestamp(data[column])
    def restore(self, saveFile, path, query, querySchema):
        try :
            data = {}
            with open(f"{path}", 'r') as f:
                data = json.load(f)
            with conn.cursor() as curs:
                for key, tuple in data.items():
                    self.preProcess(tuple)
                    query = f"INSERT INTO {saveFile} ({querySchema[0] + ',' + ', '.join(tuple.keys())}) VALUES ({('%s, ' * (len(tuple.keys()) + 1))[:-2]})"
                    curs.execute(query, [key] + list(tuple.values()))

        except Exception as e:
            print(e)
            conn.rollback()
            exit(0)
    def run(self):
        for t in self.tableName:
            query = f"SELECT {', '.join(self.schema[t])} FROM {t}"
            self.restore(t, f"{self.storedPath}{self.saveFiles[t]}", query, self.schema[t])
        conn.commit()
Script = restoreScript()
Script.run()
conn.close()