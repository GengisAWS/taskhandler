import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.TABLE_NAME || '';

export const handler = async (event) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://dmmp2t4jbu3j4.cloudfront.net',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*'
  };

  try {
    const result = await dynamodb.send(new ScanCommand({
      TableName: TABLE_NAME
    }));

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(result.Items)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Internal server error' })
    };
  }
};
