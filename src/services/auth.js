import { CognitoUserPool, CognitoUserAttribute, AuthenticationDetails, CognitoUser, } from "amazon-cognito-identity-js";
import { promisify } from "util";
import { CognitoOperationResult, } from "../schema/types/auth";
const customAttributes = ["firstName", "lastName", "company"];
const connectToUserPool = () => {
    const userPool = new CognitoUserPool({
        UserPoolId: "us-east-1_zHy9pPpTu",
        ClientId: "ah4afsejj7j3cvnsvca258ugc",
    });
    return userPool;
};
const generateCognitoAttribute = (attributeName, attributeValue) => {
    let cognitoAttribute;
    if (customAttributes.find((attribute) => attribute === attributeName)) {
        cognitoAttribute = new CognitoUserAttribute({
            Name: `custom:${attributeName}`,
            Value: attributeValue,
        });
    }
    else {
        cognitoAttribute = new CognitoUserAttribute({
            Name: attributeName,
            Value: attributeValue,
        });
    }
    return cognitoAttribute;
};
const processCognitoAttributes = async (email, password, fields) => {
    const userPool = connectToUserPool();
    const attributeList = [];
    Object.keys(fields).forEach((key) => {
        const cognitoAttribute = generateCognitoAttribute(key, fields[key]);
        attributeList.push(cognitoAttribute);
    });
    const promisifiedSignUp = promisify(userPool.signUp).bind(userPool);
    return promisifiedSignUp(email, password, attributeList, null);
};
const signUpToCognito = async (user) => {
    let cognitoRes;
    let res;
    const cognitoFields = {
        phone_number: user.phoneNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        company: user.company,
        email: user.username,
    };
    try {
        res = await processCognitoAttributes(user.username, user.password, cognitoFields);
        cognitoRes = {
            user: res.user,
            error: null,
        };
    }
    catch (e) {
        cognitoRes = {
            user: null,
            error: e,
        };
    }
    return cognitoRes;
};
const processCognitoAuthentication = async (username, password) => {
    const authenticationDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
    });
    const userPool = connectToUserPool();
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
const authenticaToCognito = async (user) => {
    let cognitoRes;
    try {
        const res = await processCognitoAuthentication(user.username, user.password);
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
    }
    catch (error) {
        cognitoRes = {
            user: null,
            error,
        };
    }
    return cognitoRes;
};
const processCognitoForgotPassword = async (username) => {
    const userPool = connectToUserPool();
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
const forgotPasswordToCognito = async (username) => {
    let cognitoRes;
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
    }
    catch (error) {
        cognitoRes = {
            user: null,
            error,
        };
        return cognitoRes;
    }
};
const processCognitoConfirmPassword = async (user) => {
    const userPool = connectToUserPool();
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
const confirmPasswordToCognito = async (user) => {
    let cognitoRes;
    try {
        await processCognitoConfirmPassword(user);
        cognitoRes = {
            operation: CognitoOperationResult.OPERATION_SUCCESS,
            error: null,
        };
        return cognitoRes;
    }
    catch (error) {
        cognitoRes = {
            operation: CognitoOperationResult.OPERATION_FAILED,
            error,
        };
        return cognitoRes;
    }
};
export { signUpToCognito, authenticaToCognito, forgotPasswordToCognito, confirmPasswordToCognito, };
