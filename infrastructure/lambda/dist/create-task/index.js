"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const uuid_1 = require("uuid");
const dynamodb = new aws_sdk_1.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || '';
const handler = async (event) => {
    var _a, _b;
    try {
        const requestBody = JSON.parse(event.body || '{}');
        const userId = ((_b = (_a = event.requestContext.authorizer) === null || _a === void 0 ? void 0 : _a.claims) === null || _b === void 0 ? void 0 : _b.sub) || 'test-user'; // Replace with actual auth
        if (!requestBody.title) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*',
                    'Access-Control-Allow-Headers': '*'
                },
                body: JSON.stringify({ message: 'Title is required' })
            };
        }
        const task = {
            id: (0, uuid_1.v4)(),
            userId,
            title: requestBody.title,
            description: requestBody.description || '',
            status: 'TODO',
            priority: requestBody.priority || 'MEDIUM',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        await dynamodb.put({
            TableName: TABLE_NAME,
            Item: task
        }).promise();
        return {
            statusCode: 201,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*'
            },
            body: JSON.stringify(task)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jcmVhdGUtdGFzay9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxQ0FBbUM7QUFDbkMsK0JBQW9DO0FBRXBDLE1BQU0sUUFBUSxHQUFHLElBQUksa0JBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUMvQyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7QUFFekMsTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUFFLEtBQTJCLEVBQWtDLEVBQUU7O0lBQzNGLElBQUk7UUFDRixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUM7UUFDbkQsTUFBTSxNQUFNLEdBQUcsQ0FBQSxNQUFBLE1BQUEsS0FBSyxDQUFDLGNBQWMsQ0FBQyxVQUFVLDBDQUFFLE1BQU0sMENBQUUsR0FBRyxLQUFJLFdBQVcsQ0FBQyxDQUFDLDJCQUEyQjtRQUV2RyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUN0QixPQUFPO2dCQUNMLFVBQVUsRUFBRSxHQUFHO2dCQUNmLE9BQU8sRUFBRTtvQkFDUCw2QkFBNkIsRUFBRSxHQUFHO29CQUNsQyw4QkFBOEIsRUFBRSxHQUFHO29CQUNuQyw4QkFBOEIsRUFBRSxHQUFHO2lCQUNwQztnQkFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxDQUFDO2FBQ3ZELENBQUM7U0FDSDtRQUVELE1BQU0sSUFBSSxHQUFHO1lBQ1gsRUFBRSxFQUFFLElBQUEsU0FBTSxHQUFFO1lBQ1osTUFBTTtZQUNOLEtBQUssRUFBRSxXQUFXLENBQUMsS0FBSztZQUN4QixXQUFXLEVBQUUsV0FBVyxDQUFDLFdBQVcsSUFBSSxFQUFFO1lBQzFDLE1BQU0sRUFBRSxNQUFNO1lBQ2QsUUFBUSxFQUFFLFdBQVcsQ0FBQyxRQUFRLElBQUksUUFBUTtZQUMxQyxTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7WUFDbkMsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO1NBQ3BDLENBQUM7UUFFRixNQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFDakIsU0FBUyxFQUFFLFVBQVU7WUFDckIsSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFYixPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPLEVBQUU7Z0JBQ1AsNkJBQTZCLEVBQUUsR0FBRztnQkFDbEMsOEJBQThCLEVBQUUsR0FBRztnQkFDbkMsOEJBQThCLEVBQUUsR0FBRzthQUNwQztZQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztTQUMzQixDQUFDO0tBQ0g7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9CLE9BQU87WUFDTCxVQUFVLEVBQUUsR0FBRztZQUNmLE9BQU8sRUFBRTtnQkFDUCw2QkFBNkIsRUFBRSxHQUFHO2dCQUNsQyw4QkFBOEIsRUFBRSxHQUFHO2dCQUNuQyw4QkFBOEIsRUFBRSxHQUFHO2FBQ3BDO1lBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQztTQUMzRCxDQUFDO0tBQ0g7QUFDSCxDQUFDLENBQUM7QUF0RFcsUUFBQSxPQUFPLFdBc0RsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFQSUdhdGV3YXlQcm94eUV2ZW50LCBBUElHYXRld2F5UHJveHlSZXN1bHQgfSBmcm9tICdhd3MtbGFtYmRhJztcbmltcG9ydCB7IER5bmFtb0RCIH0gZnJvbSAnYXdzLXNkayc7XG5pbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJztcblxuY29uc3QgZHluYW1vZGIgPSBuZXcgRHluYW1vREIuRG9jdW1lbnRDbGllbnQoKTtcbmNvbnN0IFRBQkxFX05BTUUgPSBwcm9jZXNzLmVudi5UQUJMRV9OQU1FIHx8ICcnO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlciA9IGFzeW5jIChldmVudDogQVBJR2F0ZXdheVByb3h5RXZlbnQpOiBQcm9taXNlPEFQSUdhdGV3YXlQcm94eVJlc3VsdD4gPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlcXVlc3RCb2R5ID0gSlNPTi5wYXJzZShldmVudC5ib2R5IHx8ICd7fScpO1xuICAgIGNvbnN0IHVzZXJJZCA9IGV2ZW50LnJlcXVlc3RDb250ZXh0LmF1dGhvcml6ZXI/LmNsYWltcz8uc3ViIHx8ICd0ZXN0LXVzZXInOyAvLyBSZXBsYWNlIHdpdGggYWN0dWFsIGF1dGhcbiAgICBcbiAgICBpZiAoIXJlcXVlc3RCb2R5LnRpdGxlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiA0MDAsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxuICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJzogJyonLFxuICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJzogJyonXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbWVzc2FnZTogJ1RpdGxlIGlzIHJlcXVpcmVkJyB9KVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdCB0YXNrID0ge1xuICAgICAgaWQ6IHV1aWR2NCgpLFxuICAgICAgdXNlcklkLFxuICAgICAgdGl0bGU6IHJlcXVlc3RCb2R5LnRpdGxlLFxuICAgICAgZGVzY3JpcHRpb246IHJlcXVlc3RCb2R5LmRlc2NyaXB0aW9uIHx8ICcnLFxuICAgICAgc3RhdHVzOiAnVE9ETycsXG4gICAgICBwcmlvcml0eTogcmVxdWVzdEJvZHkucHJpb3JpdHkgfHwgJ01FRElVTScsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIHVwZGF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgfTtcblxuICAgIGF3YWl0IGR5bmFtb2RiLnB1dCh7XG4gICAgICBUYWJsZU5hbWU6IFRBQkxFX05BTUUsXG4gICAgICBJdGVtOiB0YXNrXG4gICAgfSkucHJvbWlzZSgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1c0NvZGU6IDIwMSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiAnKicsXG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJzogJyonXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodGFzaylcbiAgICB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yOicsIGVycm9yKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzQ29kZTogNTAwLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6ICcqJyxcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiAnKidcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IG1lc3NhZ2U6ICdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InIH0pXG4gICAgfTtcbiAgfVxufTsiXX0=