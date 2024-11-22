import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.TABLE_NAME || '';

export const handler = async (event) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*'
  };

  try {
    const userId = event.requestContext.authorizer?.claims?.sub || 'test-user';
    const taskId = event.pathParameters?.taskId;

    if (!taskId) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ message: 'Task ID is required' })
      };
    }

    await dynamodb.send(new DeleteCommand({
      TableName: TABLE_NAME,
      Key: {
        id: taskId,
        userId
      }
    }));

    return {
      statusCode: 204,
      headers: corsHeaders,
      body: ''
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
