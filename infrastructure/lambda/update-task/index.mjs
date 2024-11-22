import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';

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
    const requestBody = JSON.parse(event.body || '{}');

    if (!taskId) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ message: 'Task ID is required' })
      };
    }

    // First check if the task exists and belongs to the user
    const existingTask = await dynamodb.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        id: taskId,
        userId
      }
    }));

    if (!existingTask.Item) {
      return {
        statusCode: 404,
        headers: corsHeaders,
        body: JSON.stringify({ message: 'Task not found' })
      };
    }

    const updatedTask = {
      ...existingTask.Item,
      ...requestBody,
      updatedAt: new Date().toISOString()
    };



    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(updatedTask)
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
