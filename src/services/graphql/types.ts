// Enums
export enum GameResult {
  WIN = "WIN",
  LOSE = "LOSE",
  HALFOFF = "HALFOFF",
}

export enum PromoSentVia {
  DISPLAY = "DISPLAY",
  SMS = "SMS",
}

// Input Types
export interface RegisterUserInput {
  full_name: string;
  phone_number: string;
  dob: string;
  email?: string;
  anniversary_date?: string;
}

export interface SendOtpInput {
  phone_number: string;
}

export interface VerifyOtpInput {
  phone_number: string;
  otp_code: string;
}

export interface GameResultInput {
  user_id: string;
  result: GameResult;
}

// Response Types
export interface User {
  id: string;
  full_name: string;
  phone_number: string;
  dob: string;
  email?: string;
  anniversary_date?: string;
  created_at: string;
  updated_at: string;
  games?: Game[];
  promoCodes?: UserPromoCode[];
}

export interface Game {
  id: string;
  user_id: string;
  play_date: string;
  result: GameResult;
  created_at: string;
  user?: User;
}

export interface PromoCode {
  id: string;
  code: string;
  display_method: PromoSentVia;
  created_at: string;
}

export interface UserPromoCode {
  id: string;
  user_id: string;
  promo_code_id: string;
  assigned_at: string;
  redeemed_at?: string;
  is_redeemed: boolean;
  user?: User;
  promoCode?: PromoCode;
}

export interface OtpResponse {
  success: boolean;
  message: string;
  expires_at?: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface GameResultResponse {
  success: boolean;
  message: string;
  game?: Game;
  promo_code?: string;
}

export interface PromoSendResponse {
  success: boolean;
  message: string;
}

export interface Stats {
  total_users: number;
  total_logins: number;
  total_spins: number;
  total_wins: number;
  total_promo_codes_assigned: number;
  total_promo_codes_redeemed: number;
  redeemed_codes_details: RedeemedCodeDetail[];
}

export interface RedeemedCodeDetail {
  user_id: string;
  phone_number: string;
  promo_code: string;
  redeemed_at: string;
}

export interface CheckPlayStatusResponse {
  can_play: boolean;
  message: string;
  last_played?: string;
}

export interface SpinSlotMachineResponse {
  result: GameResult;
  success: boolean;
  message: string;
  promo_code?: string;
}
