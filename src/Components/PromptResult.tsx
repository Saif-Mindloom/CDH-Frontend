// Removed unused imports

interface ContentProps {
  result: "won" | "lost" | "halfoff";
  code?: string;
  onComplete?: () => void;
}

// Function to get content based on result
const getResultContent = (
  result: "won" | "lost" | "halfoff",
  code?: string
) => {
  switch (result) {
    case "won":
      return {
        title: "Congratulations!",
        subtitle:
          "You've won a free meal! Show this code to our staff at Cafe Delhi Heights.",
        promptText: "YOUR PROMO CODE:",
        buttonText: "Close",
        response: code || "WINNER100",
        showCode: true,
        backgroundColor: "#f0fdf4",
        titleColor: "#b52354",
      };

    case "halfoff":
      return {
        title: "Congratulations! 50% off",
        subtitle:
          "You've earned a 50% discount on your next order! Show this code to our staff.",
        promptText: "YOUR PROMO CODE:",
        buttonText: "Close",
        response: code || "HALF50",
        showCode: true,
        backgroundColor: "#fef3c7",
        titleColor: "#b52354",
      };

    case "lost":
      return {
        title: "Better Luck Next Time!",
        subtitle:
          "Don't worry, you still get a special consolation prize! Show this screen to our staff for a surprise discount.",
        promptText: "Special offer just for playing:",
        buttonText: "Thank You!",
        response:
          "Get 10% off on your next visit by showing this screen to our staff!",
        showCode: false,
        backgroundColor: "#fef2f2",
        titleColor: "#b52354",
      };

    default:
      return {
        title: "Your Result",
        subtitle: "Here's what we found for you.",
        promptText: "Your personalized recommendation:",
        buttonText: "Continue",
        response: "Thank you for participating!",
        showCode: false,
        backgroundColor: "#f4f4f5",
        titleColor: "#b52354",
      };
  }
};

export const PromptResult = ({ result, code, onComplete }: ContentProps) => {
  const content = getResultContent(result, code);

  const handleButtonClick = () => {
    onComplete?.();
  };

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
        padding: window.innerWidth <= 768 ? "32px 20px" : "48px 24px",
        boxSizing: "border-box",
        gap: window.innerWidth <= 768 ? 20 : 28,
        textAlign: "left",
        fontSize: window.innerWidth <= 768 ? 24 : 30,
        color: "#09090b",
        fontFamily: "Satoshi",
        border: "2px solid #e4e4e7",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        zIndex: 2,
        position: "relative",
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
        }}
      />

      {/* Heading */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 10,
        }}
      >
        <b
          style={{
            letterSpacing: "-0.04em",
            color: content.titleColor,
            fontWeight: 700,
            fontSize: window.innerWidth <= 768 ? "22px" : "28px",
          }}
        >
          {content.title}
        </b>
        <div
          style={{
            fontSize: window.innerWidth <= 768 ? 12 : 16,
            lineHeight: window.innerWidth <= 768 ? "20px" : "24px",
            fontWeight: 500,
            color: "#71717a",
          }}
        >
          {content.subtitle}
        </div>
      </div>

      {/* Error message removed - no longer needed */}

      {/* Success Message */}
      {/* {redeemed && (
        <div
          style={{
            alignSelf: "stretch",
            padding: "12px",
            backgroundColor: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "8px",
            color: "#15803d",
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          TO redeem this code, show this to our staff.
        </div>
      )} */}

      {/* Content */}
      <div
        style={{
          alignSelf: "stretch",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: window.innerWidth <= 768 ? 16 : 20,
          fontSize: window.innerWidth <= 768 ? 14 : 16,
        }}
      >
        {result !== "lost" && (
          <div
            style={{
              gap: "10px",
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: window.innerWidth <= 768 ? "220px" : "300px",
                height: window.innerWidth <= 768 ? "220px" : "300px",
                marginTop: window.innerWidth <= 768 ? "-60px" : "-60px",
                marginBottom: window.innerWidth <= 768 ? "-15px" : "-20px",
              }}
            >
              <img
                src="src/assets/FoodImages/CDH-Pizza.webp"
                alt="Cafe Delhi Heights"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>

            {/* Prompt */}
            <div
              style={{
                alignSelf: "stretch",
                fontWeight: 500,
                color: "#09090b",
                textAlign: "center",
                fontSize: window.innerWidth <= 768 ? "14px" : "16px",
              }}
            >
              {content.promptText}
            </div>

            {/* Response/Code */}
            <div
              style={{
                alignSelf: "stretch",
                borderRadius: window.innerWidth <= 768 ? 6 : 8,
                lineHeight: window.innerWidth <= 768 ? "20px" : "24px",
                color: content.showCode ? content.titleColor : "#71717a",
                textAlign: "center",
                fontWeight: content.showCode ? 700 : 400,
                fontSize: content.showCode
                  ? window.innerWidth <= 768
                    ? "20px"
                    : "26px"
                  : window.innerWidth <= 768
                  ? "14px"
                  : "16px",
                letterSpacing: content.showCode ? "2px" : "normal",
                fontFamily: content.showCode ? "monospace" : "Satoshi",
                textTransform: "uppercase",
                opacity: 1,
              }}
            >
              {content.response}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div
          style={{
            alignSelf: "stretch",
            borderRadius: window.innerWidth <= 768 ? 6 : 8,
            backgroundColor: "#fdcf3e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: window.innerWidth <= 768 ? "16px 12px" : "20px 16px",
            color: "#B52354",
            cursor: "pointer",
            fontWeight: 600,
            marginTop: window.innerWidth <= 768 ? 6 : 8,
            transition: "all 0.3s ease",
            fontSize: window.innerWidth <= 768 ? "12px" : "16px",
            opacity: 1,
          }}
          onClick={handleButtonClick}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {content.buttonText}
        </div>
      </div>
    </div>
  );
};

export default PromptResult;
