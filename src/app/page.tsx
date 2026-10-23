"use client";

import {useState} from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import ChoosePathScreen from "./components/ChoosePathScreen";
import BasicInfoScreen from "./components/BasicInfoScreen";
import CurrentWeightScreen from "./components/CurrentWeightScreen";
import AnalysisScreen from "./components/AnalysisScreen";




export default function Home() {

const [screen, setScreen] = useState("path");
const [selectedPath, setSelectedPath] = useState("");

  
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
      onContinue={() => {
        setScreen("weight");
      }}
    />
  );
}

if (screen === "weight") {
  return (
    <CurrentWeightScreen
      onContinue={() => {
        setScreen("analysis");
      }}
    />
  );
}


if (screen === "analysis") {
  return <AnalysisScreen />;
}

  const [gender, setGender] = useState("Male");
  const [currentWeight, setCurrentWeight] = useState("");
  const [age, setAge] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const weight = Number(currentWeight);
    const totalHeight = Number(feet) * 12 + Number(inches);
    const userAge = Number(age);

    if (
      weight <= 0 ||
      totalHeight <= 0 ||
      userAge <= 0
    ) {
      alert("Please enter valid values.");
      return;
    }

    const bmi =
      (weight / (totalHeight * totalHeight)) * 703;

    const healthyMin =
      (20 * totalHeight * totalHeight) / 703;

    const healthyMax =
      (27 * totalHeight * totalHeight) / 703;

    const fitnessMin =
      (22 * totalHeight * totalHeight) / 703;

    const fitnessMax =
      (28 * totalHeight * totalHeight) / 703;

    const idealTarget =
      (25 * totalHeight * totalHeight) / 703;

    const calories =
      gender === "Male"
        ? weight * 13
        : weight * 11;

    let category = "";

    if (weight < healthyMin) {
      category = "Underweight";
    } else if (weight <= healthyMax) {
      category = "Healthy";
    } else if (bmi < 30) {
      category = "Overweight";
    } else {
      category = "Obese";
    }

    setResult({
      bmi: bmi.toFixed(1),
      bmiPosition: Math.min(
  100,
  Math.max(0, (bmi / 40) * 100)
),


      healthyMin: healthyMin.toFixed(0),
      healthyMax: healthyMax.toFixed(0),

      fitnessMin: fitnessMin.toFixed(0),
      fitnessMax: fitnessMax.toFixed(0),

      idealTarget: idealTarget.toFixed(0),

      calories: calories.toFixed(0),

      category,

      differenceToTarget: Math.abs(
        weight - idealTarget
      ).toFixed(0),
    });
  };

  return (
    <main
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Norden</h1>

      <h2>personal weight & Fitness Intelligence</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "30px",
        }}
      >
        <label>
          Gender
          <select
            value={gender}
            onChange={(e) =>
              setGender(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "5px",
            }}
          >
            <option>Male</option>
            <option>Female</option>
          </select>
        </label>

        <label>
          Current Weight (lbs)
          <input
            type="number"
            min="1"
            value={currentWeight}
            onChange={(e) =>
              setCurrentWeight(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "5px",
            }}
          />
        </label>

        <label>
          Age
          <input
            type="number"
            min="1"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "5px",
            }}
          />
        </label>

        <label>
          Height (Feet)
          <input
            type="number"
            min="1"
            value={feet}
            onChange={(e) => setFeet(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "5px",
            }}
          />
        </label>

        <label>
          Height (Inches)
          <input
            type="number"
            min="0"
            max="11"
            value={inches}
            onChange={(e) =>
              setInches(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "5px",
            }}
          />
        </label>

        <button
          onClick={calculate}
          style={{
            padding: "14px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Calculate
        </button>
      </div>

      {result && (
        <div
          style={{
            marginTop: "30px",
            border: "1px solid #444",
            borderRadius: "12px",
            padding: "25px",
          }}
        >
          <h2>Analysis Results</h2>

          <p>
            <strong>BMI:</strong> {result.bmi}
          </p>
<div
  style={{
    marginTop: "10px",
    marginBottom: "20px",
  }}
>
  <div
    style={{
      display: "flex",
      height: "20px",
      borderRadius: "6px",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        backgroundColor: "#3b82f6",
        width: "20%",
      }}
    />
    <div
      style={{
        backgroundColor: "#22c55e",
        width: "30%",
      }}
    />
    <div
      style={{
        backgroundColor: "#f59e0b",
        width: "25%",
      }}
    />
    <div
      style={{
        backgroundColor: "#ef4444",
        width: "25%",
      }}
    />
  </div>
<div
  style={{
    position: "relative",
    height: "25px",
  }}
>
  <div
    style={{
      position: "absolute",
      left: `${result.bmiPosition}%`,
      transform: "translateX(-50%)",
      fontSize: "24px",
    }}
  >
    ▼
  </div>
</div>

  <p style={{ marginTop: "8px" }}>
    BMI Categories:
    🔵 Underweight | 🟢 Healthy | 🟠 Overweight | 🔴 Obese
  </p>
</div>


          <p>
            <strong>Status:</strong>{" "}
            {result.category}
          </p>

          <p>
            <strong>
              Recommended Calories:
            </strong>{" "}
            {result.calories} kcal/day
          </p>

          <hr />

          <h3>Norden Healthy Range</h3>

          <p>
            {result.healthyMin} -{" "}
            {result.healthyMax} lbs
          </p>

          <h3>Fitness Range</h3>

          <p>
            {result.fitnessMin} -{" "}
            {result.fitnessMax} lbs
          </p>

          <h3>Ideal Target Weight</h3>

          <p>{result.idealTarget} lbs</p>

          <p>
            <strong>
              Weight To lose :
            </strong>{" "}
            {result.differenceToTarget} lbs
          </p>

          <hr />

          <h3>Weight Comparison</h3>

          <table
            style={{
              width: "100%",
              marginTop: "15px",
            }}
          >
            <tbody>
              <tr>
                <td>Underweight</td>
                <td>
                  Less than {result.healthyMin} lbs
                </td>
              </tr>

              <tr>
                <td>Healthy Range</td>
                <td>
                  {result.healthyMin} -{" "}
                  {result.healthyMax} lbs
                </td>
              </tr>

              <tr>
                <td>Fitness Range</td>
                <td>
                  {result.fitnessMin} -{" "}
                  {result.fitnessMax} lbs
                </td>
              </tr>

              <tr>
                <td>Ideal Target</td>
                <td>
                  {result.idealTarget} lbs
                </td>
              </tr>

              <tr>
                <td>Current Weight</td>
                <td>{currentWeight} lbs</td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h3>Norden Recommendation</h3>

          <p>
            Based on your height of {feet}'
            {inches}", your medical healthy
            range is between {result.healthyMin}{" "}
            and {result.healthyMax} lbs.
          </p>

          <p>
            Your recommended fitness range is{" "}
            {result.fitnessMin} to{" "}
            {result.fitnessMax} lbs.
          </p>

          <p>
            Your suggested goal weight is{" "}
            {result.idealTarget} lbs.
          </p>
        </div>
      )}
    </main>
  );
}
