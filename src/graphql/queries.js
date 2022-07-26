/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLitCase = /* GraphQL */ `
  query GetLitCase($id: ID!) {
    getLitCase(id: $id) {
      id
      clientID
      name
      description
      nextstep
      status
      attorName
      deadline
      createdAt
      updatedAt
    }
  }
`;
export const listLitCases = /* GraphQL */ `
  query ListLitCases(
    $filter: ModelLitCaseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLitCases(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        clientID
        name
        description
        nextstep
        status
        attorName
        deadline
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
