"use client";

import { useState } from "react";

export default function CurrentWeightScreen({
  onContinue,
  onBack,
  userData,
  setUserData,
}: {
  onContinue: () => void;
  onBack: () => void;
  userData: any;
  setUserData: any;
}) {
  const [error, setError] = useState("");

  const handleContinue = () => {
    const weight = Number(
      userData.currentWeight
    );

    if (!userData.currentWeight) {
      setError(
        "Please enter your current weight."
      );
      return;
    }

    if (
      isNaN(weight) ||
      weight < 50 ||
      weight > 800
    ) {
      setError(
        "Please enter a valid weight between 50 and 800 lbs."
      );
      return;
    }

    setError("");

    onContinue();
  };

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
        ← Back
      </button>

      <h1
        style={{
          textAlign: "center",
        }}
      >
        Current Weight
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#94A3B8",
          marginBottom: "40px",
        }}
      >
        What is your current weight?
      </p>

      <div
        style={{
          backgroundColor: "#0F141A",
          padding: "20px",
          borderRadius: "16px",
        }}
      >
        <input
          type="number"
          placeholder="Enter weight"
          value={userData.currentWeight}
          onChange={(e) => {
            setError("");

            setUserData({
              ...userData,
              currentWeight:
                e.target.value,
            });
          }}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        />

        {error && (
          <p
            style={{
              color: "#EF4444",
              fontWeight: "bold",
              marginBottom: "15px",
            }}
          >
            ⚠️ {error}
          </p>
        )}

        <button
          onClick={handleContinue}
          style={{
            backgroundColor: "#22C55E",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
