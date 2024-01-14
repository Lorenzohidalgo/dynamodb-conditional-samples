import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const put = async () => {
  const command = new PutCommand({
    TableName: "dynamodb-conditional-samples",
    Item: {
      PK: "item-1",
      randomAttribute: "item-1",
      CreatedAt: new Date().toISOString(),
    },
    ConditionExpression: "attribute_not_exists(#id)",
    ExpressionAttributeNames: {
      "#id": "PK",
    },
  });

  const response = await docClient.send(command);
  console.log(response);
  return response;
};

(() => put())();
