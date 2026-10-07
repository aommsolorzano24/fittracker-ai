export default function Home() {
  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <h1>FitTracker AI</h1>

      <h2>Your Personal Weight & Calorie Coach</h2>

      <div style={{ marginTop: "40px" }}>
        <h3>Current Weight</h3>
        <p>210 lbs</p>

        <h3>Goal Weight</h3>
        <p>180 lbs</p>

        <h3>Calories Today</h3>
        <p>1,850 / 2,100</p>
      </div>

      <div style={{ marginTop: "30px" }}>
        <button
          style={{
            padding: "10px 20px",
            marginRight: "10px",
          }}
        >
          Add Weight
        </button>

        <button
          style={{
            padding: "10px 20px",
          }}
        >
          Add Calories
        </button>
      </div>
    </main>
  );
}
