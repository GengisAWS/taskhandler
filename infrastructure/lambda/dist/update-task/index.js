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
        const requestBody = JSON.parse(event.body || '{}');
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
        // First check if the task exists and belongs to the user
        const existingTask = await dynamodb.get({
            TableName: TABLE_NAME,
            Key: {
                id: taskId,
                userId
            }
        }).promise();
        if (!existingTask.Item) {
            return {
                statusCode: 404,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*',
                    'Access-Control-Allow-Headers': '*'
                },
                body: JSON.stringify({ message: 'Task not found' })
            };
        }
        const updatedTask = {
            ...existingTask.Item,
            ...requestBody,
            updatedAt: new Date().toISOString()
        };
        await dynamodb.put({
            TableName: TABLE_NAME,
            Item: updatedTask
        }).promise();
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*'
            },
            body: JSON.stringify(updatedTask)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi91cGRhdGUtdGFzay9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxQ0FBbUM7QUFFbkMsTUFBTSxRQUFRLEdBQUcsSUFBSSxrQkFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQy9DLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQztBQUV6QyxNQUFNLE9BQU8sR0FBRyxLQUFLLEVBQUUsS0FBMkIsRUFBa0MsRUFBRTs7SUFDM0YsSUFBSTtRQUNGLE1BQU0sTUFBTSxHQUFHLENBQUEsTUFBQSxNQUFBLEtBQUssQ0FBQyxjQUFjLENBQUMsVUFBVSwwQ0FBRSxNQUFNLDBDQUFFLEdBQUcsS0FBSSxXQUFXLENBQUMsQ0FBQywyQkFBMkI7UUFDdkcsTUFBTSxNQUFNLEdBQUcsTUFBQSxLQUFLLENBQUMsY0FBYywwQ0FBRSxNQUFNLENBQUM7UUFDNUMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDO1FBRW5ELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPO2dCQUNMLFVBQVUsRUFBRSxHQUFHO2dCQUNmLE9BQU8sRUFBRTtvQkFDUCw2QkFBNkIsRUFBRSxHQUFHO29CQUNsQyw4QkFBOEIsRUFBRSxHQUFHO29CQUNuQyw4QkFBOEIsRUFBRSxHQUFHO2lCQUNwQztnQkFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxDQUFDO2FBQ3pELENBQUM7U0FDSDtRQUVELHlEQUF5RDtRQUN6RCxNQUFNLFlBQVksR0FBRyxNQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFDdEMsU0FBUyxFQUFFLFVBQVU7WUFDckIsR0FBRyxFQUFFO2dCQUNILEVBQUUsRUFBRSxNQUFNO2dCQUNWLE1BQU07YUFDUDtTQUNGLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUViLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFO1lBQ3RCLE9BQU87Z0JBQ0wsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsT0FBTyxFQUFFO29CQUNQLDZCQUE2QixFQUFFLEdBQUc7b0JBQ2xDLDhCQUE4QixFQUFFLEdBQUc7b0JBQ25DLDhCQUE4QixFQUFFLEdBQUc7aUJBQ3BDO2dCQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLENBQUM7YUFDcEQsQ0FBQztTQUNIO1FBRUQsTUFBTSxXQUFXLEdBQUc7WUFDbEIsR0FBRyxZQUFZLENBQUMsSUFBSTtZQUNwQixHQUFHLFdBQVc7WUFDZCxTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7U0FDcEMsQ0FBQztRQUVGLE1BQU0sUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUNqQixTQUFTLEVBQUUsVUFBVTtZQUNyQixJQUFJLEVBQUUsV0FBVztTQUNsQixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFYixPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPLEVBQUU7Z0JBQ1AsNkJBQTZCLEVBQUUsR0FBRztnQkFDbEMsOEJBQThCLEVBQUUsR0FBRztnQkFDbkMsOEJBQThCLEVBQUUsR0FBRzthQUNwQztZQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztTQUNsQyxDQUFDO0tBQ0g7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9CLE9BQU87WUFDTCxVQUFVLEVBQUUsR0FBRztZQUNmLE9BQU8sRUFBRTtnQkFDUCw2QkFBNkIsRUFBRSxHQUFHO2dCQUNsQyw4QkFBOEIsRUFBRSxHQUFHO2dCQUNuQyw4QkFBOEIsRUFBRSxHQUFHO2FBQ3BDO1lBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQztTQUMzRCxDQUFDO0tBQ0g7QUFDSCxDQUFDLENBQUM7QUF2RVcsUUFBQSxPQUFPLFdBdUVsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFQSUdhdGV3YXlQcm94eUV2ZW50LCBBUElHYXRld2F5UHJveHlSZXN1bHQgfSBmcm9tICdhd3MtbGFtYmRhJztcbmltcG9ydCB7IER5bmFtb0RCIH0gZnJvbSAnYXdzLXNkayc7XG5cbmNvbnN0IGR5bmFtb2RiID0gbmV3IER5bmFtb0RCLkRvY3VtZW50Q2xpZW50KCk7XG5jb25zdCBUQUJMRV9OQU1FID0gcHJvY2Vzcy5lbnYuVEFCTEVfTkFNRSB8fCAnJztcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IEFQSUdhdGV3YXlQcm94eUV2ZW50KTogUHJvbWlzZTxBUElHYXRld2F5UHJveHlSZXN1bHQ+ID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB1c2VySWQgPSBldmVudC5yZXF1ZXN0Q29udGV4dC5hdXRob3JpemVyPy5jbGFpbXM/LnN1YiB8fCAndGVzdC11c2VyJzsgLy8gUmVwbGFjZSB3aXRoIGFjdHVhbCBhdXRoXG4gICAgY29uc3QgdGFza0lkID0gZXZlbnQucGF0aFBhcmFtZXRlcnM/LnRhc2tJZDtcbiAgICBjb25zdCByZXF1ZXN0Qm9keSA9IEpTT04ucGFyc2UoZXZlbnQuYm9keSB8fCAne30nKTtcblxuICAgIGlmICghdGFza0lkKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiA0MDAsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxuICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJzogJyonLFxuICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJzogJyonXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbWVzc2FnZTogJ1Rhc2sgSUQgaXMgcmVxdWlyZWQnIH0pXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIEZpcnN0IGNoZWNrIGlmIHRoZSB0YXNrIGV4aXN0cyBhbmQgYmVsb25ncyB0byB0aGUgdXNlclxuICAgIGNvbnN0IGV4aXN0aW5nVGFzayA9IGF3YWl0IGR5bmFtb2RiLmdldCh7XG4gICAgICBUYWJsZU5hbWU6IFRBQkxFX05BTUUsXG4gICAgICBLZXk6IHtcbiAgICAgICAgaWQ6IHRhc2tJZCxcbiAgICAgICAgdXNlcklkXG4gICAgICB9XG4gICAgfSkucHJvbWlzZSgpO1xuXG4gICAgaWYgKCFleGlzdGluZ1Rhc2suSXRlbSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogNDA0LFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6ICcqJyxcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6ICcqJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IG1lc3NhZ2U6ICdUYXNrIG5vdCBmb3VuZCcgfSlcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3QgdXBkYXRlZFRhc2sgPSB7XG4gICAgICAuLi5leGlzdGluZ1Rhc2suSXRlbSxcbiAgICAgIC4uLnJlcXVlc3RCb2R5LFxuICAgICAgdXBkYXRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKClcbiAgICB9O1xuXG4gICAgYXdhaXQgZHluYW1vZGIucHV0KHtcbiAgICAgIFRhYmxlTmFtZTogVEFCTEVfTkFNRSxcbiAgICAgIEl0ZW06IHVwZGF0ZWRUYXNrXG4gICAgfSkucHJvbWlzZSgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiAnKicsXG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJzogJyonXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodXBkYXRlZFRhc2spXG4gICAgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvcjonLCBlcnJvcik7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1c0NvZGU6IDUwMCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiAnKicsXG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJzogJyonXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBtZXNzYWdlOiAnSW50ZXJuYWwgc2VydmVyIGVycm9yJyB9KVxuICAgIH07XG4gIH1cbn07Il19