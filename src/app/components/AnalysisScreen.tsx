"use client";

import { useState } from "react";

export default function AnalysisScreen() {
  const currentWeight = 190;

  const [goalWeight, setGoalWeight] = useState(150);

  const weightToLose = currentWeight - goalWeight;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#05070A",
        color: "white",
        padding: "30px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        🧭 Your Norden Analysis
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#94A3B8",
          marginBottom: "30px",
        }}
      >
        Based on your profile, we've created a personalized recommendation.
      </p>

      <div
        style={{
          backgroundColor: "#0F141A",
          padding: "24px",
          borderRadius: "16px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        <p>🏆 Norden Recommendation</p>

        <h1
          style={{
            fontSize: "48px",
            margin: "10px 0",
          }}
        >
          150 lbs
        </h1>
      </div>

      <div
        style={{
          backgroundColor: "#0F141A",
          padding: "20px",
          borderRadius: "16px",
          marginBottom: "20px",
        }}
      >
        <h3>Customize Goal Weight</h3>

        <p
          style={{
            color: "#94A3B8",
          }}
        >
          Prefer a different target? Adjust it here.
        </p>

        <input
          type="number"
          value={goalWeight}
          onChange={(e) =>
            setGoalWeight(Number(e.target.value))
          }
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            marginTop: "10px",
          }}
        />
      </div>

      <div
        style={{
          backgroundColor: "#0F141A",
          padding: "20px",
          borderRadius: "16px",
          marginBottom: "20px",
        }}
      >
        <p>Current Weight: {currentWeight} lbs</p>
        <p>Goal Weight: {goalWeight} lbs</p>
        <p>Weight To Lose: {weightToLose} lbs</p>
      </div>

      <div
        style={{
          backgroundColor: "#0F141A",
          padding: "20px",
          borderRadius: "16px",
          marginBottom: "20px",
        }}
      >
        <p>Healthy Weight Range</p>
        <p>120 - 162 lbs</p>

        <br />

        <p>Fitness Weight Range</p>
        <p>132 - 168 lbs</p>
      </div>

      <div
        style={{
          backgroundColor: "#0F141A",
          padding: "20px",
          borderRadius: "16px",
          marginBottom: "25px",
        }}
      >
        <h3>🧭 Coach Norden</h3>

        <p>
          Our recommendation is 150 lbs. However, you can choose a goal that
          better matches your lifestyle and preferences while staying within a
          healthy range.
        </p>
      </div>

      <button
        style={{
          backgroundColor: "#22C55E",
          color: "white",
          border: "none",
          padding: "14px",
          borderRadius: "10px",
          width: "100%",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Start My Journey
      </button>
    </div>
  );
}
