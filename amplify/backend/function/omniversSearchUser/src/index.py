import json
import sys
import pymysql
import os
import boto3
from base64 import b64decode

try:
    conn = pymysql.connect("omnivers.c9vtqfryn88t.us-west-2.rds.amazonaws.com", user="admin", passwd="password" , db="omniversdb", connect_timeout=5)
except:
    print("FAILURE: Connection to RDS mysql not succeeded")
print("SUCCESS: Connection to RDS mysql instance succeeded")

def handler(event, context):
  print('received event:')
  print(event)
  
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps('Hello from your new Amplify Python lambda!')
  }