import json
import sys
import pymysql
import os
import traceback
from base64 import b64decode

try:
    conn = pymysql.connect(host="omnivers.c9vtqfryn88t.us-west-2.rds.amazonaws.com", user="admin", password="password" , database="omniversdb")
    print("SUCCESS: Connection to RDS mysql instance succeeded")
except Exception:
    traceback.print_exc()
    print("FAILURE: Connection to RDS mysql not succeeded")


def handler(event, context):
  body = json.loads(event["body"])
  attributes = body["Attributes"]
  print("attributes ", attributes)

  columnNames = []
  values = []
  for key in attributes:
    columnNames.append(key);
    values.append("'"+attributes[key]+"'")
    print(', '.join(columnNames))
    print(', '.join(values))

  stmt = "INSERT INTO User (" + (', '.join(columnNames)) + ") VALUES (" + (', '.join(values)) + ")"
  print(stmt)
  
  with conn.cursor() as cur:
    # Enter the query that you want to execute
    cur.execute(stmt) 
  conn.commit()            
  
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': 'Upserted'
  }