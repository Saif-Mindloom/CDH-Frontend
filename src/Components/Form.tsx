// import type { NextPage } from "next";
import { useState } from "react";

interface ContentProps {
  title?: string;
  subtitle?: string;
  Label1?: string;
  Label1Placeholder?: string;
  Label2?: string;
  Label2Placeholder?: string;
  buttonText?: string;
  resendText?: string;
}

export const FormNumber: React.FC<ContentProps> = ({
  title = "Register",
  subtitle = "Enter your phone number and OTP.",
  Label1 = "Phone Number",
  Label1Placeholder = "+91",
  Label2 = "OTP",
  Label2Placeholder = "Enter your OTP",
  buttonText = "Sign in",
  resendText = "Resend OTP",
}) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <div
      style={{
        width: "25%",
        borderRadius: 16,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        boxSizing: "border-box",
        gap: 28,
        textAlign: "left",
        fontSize: 30,
        color: "#09090b",
        fontFamily: "Inter",
      }}
    >
      {/* Heading */}
      <div
        style={{
          alignSelf: "stretch",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: 10,
        }}
      >
        <b style={{ letterSpacing: "-0.04em" }}>{title}</b>
        <div
          style={{
            alignSelf: "stretch",
            fontSize: 16,
            lineHeight: "24px",
            fontWeight: 500,
            color: "#71717a",
          }}
        >
          {subtitle}
        </div>
      </div>

      {/* Inputs */}
      <div
        style={{
          alignSelf: "stretch",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          fontSize: 16,
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
            <div style={{ lineHeight: "24px", fontWeight: 600 }}>{Label1}</div>
          </div>
          <div
            style={{
              alignSelf: "stretch",
              borderRadius: 8,
              backgroundColor: "#fff",
              border: "1px solid #e4e4e7",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: 20,
              color: "#71717a",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                // flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* <span style={{ marginRight: 8, fontWeight: 500 }}>
                {Label1Placeholder}
              </span> */}
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={Label1Placeholder}
                style={{
                  border: "none",
                  width: "100%",
                  outline: "none",
                  flex: 1,
                  fontSize: 16,
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
            <div style={{ lineHeight: "24px", fontWeight: 600 }}>{Label2}</div>
          </div>
          <div
            style={{
              alignSelf: "stretch",
              borderRadius: 8,
              //   backgroundColor: "#fff",
              border: "1px solid #e4e4e7",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: 20,
              color: "#71717a",
            }}
          >
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder={Label2Placeholder}
              maxLength={10}
              style={{
                border: "none",
                outline: "none",
                flex: 1,
                fontSize: 16,
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
            borderRadius: 8,
            backgroundColor: "#09090b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 16px",
            color: "#fafafa",
            cursor: "pointer",
            fontWeight: 600,
          }}
          onClick={() => alert(`Phone: ${phone}, OTP: ${otp}`)}
        >
          {buttonText}
        </div>
      </div>

      {/* Bottom */}
      <div
        style={{
          alignSelf: "stretch",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontSize: 14,
          color: "#71717a",
          cursor: "pointer",
        }}
      >
        {resendText}
      </div>
    </div>
  );
};
export const FormDetails: React.FC<ContentProps> = ({
  title = "Register",
  subtitle = "Enter your phone number and OTP.",
  Label1 = "Phone Number",
  Label1Placeholder = "+91",
  Label2 = "OTP",
  Label2Placeholder = "Enter your OTP",
  buttonText = "Sign in",
  resendText = "Resend OTP",
}) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <div
      style={{
        width: "25%",
        borderRadius: 16,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        boxSizing: "border-box",
        gap: 28,
        textAlign: "left",
        fontSize: 30,
        color: "#09090b",
        fontFamily: "Inter",
      }}
    >
      {/* Heading */}
      <div
        style={{
          alignSelf: "stretch",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: 10,
        }}
      >
        <b style={{ letterSpacing: "-0.04em" }}>{title}</b>
        <div
          style={{
            alignSelf: "stretch",
            fontSize: 16,
            lineHeight: "24px",
            fontWeight: 500,
            color: "#71717a",
          }}
        >
          {subtitle}
        </div>
      </div>

      {/* Inputs */}
      <div
        style={{
          alignSelf: "stretch",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          fontSize: 16,
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
            <div style={{ lineHeight: "24px", fontWeight: 600 }}>{Label1}</div>
          </div>
          <div
            style={{
              alignSelf: "stretch",
              borderRadius: 8,
              backgroundColor: "#fff",
              border: "1px solid #e4e4e7",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: 20,
              color: "#71717a",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                // flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* <span style={{ marginRight: 8, fontWeight: 500 }}>
                {Label1Placeholder}
              </span> */}
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={Label1Placeholder}
                style={{
                  border: "none",
                  width: "100%",
                  outline: "none",
                  flex: 1,
                  fontSize: 16,
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
            <div style={{ lineHeight: "24px", fontWeight: 600 }}>{Label2}</div>
          </div>
          <div
            style={{
              alignSelf: "stretch",
              borderRadius: 8,
              //   backgroundColor: "#fff",
              border: "1px solid #e4e4e7",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: 20,
              color: "#71717a",
            }}
          >
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder={Label2Placeholder}
              style={{
                border: "none",
                outline: "none",
                flex: 1,
                fontSize: 16,
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
            borderRadius: 8,
            backgroundColor: "#09090b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 16px",
            color: "#fafafa",
            cursor: "pointer",
            fontWeight: 600,
          }}
          onClick={() => alert(`Phone: ${phone}, OTP: ${otp}`)}
        >
          {buttonText}
        </div>
      </div>

      {/* Bottom */}
      <div
        style={{
          alignSelf: "stretch",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontSize: 14,
          color: "#71717a",
          cursor: "pointer",
        }}
      >
        {resendText}
      </div>
    </div>
  );
};
export const PromptResult: React.FC<ContentProps> = ({
  title = "Register",
  subtitle = "Enter your phone number and OTP.",
  Label1 = "Phone Number",
  Label1Placeholder = "+91",
  Label2 = "OTP",
  Label2Placeholder = "Enter your OTP",
  buttonText = "Sign in",
  resendText = "Resend OTP",
}) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <div
      style={{
        width: "25%",
        borderRadius: 16,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        boxSizing: "border-box",
        gap: 28,
        textAlign: "left",
        fontSize: 30,
        color: "#09090b",
        fontFamily: "Inter",
      }}
    >
      {/* Heading */}
      <div
        style={{
          alignSelf: "stretch",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: 10,
        }}
      >
        <b style={{ letterSpacing: "-0.04em" }}>{title}</b>
        <div
          style={{
            alignSelf: "stretch",
            fontSize: 16,
            lineHeight: "24px",
            fontWeight: 500,
            color: "#71717a",
          }}
        >
          {subtitle}
        </div>
      </div>

      {/* Inputs */}
      <div
        style={{
          alignSelf: "stretch",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          fontSize: 16,
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
            <div style={{ lineHeight: "24px", fontWeight: 600 }}>{Label1}</div>
          </div>
          <div
            style={{
              alignSelf: "stretch",
              borderRadius: 8,
              backgroundColor: "#fff",
              border: "1px solid #e4e4e7",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: 20,
              color: "#71717a",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                // flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* <span style={{ marginRight: 8, fontWeight: 500 }}>
                {Label1Placeholder}
              </span> */}
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={Label1Placeholder}
                style={{
                  border: "none",
                  width: "100%",
                  outline: "none",
                  flex: 1,
                  fontSize: 16,
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
            <div style={{ lineHeight: "24px", fontWeight: 600 }}>{Label2}</div>
          </div>
          <div
            style={{
              alignSelf: "stretch",
              borderRadius: 8,
              //   backgroundColor: "#fff",
              border: "1px solid #e4e4e7",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: 20,
              color: "#71717a",
            }}
          >
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder={Label2Placeholder}
              style={{
                border: "none",
                outline: "none",
                flex: 1,
                fontSize: 16,
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
            borderRadius: 8,
            backgroundColor: "#09090b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 16px",
            color: "#fafafa",
            cursor: "pointer",
            fontWeight: 600,
          }}
          onClick={() => alert(`Phone: ${phone}, OTP: ${otp}`)}
        >
          {buttonText}
        </div>
      </div>

      {/* Bottom */}
      <div
        style={{
          alignSelf: "stretch",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontSize: 14,
          color: "#71717a",
          cursor: "pointer",
        }}
      >
        {resendText}
      </div>
    </div>
  );
};
