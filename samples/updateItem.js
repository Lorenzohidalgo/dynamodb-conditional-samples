import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const update = async () => {
  const command = new UpdateCommand({
    TableName: "dynamodb-conditional-samples",
    Key: {
      PK: "item-2",
    },
    UpdateExpression: "SET #att = :att",
    ExpressionAttributeNames: {
      "#att": "UpdatedAt",
    },
    ExpressionAttributeValues: {
      ":att": new Date().toISOString(),
    },
    ReturnValues: "ALL_NEW",
  });

  const response = await docClient.send(command);
  console.log(response);
  return response;
};

(() => update())();
