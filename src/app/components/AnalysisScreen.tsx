"use client";

import { useState } from "react";
import NordenProgressBar from "./NordenProgressBar";

export default function AnalysisScreen({
  userData,
  selectedPath,
  onBack,
  onStartJourney,
}: {
  userData: any;
  selectedPath: string;
  onBack: () => void;
  onStartJourney: () => void;
}) {

  const currentWeight =
    Number(userData.currentWeight) || 0;

  const totalHeight =
    Number(userData.heightFeet) * 12 +
    Number(userData.heightInches);

  const bmi =
    totalHeight > 0
      ? (
          (currentWeight /
            (totalHeight * totalHeight)) *
          703
        ).toFixed(1)
      : "0";

  const healthyMin =
    totalHeight > 0
      ? Math.round(
          (20 * totalHeight * totalHeight) /
            703
        )
      : 0;

  const healthyMax =
    totalHeight > 0
      ? Math.round(
          (27 * totalHeight * totalHeight) /
            703
        )
      : 0;

  const fitnessMin =
    totalHeight > 0
      ? Math.round(
          (22 * totalHeight * totalHeight) /
            703
        )
      : 0;

  const fitnessMax =
    totalHeight > 0
      ? Math.round(
          (28 * totalHeight * totalHeight) /
            703
        )
      : 0;

  const targetBMI =
    selectedPath === "fitness"
      ? 23
      : 25;

  const idealTarget =
    totalHeight > 0
      ? Math.round(
          (targetBMI *
            totalHeight *
            totalHeight) /
            703
        )
      : 0;

  const [goalWeight, setGoalWeight] =
    useState(idealTarget);

  const weightToLose =
    currentWeight - goalWeight;

  let validationMessage = "";
  let validationColor = "#22C55E";

  const rangeMin =
    selectedPath === "fitness"
      ? fitnessMin
      : healthyMin;

  const rangeMax =
    selectedPath === "fitness"
      ? fitnessMax
      : healthyMax;

  if (
    goalWeight >= rangeMin &&
    goalWeight <= rangeMax
  ) {
    validationMessage =
      selectedPath === "fitness"
        ? "🔥 Within Performance Range"
        : "✅ Within Healthy Range";

    validationColor = "#22C55E";
  } else {
    validationMessage =
      "⚠️ Outside Recommended Range";

    validationColor = "#EAB308";
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#05070A",
        color: "white",
        padding: "30px",
      }}
    >
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: "#94A3B8",
          cursor: "pointer",
          marginBottom: "20px",
          fontSize: "16px",
        }}
      >
        ← Edit Information
      </button>

      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        🧭 Your Norden Analysis
      </h1>

      <div
        style={{
          backgroundColor: "#0F141A",
          padding: "24px",
          borderRadius: "16px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        <p>
          🏆 Norden Recommendation
        </p>

        <h1
          style={{
            fontSize: "48px",
            margin: 0,
          }}
        >
          {idealTarget} lbs
        </h1>

        <p>
          Recommended Goal Weight
        </p>

        <p
          style={{
            color: "#94A3B8",
          }}
        >
          {selectedPath === "fitness"
            ? "Fitness Performance"
            : "Healthy Balance"}
        </p>
      </div>

      <NordenProgressBar
        currentWeight={currentWeight}
        rangeMin={rangeMin}
        rangeMax={rangeMax}
        nordenGoal={idealTarget}
        selectedPath={selectedPath}
      />

      <div
        style={{
          backgroundColor: "#0F141A",
          padding: "20px",
          borderRadius: "16px",
          marginBottom: "20px",
        }}
      >
        <h3>
          Customize Goal Weight
        </h3>

        <input
          type="number"
          value={goalWeight}
          onChange={(e) =>
            setGoalWeight(
              Number(e.target.value)
            )
          }
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            marginTop: "10px",
          }}
        />

        <p
          style={{
            color: validationColor,
            marginTop: "10px",
            fontWeight: "bold",
          }}
        >
          {validationMessage}
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#0F141A",
          padding: "20px",
          borderRadius: "16px",
          marginBottom: "20px",
        }}
      >
        <p>
          BMI: {bmi}
        </p>

        <p>
          Current Weight:
          {" "}
          {currentWeight} lbs
        </p>

        <p>
          Goal Weight:
          {" "}
          {goalWeight} lbs
        </p>

        <p>
          Remaining Journey:
          {" "}
          {weightToLose} lbs
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#0F141A",
          padding: "20px",
          borderRadius: "16px",
          marginBottom: "20px",
        }}
      >
        <p>
          Age:
          {" "}
          {userData.age}
        </p>

        <p>
          Gender:
          {" "}
          {userData.gender}
        </p>

        <p>
          Height:
          {" "}
          {userData.heightFeet}'
          {userData.heightInches}"
        </p>
      </div>

      <button
  onClick={onStartJourney}
  style={{
    backgroundColor: "#22C55E",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "10px",
    width: "100%",
    fontWeight: "bold",
  }}
>
  Start My Journey
</button>
</div>
  );
}

