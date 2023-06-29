import {
  signUpToCognito,
  authenticaToCognito,
  forgotPasswordToCognito,
  confirmPasswordToCognito,
} from "../../services/auth";

import { CognitoRes, CognitoErrors } from "../types/auth";

import {
  SignUpInput,
  SignInInput,
  ForgotPasswordInput,
  ConfirmNewPasswordInput,
  SignUpPayload,
  SignInPayload,
  ForgotPasswordPayload,
  ConfirmNewPasswordPayload,
} from "../interfaces/auth";

const authResolvers = {
  Query: {},
  Mutation: {
    signUp: async (_parent, args: SignUpInput, context): Promise<SignUpPayload> => {
      const user = args.input;
      let payload: SignUpPayload;

      const cognitoRes: CognitoRes = await signUpToCognito(user);

      if (cognitoRes.error) {
        if (cognitoRes.error.name === CognitoErrors.USER_EXISTS) {
          payload = {
            user: null,
            error: { field: "username", reason: "USERNAME_EXISTS" },
          };
        }
        if (cognitoRes.error.name === CognitoErrors.INVALID_PASSWORD) {
          payload = {
            user: null,
            error: { field: "password", reason: "INVALID_PASSWORD_POLICY" },
          };
        }
      } else {
        payload = {
          user: {
            username: user.username,
            userId: Math.random().toString(),
          },
          error: null,
        };
      }
      return payload;
    },
    signIn: async (_parent, args: SignInInput): Promise<SignInPayload> => {
      const user = args.input;
      // const userModel = context.models.user;
      let payload: SignInPayload;
      const cognitoRes: any = await authenticaToCognito(user);

      if (cognitoRes.error) {
        if (cognitoRes.error.name === CognitoErrors.INVALID_CREDENTIALS) {
          payload = {
            user: null,
            error: {
              field: "username || password",
              reason: "NOT_AUTHORIZED",
            },
          };
        }
        if (cognitoRes.error.name === CognitoErrors.USER_NOT_CONFIRMED) {
          payload = {
            user: null,
            error: {
              field: "username",
              reason: "USER_NOT_CONFIRMED",
            },
          };
        }
      } else {
        payload = {
          user: {
            username: cognitoRes.user.username,
            userId: cognitoRes.user.cognitoUsername,
          },
          error: null,
        };
      }

      return payload;
    },
    forgotPassword: async (
      _parent,
      args: ForgotPasswordInput
    ): Promise<ForgotPasswordPayload> => {
      const user = args.input;
      let payload: ForgotPasswordPayload;

      const cognitoRes: any = await forgotPasswordToCognito(user.username);
      if (cognitoRes.error) {
        payload = {
          emailSent: false,
          error: {
            field: "none",
            reason: "EMAIL_ISSUE",
          },
        };
      } else {
        payload = {
          emailSent: cognitoRes.user.emailSent,
          error: null,
        };
      }
      return payload;
    },
    confirmNewPassword: async (
      _parent,
      args: ConfirmNewPasswordInput
    ): Promise<ConfirmNewPasswordPayload> => {
      const user = args.input;
      let payload: ConfirmNewPasswordPayload;

      const cognitoRes: any = await confirmPasswordToCognito(user);
      console.log(cognitoRes);
      if (cognitoRes.error) {
        if (cognitoRes.error.name === CognitoErrors.EXPIRTED_CODE_EXCEPTION) {
          payload = {
            operation: cognitoRes.operation,
            error: {
              field: "code",
              reason: "CODE_EXPIRED",
            },
          };
        } else if (cognitoRes.error.name === CognitoErrors.INVALID_CODE_PROVIDED) {
          payload = {
            operation: cognitoRes.operation,
            error: {
              field: "code",
              reason: "INVALID_CODE",
            },
          };
        } else if (cognitoRes.error.name === CognitoErrors.LIMITED_EXCEED) {
          payload = {
            operation: cognitoRes.operation,
            error: {
              field: "api",
              reason: "LIMIT_EXCEED",
            },
          };
        } else if (cognitoRes.error.name === CognitoErrors.INVALID_PASSWORD) {
          payload = {
            operation: cognitoRes.operation,
            error: {
              field: "api",
              reason: "INVALID_PASSWORD_POLICY",
            },
          };
        }
      } else {
        payload = {
          operation: cognitoRes.operation,
          error: null,
        };
      }
      return payload;
    },
  },
};

export default authResolvers;
