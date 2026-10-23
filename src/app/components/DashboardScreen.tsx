export default function DashboardScreen() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#05070A",
        color: "white",
        padding: "24px",
      }}
    >
      <h1>👋 Welcome to Norden</h1>

      <div
        style={{
          backgroundColor: "#0F141A",
          padding: "20px",
          borderRadius: "16px",
          marginTop: "20px",
        }}
      >
        <h2>🏆 Goal Weight</h2>
        <p>150 lbs</p>
      </div>

      <div
        style={{
          backgroundColor: "#0F141A",
          padding: "20px",
          borderRadius: "16px",
          marginTop: "20px",
        }}
      >
        <h2>⚖️ Current Weight</h2>
        <p>190 lbs</p>
        <p>40 lbs remaining</p>
      </div>

      <div
        style={{
          backgroundColor: "#0F141A",
          padding: "20px",
          borderRadius: "16px",
          marginTop: "20px",
        }}
      >
        <h2>🔥 Streak</h2>
        <p>0 Days</p>
      </div>

      <div
        style={{
          backgroundColor: "#0F141A",
          padding: "20px",
          borderRadius: "16px",
          marginTop: "20px",
        }}
      >
        <h2>🧭 Coach Norden</h2>

        <p>
          Today's mission:
          Drink water, take a walk,
          and stay consistent.
        </p>
      </div>
    </div>
  );
}
