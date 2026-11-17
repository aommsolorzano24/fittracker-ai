"use client";

import { useEffect, useState } from "react";

import WelcomeScreen from "./components/WelcomeScreen";
import ChoosePathScreen from "./components/ChoosePathScreen";
import BasicInfoScreen from "./components/BasicInfoScreen";
import CurrentWeightScreen from "./components/CurrentWeightScreen";
import AnalysisScreen from "./components/AnalysisScreen";
import DashboardScreen from "./components/DashboardScreen";

export default function Home() {
  const [screen, setScreen] = useState("welcome");

  const [selectedPath, setSelectedPath] = useState("");

  const [userData, setUserData] = useState({
    gender: "",
    age: "",
    heightFeet: "",
    heightInches: "",
    currentWeight: "",
  });

  const [restored, setRestored] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("norden-profile-v1");
      if (raw) {
        const saved = JSON.parse(raw);
        if (["healthy", "fitness"].includes(saved.selectedPath) && saved.userData &&
          ["gender", "age", "heightFeet", "heightInches", "currentWeight"].every(key => typeof saved.userData[key] === "string")) {
          setUserData(saved.userData);
          setSelectedPath(saved.selectedPath);
          setScreen("dashboard");
        }
      }
    } catch { /* Onboarding remains available if storage cannot be read. */ }
    setRestored(true);
  }, []);

  if (!restored) return <p>Loading Norden…</p>;

  if (screen === "welcome") {
    return <WelcomeScreen onStart={() => setScreen("path")} />;
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
        try {
          localStorage.setItem("norden-profile-v1", JSON.stringify({ userData, selectedPath }));
        } catch { /* Journey will report storage failures when saving progress. */ }
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

return <WelcomeScreen onStart={() => setScreen("path")} />;
}
