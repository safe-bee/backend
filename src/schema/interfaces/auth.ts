import PayloadError from "./common";

type UserDTO = {
  username: string;
  userId: string;
};

interface SignUpInput {
  input: {
    username: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    company: string;
    clients: string;
  };
}

interface SignInInput {
  input: {
    username: string;
    password: string;
  };
}

interface ForgotPasswordInput {
  input: {
    username: string;
  };
}

interface ConfirmNewPasswordInput {
  input: {
    username: string;
    password: string;
    confirmationCode: string;
  };
}

type SignInPayload = {
  error: PayloadError;
  user: UserDTO;
};

type SignUpPayload = {
  error: PayloadError;
  user: UserDTO;
};

type ForgotPasswordPayload = {
  error: PayloadError;
  emailSent: boolean;
};

type ConfirmNewPasswordPayload = {
  error: PayloadError;
  operation: string;
};

export {
  SignUpInput,
  SignInInput,
  ForgotPasswordInput,
  ConfirmNewPasswordInput,
  SignInPayload,
  SignUpPayload,
  ForgotPasswordPayload,
  ConfirmNewPasswordPayload,
};
