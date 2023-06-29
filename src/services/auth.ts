import {
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";
import { promisify } from "util";
import {
  CognitoRes,
  CognitoOperationResult,
  ConfirmPassword,
} from "../schema/types/auth";

const customAttributes = ["firstName", "lastName", "company"];

const connectToUserPool = (): CognitoUserPool => {
  const userPool = new CognitoUserPool({
    UserPoolId: "us-east-1_zHy9pPpTu",
    ClientId: "ah4afsejj7j3cvnsvca258ugc",
  });
  return userPool;
};

const generateCognitoAttribute = (attributeName: string, attributeValue: string) => {
  let cognitoAttribute;
  if (customAttributes.find((attribute) => attribute === attributeName)) {
    cognitoAttribute = new CognitoUserAttribute({
      Name: `custom:${attributeName}`,
      Value: attributeValue,
    });
  } else {
    cognitoAttribute = new CognitoUserAttribute({
      Name: attributeName,
      Value: attributeValue,
    });
  }
  return cognitoAttribute;
};

const processCognitoAttributes = async (email, password, fields): Promise<any> => {
  const userPool: CognitoUserPool = connectToUserPool();
  const attributeList: Array<CognitoUserAttribute> = [];

  Object.keys(fields).forEach((key) => {
    const cognitoAttribute = generateCognitoAttribute(key, fields[key]);
    attributeList.push(cognitoAttribute);
  });

  const promisifiedSignUp = promisify(userPool.signUp).bind(userPool);

  return promisifiedSignUp(email, password, attributeList, null);
};

const signUpToCognito = async (user: any): Promise<any> => {
  let cognitoRes: CognitoRes;
  let res: any;
  const cognitoFields: object = {
    phone_number: user.phoneNumber,
    firstName: user.firstName,
    lastName: user.lastName,
    company: user.company,
    email: user.username,
  };

  try {
    res = await processCognitoAttributes(
      user.username,
      user.password,
      cognitoFields
    );
    cognitoRes = {
      user: res.user,
      error: null,
    };
  } catch (e) {
    cognitoRes = {
      user: null,
      error: e,
    };
  }

  return cognitoRes;
};

const processCognitoAuthentication = async (username, password): Promise<any> => {
  const authenticationDetails = new AuthenticationDetails({
    Username: username,
    Password: password,
  });
  const userPool: CognitoUserPool = connectToUserPool();

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: resolve,
      onFailure: reject,
    });
  });
};

const authenticaToCognito = async (user: any): Promise<any> => {
  let cognitoRes: CognitoRes;
  try {
    const res: any = await processCognitoAuthentication(
      user.username,
      user.password
    );
    cognitoRes = {
      user: {
        accessToken: res.getAccessToken().getJwtToken(),
        username: res.idToken.payload.email,
        cognitoUsername: res.idToken.payload["cognito:username"],
        firstName: res.idToken.payload["custom:firstName"],
        lastName: res.idToken.payload["custom:lastName"],
        phoneNumber: res.idToken.payload.phone_number,
      },
      error: null,
    };
  } catch (error) {
    cognitoRes = {
      user: null,
      error,
    };
  }

  return cognitoRes;
};

const processCognitoForgotPassword = async (username: string): Promise<any> => {
  const userPool: CognitoUserPool = connectToUserPool();

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.forgotPassword({
      onSuccess: resolve,
      onFailure: reject,
    });
  });
};

const forgotPasswordToCognito = async (username: string): Promise<any> => {
  let cognitoRes: CognitoRes;
  await processCognitoForgotPassword(username);
  try {
    cognitoRes = {
      user: {
        username,
        emailSent: true,
      },
      error: null,
    };
    return cognitoRes;
  } catch (error) {
    cognitoRes = {
      user: null,
      error,
    };
    return cognitoRes;
  }
};

const processCognitoConfirmPassword = async (user: any): Promise<any> => {
  const userPool: CognitoUserPool = connectToUserPool();
  const userData = {
    Username: user.username,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.confirmPassword(user.code, user.password, {
      onSuccess: resolve,
      onFailure: reject,
    });
  });
};

const confirmPasswordToCognito = async (user: object): Promise<any> => {
  let cognitoRes: ConfirmPassword;
  try {
    await processCognitoConfirmPassword(user);
    cognitoRes = {
      operation: CognitoOperationResult.OPERATION_SUCCESS,
      error: null,
    };
    return cognitoRes;
  } catch (error) {
    cognitoRes = {
      operation: CognitoOperationResult.OPERATION_FAILED,
      error,
    };
    return cognitoRes;
  }
};

export {
  signUpToCognito,
  authenticaToCognito,
  forgotPasswordToCognito,
  confirmPasswordToCognito,
};
