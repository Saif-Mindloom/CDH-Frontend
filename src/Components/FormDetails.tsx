import { forwardRef, useState, useImperativeHandle } from "react";

interface ContentProps {
  title?: string;
  subtitle?: string;
  Label1?: string;
  Label1Placeholder?: string;
  Label2?: string;
  Label2Placeholder?: string;
  buttonText?: string;
  onSubmit?: (name: string, email: string) => void;
}

export interface FormDetailsRef {
  submitForm: () => void;
}
export const FormDetails = forwardRef<FormDetailsRef, ContentProps>(
  (
    {
      title = "Personal Details",
      subtitle = "Helps you avail discounts and offers!",
      Label1 = "Name",
      Label1Placeholder = "John Doe",
      Label2 = "Date of Birth",
      Label2Placeholder = "DD/MM/YYYY",
      buttonText = "Proceed",
      onSubmit,
    },
    ref
  ) => {
    const [name, setName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");

    // Check if form is ready to submit
    const isFormReady =
      name.trim().length > 0 && dateOfBirth.trim().length === 10;

    const handleSubmit = () => {
      if (isFormReady) {
        onSubmit?.(name, dateOfBirth);
      }
    };

    // Expose form methods and data to parent via ref
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
          padding: window.innerWidth <= 768 ? "32px 20px" : "40px 24px",
          boxSizing: "border-box",
          gap: window.innerWidth <= 768 ? 20 : 28,
          textAlign: "left",
          fontSize: window.innerWidth <= 768 ? 22 : 30,
          color: "#09090b",
          fontFamily: "Satoshi",
          fontWeight: 700,
          position: "relative",
          zIndex: 2,
        }}
      >
        <img
          src="src/assets/CDH_Logo.png"
          alt="Cafe Delhi Heights"
          style={{
            width: "75px",
            height: "75px",
            position: "absolute",
            top: "-50px",
            // left: "16px",
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
            gap: window.innerWidth <= 768 ? 20 : 28,
            fontSize: window.innerWidth <= 768 ? 14 : 16,
          }}
        >
          {/* Name Input */}
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
                  lineHeight: window.innerWidth <= 768 ? "20px" : "24px",
                  fontWeight: 600,
                  fontSize: window.innerWidth <= 768 ? "12px" : "16px",
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
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={Label1Placeholder}
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

          {/* DOB Input */}
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
                  lineHeight: window.innerWidth <= 768 ? "20px" : "24px",
                  fontWeight: 600,
                  fontSize: window.innerWidth <= 768 ? "12px" : "16px",
                }}
              >
                {Label2}
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
              <input
                type="text"
                value={dateOfBirth}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, ""); // Remove non-digits

                  // Add slashes at appropriate positions
                  if (value.length >= 2) {
                    value = value.substring(0, 2) + "/" + value.substring(2);
                  }
                  if (value.length >= 5) {
                    value = value.substring(0, 5) + "/" + value.substring(5, 9);
                  }

                  setDateOfBirth(value);
                }}
                placeholder={Label2Placeholder}
                maxLength={10}
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

          {/* Submit Button */}
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
              fontWeight: 600,
              fontSize: window.innerWidth <= 768 ? "12px" : "16px",
              opacity: isFormReady ? 1 : 0.6,
            }}
            onClick={handleSubmit}
          >
            {buttonText}
          </div>
        </div>
      </div>
    );
  }
);

export default FormDetails;
