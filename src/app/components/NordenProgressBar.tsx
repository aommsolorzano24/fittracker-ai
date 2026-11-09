export default function NordenProgressBar({
  currentWeight,
  rangeMin,
  rangeMax,
  nordenGoal,
  selectedPath,
}: {
  currentWeight: number;
  rangeMin: number;
  rangeMax: number;
  nordenGoal: number;
  selectedPath: string;
}) {
  const rangeType =
    selectedPath === "fitness"
      ? "Performance Range"
      : "Healthy Range";

  const isGoalReached =
    Math.abs(currentWeight - nordenGoal) <= 1;

  const isInsideRange =
    currentWeight >= rangeMin &&
    currentWeight <= rangeMax;

  const poundsAway = Math.max(
    0,
    Math.round(currentWeight - rangeMax)
  );

  const isApproaching =
    !isInsideRange &&
    poundsAway <= 10;

  let statusColor = "#EF4444";
  let statusTitle = "";
  let statusMessage = "";
  let barColor = "#EF4444";

  if (isGoalReached) {
    barColor = "#FBBF24";
    statusColor = "#FBBF24";

    statusTitle =
      "🏆 Norden Goal Reached";

    statusMessage =
      "You have reached Norden's recommended target weight.";
  } else if (isInsideRange) {
    barColor = "#22C55E";
    statusColor = "#22C55E";

    statusTitle =
      selectedPath === "fitness"
        ? "✅ You're in the Performance Range"
        : "✅ You're in the Healthy Range";

    statusMessage =
      "Great job. You're currently within the recommended range.";
  } else if (isApproaching) {
    barColor = "#F97316";
    statusColor = "#F97316";

    statusTitle =
      "🔥 Almost There";

    statusMessage =
      `Only ${poundsAway} lbs away from entering the range.`;
  } else {
    barColor = "#EF4444";
    statusColor = "#EF4444";

    statusTitle =
      selectedPath === "fitness"
        ? "⚠️ You're Above the Performance Range"
        : "⚠️ You're Above the Healthy Range";

    statusMessage =
      "Keep going. You're moving toward your recommended range.";
  }

const scaleMin = Math.max(
  50,
  nordenGoal - 60
);

const scaleMax = Math.max(
  nordenGoal + 60,
  currentWeight + 30
);



  const currentPosition =
    ((currentWeight - scaleMin) /
      (scaleMax - scaleMin)) *
    100;

  return (
    <div
      style={{
        backgroundColor: "#0F141A",
        padding: "24px",
        borderRadius: "16px",
        marginBottom: "20px",
      }}
    >
      <h3
        style={{
          marginBottom: "10px",
        }}
      >
        🎯 {rangeType}
      </h3>

      <p
        style={{
          color: "#94A3B8",
          marginBottom: "40px",
        }}
      >
        {Math.round(scaleMin)} - {Math.round(scaleMax)} lbs
      </p>

      {/* Goal */}

      <div
        style={{
          textAlign: "center",
          color: "#FBBF24",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            fontSize: "24px",
          }}
        >
          🏆
        </div>

        <div
          style={{
            fontWeight: "bold",
          }}
        >
          Goal {nordenGoal}
        </div>
      </div>

      {/* Progress Section */}

      <div
        style={{
          position: "relative",
          paddingTop: "40px",
          marginBottom: "30px",
        }}
      >
        {/* Current Weight */}

        <div
          style={{
            position: "absolute",
            left: `${currentPosition}%`,
            top: "0px",
            transform:
              "translateX(-50%)",
            textAlign: "center",
            transition:
              "left 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
            zIndex: 10,
          }}
        >
          <div
            style={{
              color: statusColor,
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            {currentWeight} lbs
          </div>

          <div
            style={{
              color: statusColor,
              fontSize: "24px",
              lineHeight: 1,
            }}
          >
            ▼
          </div>
        </div>

        {/* Progress Bar */}

        <div
          style={{
            height: "12px",
            borderRadius: "999px",
            backgroundColor: barColor,
            transition:
              "background-color 0.6s ease",
          }}
        />

        {/* Range Labels */}

        <div
  style={{
    display: "flex",
    justifyContent:
      "space-between",
    marginTop: "12px",
    fontSize: "14px",
  }}
>
  <span
    style={{
      color: "#94A3B8",
      fontWeight: "bold",
    }}
  >
    {Math.round(scaleMin)}
  </span>

  <span
    style={{
      color: "#94A3B8",
      fontWeight: "bold",
    }}
  >
    {Math.round(scaleMax)}
  </span>
</div>


      </div>

      {/* Status */}

      <div
        style={{
          padding: "16px",
          borderRadius: "12px",
          border: `1px solid ${statusColor}`,
          backgroundColor:
            "rgba(255,255,255,0.02)",
        }}
      >
        <h3
          style={{
            color: statusColor,
            marginBottom: "8px",
          }}
        >
          {statusTitle}
        </h3>

        <p
          style={{
            margin: 0,
            color: "#E5E7EB",
          }}
        >
          {statusMessage}
        </p>
      </div>
    </div>
  );
}
