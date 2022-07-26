/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLitCase = /* GraphQL */ `
  mutation CreateLitCase(
    $input: CreateLitCaseInput!
    $condition: ModelLitCaseConditionInput
  ) {
    createLitCase(input: $input, condition: $condition) {
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
export const updateLitCase = /* GraphQL */ `
  mutation UpdateLitCase(
    $input: UpdateLitCaseInput!
    $condition: ModelLitCaseConditionInput
  ) {
    updateLitCase(input: $input, condition: $condition) {
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
export const deleteLitCase = /* GraphQL */ `
  mutation DeleteLitCase(
    $input: DeleteLitCaseInput!
    $condition: ModelLitCaseConditionInput
  ) {
    deleteLitCase(input: $input, condition: $condition) {
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
