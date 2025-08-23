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

// Promo Code Mutations - redeem functionality removed

export const SPIN_SLOT_MACHINE = gql`
  mutation SpinSlotMachine($user_id: ID!) {
    spinSlotMachine(user_id: $user_id) {
      result
      success
      message
      promo_code
    }
  }
`;
