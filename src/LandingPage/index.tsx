import { useRef, useState } from "react";
import SlotMachine, { type SlotMachineRef } from "../SlotMachine";
import { FormNumber, type FormNumberRef } from "../Components/FormNumber";
import FormDetails, { type FormDetailsRef } from "../Components/FormDetails";
import PromptResult from "../Components/PromptResult";

const LandingPage: React.FC = () => {
  const slotMachineRef = useRef<SlotMachineRef>(null);
  const formRef = useRef<FormNumberRef>(null);
  const formDetailsRef = useRef<FormDetailsRef>(null);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [loginPopupVisible, setLoginPopupVisible] = useState(Boolean);
  const [isRegisteredUser, setIsRegisteredUser] = useState(Boolean);
  const [userName, setUserName] = useState("");

  const handleRegisterSpin = () => {
    if (slotMachineRef.current) {
      slotMachineRef.current.spin();
    }
  };

  const handleFormSubmission = (phone: string, otp: string) => {
    setIsLoggedin(true);
    setLoginPopupVisible(false);
    setIsRegisteredUser(false);
  };

  const handleFormDetailsSubmission = (name: string, dob: string) => {
    setIsLoggedin(true);
    setUserName(name);
    setIsRegisteredUser(true);
  };

  const [spinResult, setSpinResult] = useState<"won" | "lost" | "halfoff">(
    "lost"
  );
  const [spinCompleted, setSpinCompleted] = useState(false);
  const [spinButtonDisable, setSpinButtonDisable] = useState(false);

  const handleSpinComplete = (result: "won" | "lost" | "halfoff") => {
    console.log("Spin completed with result:", result);
    setSpinResult(result);
    setSpinCompleted(true);
  };

  return (
    <div
      style={{
        position: "relative",
        // width: "100%",
        // height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // padding: "30px",
        // boxSizing: "border-box",
        // backgroundColor: "red",
        flex: 1,
        height: "100%",
        width: "100vw",
      }}
    >
      <img
        src="src/assets/BackgroundLines.png"
        alt="Cafe Delhi Heights"
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -100,
          objectFit: "cover",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          // maxWidth: "400px",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* cdh logo */}
          <img
            src="src/assets/CDH_Logo.png"
            alt="Cafe Delhi Heights"
            style={{ width: "78px", height: "78px" }}
          />
          {isLoggedin && userName && (
            <b
              style={{
                // width: "180px",
                // position: "relative",
                fontSize: "12px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                display: "inline-block",
                fontFamily: "Inter",
                color: "#fff",
                textAlign: "center",
                marginTop: "20px",
                marginBottom: "-15px",
              }}
            >
              Hi {userName ? `${userName}` : "there"}, welcome to
            </b>
          )}
        </div>

        {/* cdh */}
        <h1
          style={{
            color: "#FDCF3E",
            fontFamily: "Inter",
            fontSize: "36px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
            letterSpacing: "-3.43px",
          }}
        >
          cafe delhi heights
        </h1>
        {/* paragraph and slot */}
        <div
          style={{
            // width: "780px",
            margin: "0 auto",
            marginTop: "-18px",
            // gap: "30px",
            // rowGap: "30px",
          }}
        >
          <p
            style={{
              color: "#FFF",
              textAlign: "center",
              fontFamily: "Inter",
              fontSize: "15px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
              letterSpacing: "-0.96px",
              marginBottom: "15px",
            }}
          >
            8 Lakh Juicy Lucy Sold
          </p>
          <SlotMachine
            ref={slotMachineRef}
            onSpinComplete={handleSpinComplete}
          />
        </div>
        {/* para 2 */}
        <p
          style={{
            color: "#FFF",
            textAlign: "center",
            fontFamily: "Inter",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            letterSpacing: "-0.64px",
          }}
        >
          #AteLakhJuicyAffairs
        </p>
        {/* spin button */}
        <button
          onClick={() => {
            isLoggedin ? handleRegisterSpin() : setLoginPopupVisible(true);
          }}
          // disabled={spinButtonDisable}
          style={{
            color: "#B52354",
            textAlign: "center",
            fontFamily: "Inter",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "normal",
            letterSpacing: "-0.64px",
            borderRadius: "12px",
            border: "3px solid #FFC306",
            background: "#FDCF3E",
            boxShadow: "0 4px 1.1px 0 #9D0F3F",
          }}
        >
          {isLoggedin ? "Spin Now" : "Register for a Free Spin"}
        </button>
      </div>

      {loginPopupVisible && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            height: "100%",
            width: "100vw",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <FormNumber ref={formRef} onSubmit={handleFormSubmission} />
        </div>
      )}
      {isLoggedin && !isRegisteredUser && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            height: "120vh",
            width: "100vw",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <FormDetails
            ref={formDetailsRef}
            onSubmit={handleFormDetailsSubmission}
          />
        </div>
      )}
      {spinCompleted && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            height: "100vh",
            width: "100vw",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <PromptResult
            result={"won"}
            code={spinResult !== "lost" ? "Winner100" : undefined}
            onComplete={() => {
              setSpinCompleted(false);
              setSpinResult("lost");
              setSpinButtonDisable(true);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
