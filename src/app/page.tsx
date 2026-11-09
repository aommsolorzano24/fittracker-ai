"use client";

import { useState } from "react";

import WelcomeScreen from "./components/WelcomeScreen";
import ChoosePathScreen from "./components/ChoosePathScreen";
import BasicInfoScreen from "./components/BasicInfoScreen";
import CurrentWeightScreen from "./components/CurrentWeightScreen";
import AnalysisScreen from "./components/AnalysisScreen";
import DashboardScreen from "./components/DashboardScreen";

export default function Home() {
  const [screen, setScreen] = useState("path");

  const [selectedPath, setSelectedPath] = useState("");

  const [userData, setUserData] = useState({
    gender: "",
    age: "",
    heightFeet: "",
    heightInches: "",
    currentWeight: "",
  });

  if (screen === "welcome") {
    return <WelcomeScreen />;
  }

  if (screen === "path") {
    return (
      <ChoosePathScreen
        onSelect={(path) => {
          setSelectedPath(path);
          setScreen("basic");
        }}
      />
    );
  }

  if (screen === "basic") {
  return (
    <BasicInfoScreen
      userData={userData}
      setUserData={setUserData}
      onBack={() => {
        setScreen("path");
      }}
      onContinue={() => {
        setScreen("weight");
      }}
    />
  );
}


  if (screen === "weight") {
  return (
    <CurrentWeightScreen
      userData={userData}
      setUserData={setUserData}
      onBack={() => {
        setScreen("basic");
      }}
      onContinue={() => {
        setScreen("analysis");
      }}
    />
  );
}
if (screen === "analysis") {
  return (
    <AnalysisScreen
      userData={userData}
      selectedPath={selectedPath}
      onBack={() => {
        setScreen("weight");
      }}
      onStartJourney={() => {
        setScreen("dashboard");
      }}
    />
  );
}

if (screen === "dashboard") {
  return (
    <DashboardScreen
      userData={userData}
      selectedPath={selectedPath}
    />
  );
}

return <WelcomeScreen />;
}
