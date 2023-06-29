enum CognitoErrors {
  USER_EXISTS = "UsernameExistsException",
  INVALID_PASSWORD = "InvalidPasswordException",
  INVALID_CREDENTIALS = "NotAuthorizedException",
  USER_NOT_CONFIRMED = "UserNotConfirmedException",
  EXPIRTED_CODE_EXCEPTION = "ExpiredCodeException",
  INVALID_CODE_PROVIDED = "CodeMismatchException",
  LIMITED_EXCEED = "LimitExceededException",
}

type CognitoErrorObj = {
  code: string;
  name: string;
  message: string;
};

type CognitoRes = {
  user: object;
  error: CognitoErrorObj;
};

enum CognitoOperationResult {
  OPERATION_SUCCESS = "SUCCESS",
  OPERATION_FAILED = "FAILED",
}

type ConfirmPassword = {
  operation: CognitoOperationResult;
  error: CognitoErrorObj;
};

export { CognitoRes, CognitoErrors, CognitoOperationResult, ConfirmPassword };
