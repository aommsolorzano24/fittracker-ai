import NordenProgressBar from "./NordenProgressBar";

const workoutBlocks = [
  {
    "name": "Get in Shape",
    "focus": "Build basic strength, mobility, and conditioning.",
    "sessions": [
      [
        "Incline push-up",
        "seated dumbbell shoulder press",
        "lateral raise"
      ],
      [
        "Goblet box squat",
        "step-up",
        "bodyweight glute bridge"
      ],
      [
        "Lat pulldown",
        "seated cable row",
        "face pull"
      ]
    ]
  },
  {
    "name": "Get Lean",
    "focus": "Maintain muscle while adding conditioning.",
    "sessions": [
      [
        "Incline dumbbell press",
        "cable fly",
        "lateral raise"
      ],
      [
        "Leg press",
        "dumbbell Romanian deadlift",
        "reverse lunge"
      ],
      [
        "Lat pulldown",
        "chest-supported row",
        "face pull"
      ]
    ]
  },
  {
    "name": "Overall Fitness",
    "focus": "Train strength, balance, and aerobic endurance.",
    "sessions": [
      [
        "Dumbbell floor press",
        "half-kneeling dumbbell press",
        "farmer carry"
      ],
      [
        "Goblet squat",
        "step-up",
        "single-leg balance"
      ],
      [
        "Seated cable row",
        "lat pulldown",
        "suitcase carry"
      ]
    ]
  },
  {
    "name": "Build Muscles",
    "focus": "Focus on hypertrophy through progressive resistance.",
    "sessions": [
      [
        "Bench press",
        "incline dumbbell press",
        "lateral raise",
        "cable triceps pushdown"
      ],
      [
        "Squat",
        "Romanian deadlift",
        "leg press",
        "lying leg curl"
      ],
      [
        "Lat pulldown",
        "seated cable row",
        "barbell curl",
        "dumbbell hammer curl"
      ]
    ]
  },
  {
    "name": "Lose Weight",
    "focus": "Start with accessible strength work and low-impact cardio.",
    "sessions": [
      [
        "Machine chest press",
        "seated shoulder press",
        "incline walk"
      ],
      [
        "Sit-to-stand",
        "leg press",
        "stationary bike"
      ],
      [
        "Lat pulldown",
        "seated cable row",
        "brisk walk"
      ]
    ]
  }
];

const trainingDays = ["Push", "Legs", "Pull"];

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

      <section
        aria-labelledby="my-journey-heading"
        className="mb-5 rounded-2xl bg-[#0F141A] p-5"
      >
        <h2 id="my-journey-heading" className="text-xl font-semibold">
          My Journey
        </h2>
        <h3 className="mt-3 font-semibold">Premium workout blocks</h3>
        <p className="mt-1 text-sm text-slate-300">
          Each block runs for five weeks. Repeat Push, Legs, Pull, then take a rest day.
        </p>
        <div className="mt-4 space-y-3">
          {workoutBlocks.map(({ name, focus, sessions }) => (
            <details key={name} className="rounded-xl border border-slate-700 p-4">
              <summary className="cursor-pointer font-semibold">{name}</summary>
              <p className="mt-2 text-sm text-slate-300">{focus}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {sessions.map((exercises, day) => (
                  <div key={trainingDays[day]}>
                    <h4 className="font-semibold">{trainingDays[day]}</h4>
                    <ul className="mt-1 list-disc pl-5 text-sm text-slate-300">
                      {exercises.map((exercise) => <li key={exercise}>{exercise}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-300">
          Strength sets × reps: Easy 3 × 10, Intermediate 4 × 10, Hard 5 × 10.
          Rest 1:15 between sets and 2:00 between exercises.
        </p>
      </section>

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
