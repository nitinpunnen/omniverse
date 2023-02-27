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
  with conn.cursor() as cur:
        # Enter the query that you want to execute
        cur.execute("SELECT JSON_ARRAYAGG(JSON_OBJECT('userId', userId, 'firstName', firstName, 'lastName', lastName, 'preferredLanguage', preferredLanguage, 'birthday', birthday, 'birthGender', birthGender,'addressLine1', addressLine1,'addressLine2', addressLine2,'city', city,'state', state,'postalCode', postalCode,'email', email,'socialSecurity', socialSecurity,'phoneint', phoneint,'height', height,'weight', weight,'usResidentialStatus', usResidentialStatus,'extremeSports', extremeSports,'tobaccoUser', tobaccoUser,'tobaccoUseFrequency', tobaccoUseFrequency,'drugUser', drugUser,'drugUseFrequency', drugUseFrequency,'alcoholUser', alcoholUser,'alcoholUseFrequency', alcoholUseFrequency)) from User;") 
        data = cur.fetchall()
        print(data[0][0])        
  
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': data[0][0]
  }