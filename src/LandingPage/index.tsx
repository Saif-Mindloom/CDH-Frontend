import { useRef, useState } from "react";
import SlotMachine, { type SlotMachineRef } from "../SlotMachine";
import { FormNumber, type FormNumberRef } from "../Components/FormNumber";
import FormDetails, { type FormDetailsRef } from "../Components/FormDetails";
import PromptResult from "../Components/PromptResult";
import { ApiService } from "../services/api";
import type { User } from "../services/graphql/types";

const LandingPage: React.FC = () => {
  const slotMachineRef = useRef<SlotMachineRef>(null);
  const formRef = useRef<FormNumberRef>(null);
  const formDetailsRef = useRef<FormDetailsRef>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState<string>("");
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [loginPopupVisible, setLoginPopupVisible] = useState(false);
  const [isRegisteredUser, setIsRegisteredUser] = useState(false);
  const [userName, setUserName] = useState("");

  const checkUserPlayStatus = async (userId: string) => {
    try {
      setCheckingPlayStatus(true);
      const playStatus = await ApiService.checkPlayStatus(userId);
      setCanPlay(playStatus.can_play);
      setPlayMessage(playStatus.message);
    } catch (error) {
      console.error("Error checking play status:", error);
      setPlayMessage("Unable to check play status. Please try again.");
    } finally {
      setCheckingPlayStatus(false);
    }
  };

  const handleRegisterSpin = async () => {
    if (!currentUser) {
      console.error("No user found for spinning");
      return;
    }

    if (!canPlay) {
      console.log("User cannot play today");
      return;
    }

    try {
      // Call backend to spin slot machine and get result
      const spinResponse = await ApiService.spinSlotMachine(currentUser.id);

      if (spinResponse.success) {
        // Convert backend result to frontend format
        let frontendResult: "won" | "lost" | "halfoff";
        switch (spinResponse.result) {
          case "WIN":
            frontendResult = "won";
            break;
          case "HALFOFF":
            frontendResult = "halfoff";
            break;
          case "LOSE":
          default:
            frontendResult = "lost";
            break;
        }
        slotMachineRef.current?.spin(frontendResult);
        // Update state with the result
        setSpinResult(frontendResult);

        // Store promo code if received
        if (spinResponse.promo_code) {
          setCurrentPromoCode(spinResponse.promo_code);
        }

        // Start the slot machine animation and pass the predetermined result
        if (slotMachineRef.current) {
          slotMachineRef.current.spin(frontendResult);
        }

        // Refresh play status after spinning
        await checkUserPlayStatus(currentUser.id);
      } else {
        console.error("Spin failed:", spinResponse.message);
        // Show error message to user
        setPlayMessage(spinResponse.message);
      }
    } catch (error) {
      console.error("Error spinning slot machine:", error);
      setPlayMessage("Failed to spin. Please try again.");
    }
  };

  const handleOtpSent = (phone: string) => {
    setCurrentPhoneNumber(phone);
  };

  const handleFormSubmission = async (
    phone: string,
    otp: string,
    user?: User
  ) => {
    if (user) {
      setCurrentUser(user);
      setUserName(user.full_name);
      setIsLoggedin(true);
      setLoginPopupVisible(false);
      setIsRegisteredUser(true);

      // Check if user can play today
      await checkUserPlayStatus(user.id);

      // Check if user already has all required details
      if (user.full_name && user.dob && user.phone_number) {
        setIsRegisteredUser(true);
      } else {
        setIsRegisteredUser(false);
      }
    } else {
      // User needs to register (new user)
      setCurrentPhoneNumber(phone);
      setIsLoggedin(true);
      setLoginPopupVisible(false);
      setIsRegisteredUser(false);
    }
  };

  const handleFormDetailsSubmission = async (user: User) => {
    setCurrentUser(user);
    setUserName(user.full_name);
    setIsLoggedin(true);
    setIsRegisteredUser(true);

    // Check if user can play today
    await checkUserPlayStatus(user.id);
  };

  const [spinResult, setSpinResult] = useState<"won" | "lost" | "halfoff">(
    "lost"
  );
  const [spinCompleted, setSpinCompleted] = useState(false);
  const [currentPromoCode, setCurrentPromoCode] = useState<
    string | undefined
  >();
  const [canPlay, setCanPlay] = useState(true);
  const [playMessage, setPlayMessage] = useState("");
  const [checkingPlayStatus, setCheckingPlayStatus] = useState(false);

  const handleSpinComplete = async (result: "won" | "lost" | "halfoff") => {
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

        {/* Play status message */}
        {/* {isLoggedin && playMessage && !canPlay && (
          <p
            style={{
              color: canPlay ? "#22c55e" : "#ef4444",
              textAlign: "center",
              fontFamily: "Inter",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "normal",
              letterSpacing: "-0.64px",
              marginTop: "10px",
              marginBottom: "10px",
              padding: "8px 16px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "8px",
              maxWidth: "300px",
              margin: "10px auto",
            }}
          >
            {playMessage}
          </p>
        )} */}

        {/* Loading indicator for play status check */}
        {checkingPlayStatus && (
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
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            Checking play status...
          </p>
        )}

        {/* spin button */}
        <button
          onClick={() => {
            if (!isLoggedin) {
              setLoginPopupVisible(true);
            } else if (canPlay && !checkingPlayStatus) {
              handleRegisterSpin();
            }
          }}
          disabled={isLoggedin && (!canPlay || checkingPlayStatus)}
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
            background:
              isLoggedin && (!canPlay || checkingPlayStatus)
                ? "#888"
                : "#FDCF3E",
            boxShadow:
              isLoggedin && (!canPlay || checkingPlayStatus)
                ? "0 4px 1.1px 0 #555"
                : "0 4px 1.1px 0 #9D0F3F",
            opacity: isLoggedin && (!canPlay || checkingPlayStatus) ? 0.6 : 1,
            cursor:
              isLoggedin && (!canPlay || checkingPlayStatus)
                ? "not-allowed"
                : "pointer",
          }}
        >
          {!isLoggedin
            ? "Register for a Free Spin"
            : checkingPlayStatus
            ? "Checking..."
            : canPlay
            ? "Spin Now"
            : "Already Played Today"}
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
          <FormNumber
            ref={formRef}
            onSubmit={handleFormSubmission}
            onSendOtp={handleOtpSent}
          />
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
            phoneNumber={currentPhoneNumber}
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
            result={spinResult}
            code={currentPromoCode}
            userId={currentUser?.id}
            onComplete={() => {
              setSpinCompleted(false);
              setSpinResult("lost");
              setCurrentPromoCode(undefined);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
