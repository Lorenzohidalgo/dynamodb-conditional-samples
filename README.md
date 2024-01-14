# AWS SDK v3 DynamoDB Examples

This repository contains examples of using the AWS JavaScript SDK v3 with DynamoDB, focusing on scenarios related to the `ConditionExpression` attribute. The examples cover the following operations:

1. **putItem:** Records will be overwritten by default.

2. **putItem with ConditionExpression:** Prevents overwrites by specifying a condition.

3. **updateItem:** Updates a record or inserts it if it doesn't exist.

4. **updateItem with ConditionExpression:** Avoids insertion if the record doesn't exist by using a condition.

## Prerequisites

Before running the examples, ensure you have the following prerequisites:

- Node.js installed
- AWS SDK v3 for JavaScript installed

```bash
npm install
```

## Configuration

Make sure to configure your AWS credentials using the AWS CLI or by setting environment variables.

```bash
export AWS_ACCESS_KEY_ID=your_access_key_id
export AWS_SECRET_ACCESS_KEY=your_secret_access_key
export AWS_REGION=your_region
```

## Examples

### 1. putItem

The [putItem](./samples/putItem.js) example demonstrates how to add items to DynamoDB, overwriting existing records by default.

### 2. putItem with ConditionExpression

In this example, [putItemWithCondition](./samples/putItemWithCondition.js), a `ConditionExpression` is used to prevent overwriting existing records. The item will only be added if the specified condition is met.

### 3. updateItem

The [updateItem](./samples/updateItem.js) example showcases updating existing records in DynamoDB. If the record doesn't exist, a new one will be created.

### 4. updateItem with ConditionExpression

This example, [updateItemWithCondition](./samples/updateItemWithCondition.js), demonstrates using a `ConditionExpression` with `updateItem` to avoid inserting a new record if the one we wanted to update doesn't exist.

Additionally, this example also covers how to write DynamoDB Expressions to access nested objects and expect a `ConditionalCheckFailedException`` to analyze the current values of the record and understand why it failed.

## Running the Examples

Execute each example by running the corresponding JavaScript file.

```bash
node ./samples/putItem.js
node ./samples/putItemWithCondition.js
node ./samples/updateItem.js
node ./samples/updateItemWithCondition.js
```