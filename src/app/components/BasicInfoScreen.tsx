"use client";

import { useState } from "react";

export default function BasicInfoScreen({
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
    const age = Number(userData.age);
    const feet = Number(userData.heightFeet);
    const inches = Number(userData.heightInches);

    if (!userData.gender) {
      setError("Please select your gender.");
      return;
    }

    if (!age || age < 13 || age > 120) {
      setError(
        "Please enter a valid age between 13 and 120."
      );
      return;
    }

    if (!feet || feet < 3 || feet > 8) {
      setError(
        "Please enter a valid height."
      );
      return;
    }

    if (inches < 0 || inches > 11) {
      setError(
        "Inches must be between 0 and 11."
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
        Tell us about yourself
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#94A3B8",
          marginBottom: "40px",
        }}
      >
        This helps Norden create your personalized journey.
      </p>

      <div
        style={{
          backgroundColor: "#0F141A",
          padding: "20px",
          borderRadius: "16px",
        }}
      >
        <p>Gender</p>

        <select
          value={userData.gender}
          onChange={(e) =>
            setUserData({
              ...userData,
              gender: e.target.value,
            })
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <p>Age</p>

        <input
          type="number"
          placeholder="Enter your age"
          value={userData.age}
          onChange={(e) =>
            setUserData({
              ...userData,
              age: e.target.value,
            })
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        />

        <p>Height</p>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <input
            type="number"
            placeholder="Feet"
            value={userData.heightFeet}
            onChange={(e) =>
              setUserData({
                ...userData,
                heightFeet: e.target.value,
              })
            }
            style={{
              width: "120px",
              padding: "12px",
              borderRadius: "10px",
            }}
          />

          <input
            type="number"
            placeholder="Inches"
            value={userData.heightInches}
            onChange={(e) =>
              setUserData({
                ...userData,
                heightInches: e.target.value,
              })
            }
            style={{
              width: "120px",
              padding: "12px",
              borderRadius: "10px",
            }}
          />
        </div>

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
            marginTop: "20px",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
