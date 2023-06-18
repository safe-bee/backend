import AWS from "aws-sdk";

const client = new AWS.DynamoDB.DocumentClient();

export default {
  get: (params: any): any => client.get(params).promise(),
  put: (params: any): any => client.put(params).promise(),
  query: (params: any): any => client.query(params).promise(),
  update: (params: any): any => client.update(params).promise(),
  delete: (params: any): any => client.delete(params).promise(),
};
