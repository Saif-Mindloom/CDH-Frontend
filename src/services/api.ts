import { apolloClient } from "./apollo";
import {
  REGISTER_USER,
  SEND_OTP,
  SPIN_SLOT_MACHINE,
  VERIFY_OTP,
} from "./graphql/mutations";
import {
  CHECK_PLAY_STATUS,
  GET_STATS,
  GET_USER,
  GET_USER_PROMO_CODES,
} from "./graphql/queries";
import type {
  CheckPlayStatusResponse,
  OtpResponse,
  RegisterUserInput,
  SendOtpInput,
  SpinSlotMachineResponse,
  Stats,
  User,
  UserPromoCode,
  VerifyOtpInput,
  VerifyOtpResponse,
} from "./graphql/types";

export class ApiService {
  // User Registration
  static async registerUser(input: RegisterUserInput): Promise<User> {
    const { data } = await apolloClient.mutate({
      mutation: REGISTER_USER,
      variables: { input },
    });
    return data.registerUser;
  }

  // OTP Operations
  static async sendOtp(phoneNumber: string): Promise<OtpResponse> {
    const input: SendOtpInput = { phone_number: phoneNumber };
    const { data } = await apolloClient.mutate({
      mutation: SEND_OTP,
      variables: { input },
    });
    return data.sendOtp;
  }

  static async verifyOtp(
    phoneNumber: string,
    otpCode: string
  ): Promise<VerifyOtpResponse> {
    const input: VerifyOtpInput = {
      phone_number: phoneNumber,
      otp_code: otpCode,
    };
    const { data } = await apolloClient.mutate({
      mutation: VERIFY_OTP,
      variables: { input },
    });
    return data.verifyOtp;
  }

  // Game Operations
  static async spinSlotMachine(
    userId: string
  ): Promise<SpinSlotMachineResponse> {
    const { data } = await apolloClient.mutate({
      mutation: SPIN_SLOT_MACHINE,
      variables: { user_id: userId },
    });
    return data.spinSlotMachine;
  }

  // Promo Code Operations - redeem functionality removed

  // Query Operations
  static async getUser(id: string): Promise<User> {
    const { data } = await apolloClient.query({
      query: GET_USER,
      variables: { id },
    });
    return data.getUser;
  }

  static async getUserPromoCodes(userId: string): Promise<UserPromoCode[]> {
    const { data } = await apolloClient.query({
      query: GET_USER_PROMO_CODES,
      variables: { user_id: userId },
    });
    return data.getUserPromoCodes;
  }

  static async getStats(): Promise<Stats> {
    const { data } = await apolloClient.query({
      query: GET_STATS,
    });
    return data.getStats;
  }

  static async checkPlayStatus(
    userId: string
  ): Promise<CheckPlayStatusResponse> {
    const { data } = await apolloClient.query({
      query: CHECK_PLAY_STATUS,
      variables: { user_id: userId },
      fetchPolicy: "no-cache", // Always get fresh data
    });
    return data.checkPlayStatus;
  }

  // Utility method to handle errors
  static handleError(error: unknown): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const apolloError = error as any;
    if (apolloError.graphQLErrors && apolloError.graphQLErrors.length > 0) {
      return apolloError.graphQLErrors[0].message;
    } else if (apolloError.networkError) {
      return "Network error occurred";
    } else {
      return apolloError.message || "An unknown error occurred";
    }
  }
}

export default ApiService;
