import NordenProgressBar from "./NordenProgressBar";

export default function DashboardScreen({
  userData,
  selectedPath,
}: {
  userData: any;
  selectedPath: string;
}) {
  const currentWeight =
    Number(userData.currentWeight) || 0;

  const totalHeight =
    Number(userData.heightFeet) * 12 +
    Number(userData.heightInches);

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

  const nordenGoal =
    totalHeight > 0
      ? Math.round(
          (targetBMI *
            totalHeight *
            totalHeight) /
            703
        )
      : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#05070A",
        color: "white",
        padding: "30px",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          marginBottom: "24px",
        }}
      >
        <h1>
          👋 Welcome Back
        </h1>

        <p
          style={{
            color: "#94A3B8",
          }}
        >
          {selectedPath === "fitness"
            ? "🔥 Fitness Performance"
            : "🟢 Healthy Balance"}
        </p>
      </div>

      {/* QUICK STATS */}

      <div
        style={{
          backgroundColor: "#0F141A",
          padding: "20px",
          borderRadius: "16px",
          marginBottom: "20px",
        }}
      >
        <h3>Today's Progress</h3>

        <p>
          Current Weight:
          {" "}
          {currentWeight} lbs
        </p>

        <p>
          Norden Goal:
          {" "}
          {nordenGoal} lbs
        </p>

        <p>
          Remaining:
          {" "}
          {Math.max(
            0,
            currentWeight - nordenGoal
          )} lbs
        </p>
      </div>

      {/* NORDEN BAR */}

      <NordenProgressBar
        currentWeight={currentWeight}
        rangeMin={
          selectedPath === "fitness"
            ? fitnessMin
            : healthyMin
        }
        rangeMax={
          selectedPath === "fitness"
            ? fitnessMax
            : healthyMax
        }
        nordenGoal={nordenGoal}
        selectedPath={selectedPath}
      />

      {/* TODAY'S FOCUS */}

      <div
        style={{
          backgroundColor: "#0F141A",
          padding: "20px",
          borderRadius: "16px",
          marginBottom: "20px",
        }}
      >
        <h3>
          🎯 Today's Focus
        </h3>

        <p>Goal 1</p>
        <p>Goal 2</p>
        <p>Goal 3</p>
      </div>

      {/* COACH */}

      <div
        style={{
          backgroundColor: "#0F141A",
          padding: "20px",
          borderRadius: "16px",
          marginBottom: "20px",
        }}
      >
        <h3>
          🧭 Coach Norden
        </h3>

        <p>
          Your daily coaching
          message will appear here.
        </p>
      </div>

      {/* WEIGHT LOG */}

      <div
        style={{
          backgroundColor: "#0F141A",
          padding: "20px",
          borderRadius: "16px",
        }}
      >
        <h3>
          ⚖️ Weight Log
        </h3>

        <button
          style={{
            backgroundColor:
              "#22C55E",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "10px",
            width: "100%",
          }}
        >
          + Add Weight
        </button>
      </div>
    </div>
  );
}
