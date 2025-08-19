import { useRef, useState } from "react";
import SlotMachine, { type SlotMachineRef } from "../SlotMachine";
import { FormNumber } from "../Components/Form";

const LandingPage: React.FC = () => {
  const slotMachineRef = useRef<SlotMachineRef>(null);

  const handleRegisterSpin = () => {
    if (slotMachineRef.current) {
      slotMachineRef.current.spin();
    }
  };

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userName, setUserName] = useState("");
  const [newRegistration, setNewRegistration] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{}}>
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
          {isLoggedin && (
            <b
              style={{
                // width: "180px",
                // position: "relative",
                fontSize: "14px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                display: "inline-block",
                fontFamily: "Inter",
                color: "#fff",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              Hi Shri, welcome to
            </b>
          )}
        </div>

        {/* cdh */}
        <h1
          style={{
            color: "#FDCF3E",
            fontFamily: "Inter",
            fontSize: "49px",
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
          }}
        >
          <p
            style={{
              color: "#FFF",
              textAlign: "center",
              fontFamily: "Inter",
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
              letterSpacing: "-0.96px",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            <br />
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <SlotMachine ref={slotMachineRef} />
        </div>
        {/* para 2 */}
        <p
          style={{
            color: "#FFF",
            textAlign: "center",
            fontFamily: "Inter",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            letterSpacing: "-0.64px",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </p>
        {/* spin button */}
        <button
          onClick={handleRegisterSpin}
          // disabled={slotMachineRef.current?.isSpinning}
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
          {isLoggedin ? "Spin for the rewards" : "Register for a Free Spin"}
        </button>
      </div>
      {!isLoggedin && (
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
          <FormNumber />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
