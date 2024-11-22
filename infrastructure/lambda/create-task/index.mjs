import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'crypto';

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
    const requestBody = JSON.parse(event.body || '{}');
    const userId = event.requestContext.authorizer?.claims?.sub || 'test-user';
    
    if (!requestBody.title) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ message: 'Title is required' })
      };
    }

    const task = {
      id: randomUUID(),
      userId,
      title: requestBody.title,
      description: requestBody.description || '',
      status: 'TODO',
      priority: requestBody.priority || 'MEDIUM',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await dynamodb.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: task
    }));

    return {
      statusCode: 201,
      headers: corsHeaders,
      body: JSON.stringify(task)
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
