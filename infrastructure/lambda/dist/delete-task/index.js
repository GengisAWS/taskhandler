"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const dynamodb = new aws_sdk_1.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || '';
const handler = async (event) => {
    var _a, _b, _c;
    try {
        const userId = ((_b = (_a = event.requestContext.authorizer) === null || _a === void 0 ? void 0 : _a.claims) === null || _b === void 0 ? void 0 : _b.sub) || 'test-user'; // Replace with actual auth
        const taskId = (_c = event.pathParameters) === null || _c === void 0 ? void 0 : _c.taskId;
        if (!taskId) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*',
                    'Access-Control-Allow-Headers': '*'
                },
                body: JSON.stringify({ message: 'Task ID is required' })
            };
        }
        await dynamodb.delete({
            TableName: TABLE_NAME,
            Key: {
                id: taskId,
                userId
            }
        }).promise();
        return {
            statusCode: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*'
            },
            body: ''
        };
    }
    catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*'
            },
            body: JSON.stringify({ message: 'Internal server error' })
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9kZWxldGUtdGFzay9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxQ0FBbUM7QUFFbkMsTUFBTSxRQUFRLEdBQUcsSUFBSSxrQkFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQy9DLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQztBQUV6QyxNQUFNLE9BQU8sR0FBRyxLQUFLLEVBQUUsS0FBMkIsRUFBa0MsRUFBRTs7SUFDM0YsSUFBSTtRQUNGLE1BQU0sTUFBTSxHQUFHLENBQUEsTUFBQSxNQUFBLEtBQUssQ0FBQyxjQUFjLENBQUMsVUFBVSwwQ0FBRSxNQUFNLDBDQUFFLEdBQUcsS0FBSSxXQUFXLENBQUMsQ0FBQywyQkFBMkI7UUFDdkcsTUFBTSxNQUFNLEdBQUcsTUFBQSxLQUFLLENBQUMsY0FBYywwQ0FBRSxNQUFNLENBQUM7UUFFNUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE9BQU87Z0JBQ0wsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsT0FBTyxFQUFFO29CQUNQLDZCQUE2QixFQUFFLEdBQUc7b0JBQ2xDLDhCQUE4QixFQUFFLEdBQUc7b0JBQ25DLDhCQUE4QixFQUFFLEdBQUc7aUJBQ3BDO2dCQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLENBQUM7YUFDekQsQ0FBQztTQUNIO1FBRUQsTUFBTSxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQ3BCLFNBQVMsRUFBRSxVQUFVO1lBQ3JCLEdBQUcsRUFBRTtnQkFDSCxFQUFFLEVBQUUsTUFBTTtnQkFDVixNQUFNO2FBQ1A7U0FDRixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFYixPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPLEVBQUU7Z0JBQ1AsNkJBQTZCLEVBQUUsR0FBRztnQkFDbEMsOEJBQThCLEVBQUUsR0FBRztnQkFDbkMsOEJBQThCLEVBQUUsR0FBRzthQUNwQztZQUNELElBQUksRUFBRSxFQUFFO1NBQ1QsQ0FBQztLQUNIO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMvQixPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPLEVBQUU7Z0JBQ1AsNkJBQTZCLEVBQUUsR0FBRztnQkFDbEMsOEJBQThCLEVBQUUsR0FBRztnQkFDbkMsOEJBQThCLEVBQUUsR0FBRzthQUNwQztZQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLENBQUM7U0FDM0QsQ0FBQztLQUNIO0FBQ0gsQ0FBQyxDQUFDO0FBOUNXLFFBQUEsT0FBTyxXQThDbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBUElHYXRld2F5UHJveHlFdmVudCwgQVBJR2F0ZXdheVByb3h5UmVzdWx0IH0gZnJvbSAnYXdzLWxhbWJkYSc7XG5pbXBvcnQgeyBEeW5hbW9EQiB9IGZyb20gJ2F3cy1zZGsnO1xuXG5jb25zdCBkeW5hbW9kYiA9IG5ldyBEeW5hbW9EQi5Eb2N1bWVudENsaWVudCgpO1xuY29uc3QgVEFCTEVfTkFNRSA9IHByb2Nlc3MuZW52LlRBQkxFX05BTUUgfHwgJyc7XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBBUElHYXRld2F5UHJveHlFdmVudCk6IFByb21pc2U8QVBJR2F0ZXdheVByb3h5UmVzdWx0PiA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgdXNlcklkID0gZXZlbnQucmVxdWVzdENvbnRleHQuYXV0aG9yaXplcj8uY2xhaW1zPy5zdWIgfHwgJ3Rlc3QtdXNlcic7IC8vIFJlcGxhY2Ugd2l0aCBhY3R1YWwgYXV0aFxuICAgIGNvbnN0IHRhc2tJZCA9IGV2ZW50LnBhdGhQYXJhbWV0ZXJzPy50YXNrSWQ7XG5cbiAgICBpZiAoIXRhc2tJZCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogNDAwLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6ICcqJyxcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6ICcqJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IG1lc3NhZ2U6ICdUYXNrIElEIGlzIHJlcXVpcmVkJyB9KVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBhd2FpdCBkeW5hbW9kYi5kZWxldGUoe1xuICAgICAgVGFibGVOYW1lOiBUQUJMRV9OQU1FLFxuICAgICAgS2V5OiB7XG4gICAgICAgIGlkOiB0YXNrSWQsXG4gICAgICAgIHVzZXJJZFxuICAgICAgfVxuICAgIH0pLnByb21pc2UoKTtcblxuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXNDb2RlOiAyMDQsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJzogJyonLFxuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6ICcqJ1xuICAgICAgfSxcbiAgICAgIGJvZHk6ICcnXG4gICAgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvcjonLCBlcnJvcik7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1c0NvZGU6IDUwMCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiAnKicsXG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJzogJyonXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBtZXNzYWdlOiAnSW50ZXJuYWwgc2VydmVyIGVycm9yJyB9KVxuICAgIH07XG4gIH1cbn07Il19