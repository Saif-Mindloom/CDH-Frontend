import { ApolloProvider } from "@apollo/client";
import "./App.css";
import LandingPage from "./LandingPage";
import { apolloClient } from "./services/apollo";
import UserProvider from "./contexts/UserContext";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            height: "100%",
          }}
        >
          <LandingPage />
        </div>
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;
