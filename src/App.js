import React from "react";
import { Routes, Route } from "react-router-dom";
import keycloak from "./keycloack";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import TopBar from "./Components/TopBar";
import LineChart from "./Components/LIneChart";

function App() {
  return (
    <>
      <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{ onLoad: "login-required"}}         
      >
        {/* <Navbar /> */}
          <TopBar />
        <Routes >
        <Route exact path="/" element={<LineChart />} />
          {/* <Route exact path="/" element={<StepForm />} />
          <Route exact path="/list" element={<List />} />
          <Route exact path="/progress" element={<ProgressPage />} />
          <Route exact path="/serviceList" element={<ServiceList />} />
          <Route exact path="/workflowList" element={< WorkflowList/>}/> */}
        </Routes>
      </ReactKeycloakProvider>
    </>
  );
}

export default App;
