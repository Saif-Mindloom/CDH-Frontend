import { gql } from "@apollo/client";

// User Mutations
export const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      id
      full_name
      phone_number
      dob
      email
      anniversary_date
      created_at
      updated_at
    }
  }
`;

// OTP Mutations
export const SEND_OTP = gql`
  mutation SendOtp($input: SendOtpInput!) {
    sendOtp(input: $input) {
      success
      message
      expires_at
    }
  }
`;

export const VERIFY_OTP = gql`
  mutation VerifyOtp($input: VerifyOtpInput!) {
    verifyOtp(input: $input) {
      success
      message
      user {
        id
        full_name
        phone_number
        dob
        email
        anniversary_date
      }
      token
    }
  }
`;

// Game Mutations
export const SAVE_GAME_RESULT = gql`
  mutation SaveGameResult($input: GameResultInput!) {
    saveGameResult(input: $input) {
      success
      message
      game {
        id
        user_id
        play_date
        result
        created_at
      }
      promo_code
    }
  }
`;

// Promo Code Mutations
export const REDEEM_PROMO_CODE = gql`
  mutation RedeemPromoCode($promo_code: String!, $user_id: ID!) {
    redeemPromoCode(promo_code: $promo_code, user_id: $user_id) {
      success
      message
    }
  }
`;
