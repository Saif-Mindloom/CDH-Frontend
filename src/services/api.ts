import { apolloClient } from "./apollo";
import {
  REGISTER_USER,
  SEND_OTP,
  VERIFY_OTP,
  SAVE_GAME_RESULT,
  REDEEM_PROMO_CODE,
} from "./graphql/mutations";
import {
  GET_USER,
  GET_USER_PROMO_CODES,
  GET_STATS,
  CHECK_PLAY_STATUS,
} from "./graphql/queries";
import type {
  RegisterUserInput,
  SendOtpInput,
  VerifyOtpInput,
  GameResultInput,
  User,
  OtpResponse,
  VerifyOtpResponse,
  GameResultResponse,
  PromoSendResponse,
  UserPromoCode,
  Stats,
  CheckPlayStatusResponse,
} from "./graphql/types";
import { GameResult } from "./graphql/types";

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
  static async saveGameResult(
    userId: string,
    result: GameResult
  ): Promise<GameResultResponse> {
    const input: GameResultInput = {
      user_id: userId,
      result,
    };
    const { data } = await apolloClient.mutate({
      mutation: SAVE_GAME_RESULT,
      variables: { input },
    });
    return data.saveGameResult;
  }

  // Promo Code Operations
  static async redeemPromoCode(
    promoCode: string,
    userId: string
  ): Promise<PromoSendResponse> {
    const { data } = await apolloClient.mutate({
      mutation: REDEEM_PROMO_CODE,
      variables: { promo_code: promoCode, user_id: userId },
    });
    return data.redeemPromoCode;
  }

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
    if (error?.graphQLErrors?.length > 0) {
      return error.graphQLErrors[0].message;
    }
    if (error?.networkError) {
      return "Network error. Please check your connection.";
    }
    return error?.message || "An unexpected error occurred.";
  }
}

export default ApiService;
