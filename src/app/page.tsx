export default functio"use client";

import { useState } from "react";

export default function Home() {
  const [currentWeight, setCurrentWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");

  const [result, setResult] = useState<{
    bmi: string;
    calories: string;
  } | null>(null);

  const calculate = () => {
    const weight = Number(currentWeight);
    const userHeight = Number(height);

    if (!weight || !userHeight) {
      alert("Please fill out all fields.");
      return;
    }

    const bmi = (weight / (userHeight * userHeight)) * 703;
    const calories = weight * 12;

    setResult({
      bmi: bmi.toFixed(1),
      calories: calories.toFixed(0),
    });
  };

  return (
    <main
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1>FitTracker AI</h1>
      <h2>Your Personal Weight & Calorie Coach</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "30px",
        }}
      >
        <input
          type="number"
          placeholder="Current Weight (lbs)"
          value={currentWeight}
          onChange={(e) => setCurrentWeight(e.target.value)}
        />

        <input
          type="number"
          placeholder="Goal Weight (lbs)"
          value={goalWeight}
          onChange={(e) => setGoalWeight(e.target.value)}
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <input
          type="number"
          placeholder="Height (inches)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />

        <button
          onClick={calculate}
          style={{
            padding: "12px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Calculate
        </button>
      </div>

      {result && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            border: "1px solid gray",
            borderRadius: "10px",
          }}
        >
          <h3>Results</h3>

          <p>
            <strong>BMI:</strong> {result.bmi}
          </p>

          <p>
            <strong>Recommended Calories:</strong>{" "}
            {result.calories} kcal/day
          </p>

          <p>
            <strong>Goal Weight:</strong> {goalWeight} lbs
          </p>
        </div>
      )}
    </main>
  );
}
