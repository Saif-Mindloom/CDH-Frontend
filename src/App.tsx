import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LandingPage from "./LandingPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        // minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        // height: "100vh",
        height: "100%",
        // flex: 1,
        // overflow: "hidden",
        // backgroundColor: "red",
      }}
    >
      <LandingPage />
    </div>
  );
}

export default App;
