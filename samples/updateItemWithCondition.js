import { DynamoDBClient, ConditionalCheckFailedException } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const update = async () => {
  try {
    const command = new UpdateCommand({
      TableName: "dynamodb-conditional-samples",
      Key: {
        PK: "item-1",
      },
      UpdateExpression: "SET #att = :att",
      ConditionExpression: "attribute_exists(#id) AND #obj.#key = :expected",
      ExpressionAttributeNames: {
        "#id": "PK",
        "#att": "UpdatedAt",
        "#obj": "randomAttribute",
        "#key": "failCheck",
      },
      ExpressionAttributeValues: {
        ":att": new Date().toISOString(),
        ":expected": false,
      },
      ReturnValues: "ALL_NEW",
      ReturnValuesOnConditionCheckFailure: "ALL_OLD",
    });

    const response = await docClient.send(command);
    console.log(response);
    return response;
  } catch (error) {
    if (!(error instanceof ConditionalCheckFailedException)) throw error;
    const oldRecord = unmarshall(error.Item);
    console.log(oldRecord);
    return oldRecord;
  }
};

(() => update())();
