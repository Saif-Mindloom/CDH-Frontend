import { gql } from "@apollo/client";

// User Queries
export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      full_name
      phone_number
      dob
      email
      anniversary_date
      created_at
      updated_at
      games {
        id
        play_date
        result
        created_at
      }
      promoCodes {
        id
        promo_code_id
        assigned_at
        redeemed_at
        is_redeemed
        promoCode {
          id
          code
          display_method
        }
      }
    }
  }
`;

export const GET_USER_PROMO_CODES = gql`
  query GetUserPromoCodes($user_id: ID!) {
    getUserPromoCodes(user_id: $user_id) {
      id
      user_id
      promo_code_id
      assigned_at
      redeemed_at
      is_redeemed
      user {
        id
        full_name
        phone_number
      }
      promoCode {
        id
        code
        display_method
      }
    }
  }
`;

export const GET_STATS = gql`
  query GetStats {
    getStats {
      total_users
      total_logins
      total_spins
      total_wins
      total_promo_codes_assigned
      total_promo_codes_redeemed
      redeemed_codes_details {
        user_id
        phone_number
        promo_code
        redeemed_at
      }
    }
  }
`;

export const CHECK_PLAY_STATUS = gql`
  query CheckPlayStatus($user_id: ID!) {
    checkPlayStatus(user_id: $user_id) {
      can_play
      message
      last_played
    }
  }
`;
