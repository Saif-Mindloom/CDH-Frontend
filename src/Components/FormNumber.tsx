import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { ApiService } from "../services/api";

interface ContentProps {
  title?: string;
  subtitle?: string;
  Label1?: string;
  Label1Placeholder?: string;
  Label2?: string;
  Label2Placeholder?: string;
  buttonText?: string;
  resendText?: string;
  onSubmit?: (phone: string, otp: string, user?: any) => void;
  onSendOtp?: (phone: string) => void;
}

export interface FormNumberRef {
  submitForm: () => void;
}

export const FormNumber = forwardRef<FormNumberRef, ContentProps>(
  (
    {
      title = "Enter details",
      subtitle = "Enter your phone number and OTP.",
      Label1 = "Phone Number",
      Label1Placeholder = "+91",
      Label2 = "OTP",
      Label2Placeholder = "Enter your OTP",
      buttonText = "Sign in",
      resendText = "Resend OTP",
      onSubmit,
      onSendOtp,
    },
    ref
  ) => {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const otpInputRef = useRef<HTMLInputElement>(null);

    // Auto-focus OTP input when phone number reaches 10 digits
    const handlePhoneChange = async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
      if (value.length <= 10) {
        setPhone(value);
        setError("");

        if (value.length === 10 && !otpSent) {
          // Auto-send OTP when phone number is complete
          await sendOtp(value);
        }
      }
    };

    // Send OTP
    const sendOtp = async (phoneNumber: string) => {
      try {
        setLoading(true);
        setError("");

        const response = await ApiService.sendOtp(phoneNumber);
        console.log(response, "otp response");

        if (response.success) {
          setOtpSent(true);
          onSendOtp?.(phoneNumber);
          // Auto-focus OTP input after OTP is sent
          setTimeout(() => {
            otpInputRef.current?.focus();
          }, 100);
        } else {
          setError(response.message);
          console.log(response, "number");
          console.log(response);
        }
      } catch (err) {
        setError(ApiService.handleError(err));
      } finally {
        setLoading(false);
      }
    };

    // Handle OTP change with 6-digit limit
    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
      if (value.length <= 6) {
        setOtp(value);
        setError("");
      }
    };

    // Check if form is ready to submit
    const isFormReady = phone.length === 10 && otp.length === 6 && !loading;

    // Handle form submission
    const handleSubmit = async () => {
      if (!isFormReady) return;

      try {
        setLoading(true);
        setError("");

        const response = await ApiService.verifyOtp(phone, otp);
        console.log(response, "otp response");

        if (response.success && !response.user) {
          console.log(
            response,
            "otp is verified but the user is not set go for registrations"
          );
          console.log("otp is verifed 1");
          onSubmit?.(phone, otp, response.user);
        } else if (response.success && response.user) {
          console.log(response, "otp is verified and the user is set");
          console.log("otp is verifed 2");
          onSubmit?.(phone, otp, response.user);
        } else {
          setError(response.message);
          console.log(response, "otp is error");
        }
      } catch (err) {
        setError(ApiService.handleError(err));
      } finally {
        setLoading(false);
      }
    };

    // Handle resend OTP
    const handleResendOtp = async () => {
      if (phone.length === 10) {
        setOtp("");
        setOtpSent(false);
        await sendOtp(phone);
      }
    };

    // Expose submit function to parent via ref
    useImperativeHandle(ref, () => ({
      submitForm: handleSubmit,
    }));

    return (
      <div
        style={{
          width: window.innerWidth <= 768 ? "90%" : "25%",
          maxWidth: window.innerWidth <= 768 ? "400px" : "none",
          borderRadius: window.innerWidth <= 768 ? 12 : 16,
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: window.innerWidth <= 768 ? "32px 20px" : "30px 24px",
          boxSizing: "border-box",
          gap: window.innerWidth <= 768 ? 20 : 28,
          textAlign: "left",
          fontSize: window.innerWidth <= 768 ? 22 : 30,
          color: "#09090b",
          fontFamily: "Inter",
          position: "relative",
          zIndex: 2,
        }}
      >
        <img
          src="src/assets/CDH_Logo.png"
          alt="Cafe Delhi Heights"
          style={{
            width: "78px",
            height: "78px",
            position: "absolute",
            top: "-40px",
          }}
        />

        {/* Heading */}
        <div
          style={{
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: window.innerWidth <= 768 ? 6 : 10,
          }}
        >
          <b
            style={{
              letterSpacing: "-0.04em",
              fontFamily: "Satoshi",
              fontWeight: 700,
              fontSize: window.innerWidth <= 768 ? "22px" : "30px",
            }}
          >
            {title}
          </b>
          <div
            style={{
              alignSelf: "stretch",
              fontSize: window.innerWidth <= 768 ? 12 : 16,
              lineHeight: window.innerWidth <= 768 ? "20px" : "24px",
              fontWeight: 500,
              fontFamily: "Satoshi",
              color: "#71717a",
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              alignSelf: "stretch",
              padding: "12px",
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              color: "#dc2626",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        {/* Inputs */}
        <div
          style={{
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: window.innerWidth <= 768 ? 20 : 28,
            fontSize: window.innerWidth <= 768 ? 12 : 16,
          }}
        >
          {/* Phone Number */}
          <div
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: 6,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: window.innerWidth <= 768 ? "12px" : "16px",
                  fontFamily: "Satoshi",
                  fontWeight: 700,
                }}
              >
                {Label1}
              </div>
            </div>
            <div
              style={{
                alignSelf: "stretch",
                borderRadius: window.innerWidth <= 768 ? 6 : 8,
                backgroundColor: "#fff",
                border: "1px solid #e4e4e7",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: window.innerWidth <= 768 ? 16 : 20,
                color: "#71717a",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder={Label1Placeholder}
                  maxLength={10}
                  disabled={loading}
                  style={{
                    border: "none",
                    width: "100%",
                    outline: "none",
                    flex: 1,
                    fontSize: window.innerWidth <= 768 ? 14 : 16,
                    color: "#09090b",
                    backgroundColor: "#fff",
                  }}
                />
              </div>
            </div>
          </div>

          {/* OTP */}
          <div
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: 6,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: window.innerWidth <= 768 ? "12px" : "16px",
                  fontFamily: "Satoshi",
                  fontWeight: 700,
                }}
              >
                {Label2}
              </div>
            </div>
            <div
              style={{
                alignSelf: "stretch",
                borderRadius: window.innerWidth <= 768 ? 6 : 8,
                border: "1px solid #e4e4e7",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: window.innerWidth <= 768 ? 16 : 20,
                color: "#71717a",
              }}
            >
              <input
                ref={otpInputRef}
                type="text"
                value={otp}
                onChange={handleOtpChange}
                placeholder={Label2Placeholder}
                maxLength={6}
                disabled={loading || !otpSent}
                style={{
                  border: "none",
                  outline: "none",
                  flex: 1,
                  fontSize: window.innerWidth <= 768 ? 12 : 16,
                  color: "#09090b",
                  backgroundColor: "#fff",
                }}
              />
            </div>
          </div>

          {/* Button */}
          <div
            style={{
              alignSelf: "stretch",
              borderRadius: window.innerWidth <= 768 ? 6 : 8,
              backgroundColor: isFormReady ? "#FDCF3E" : "#9ca3af",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: window.innerWidth <= 768 ? "16px 12px" : "20px 16px",
              color: isFormReady ? "#B52354" : "#71717a",
              cursor: isFormReady ? "pointer" : "not-allowed",
              fontFamily: "Satoshi",
              fontWeight: 700,
              opacity: isFormReady ? 1 : 0.6,
              fontSize: window.innerWidth <= 768 ? "14px" : "16px",
            }}
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : buttonText}
          </div>
        </div>

        {/* Bottom */}
        {otpSent && (
          <div
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontSize: window.innerWidth <= 768 ? 12 : 14,
              color: "#71717a",
              cursor: "pointer",
              fontFamily: "Satoshi",
              fontWeight: 500,
            }}
            onClick={handleResendOtp}
          >
            {resendText}
          </div>
        )}
      </div>
    );
  }
);

// FormNumber.displayName = "FormNumber";
