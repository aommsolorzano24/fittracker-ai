export default function ChoosePathScreen({
  onSelect,
}: {
  onSelect: (path: string) => void;
}) {

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
        Choose Your Path
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#94A3B8",
          marginBottom: "40px",
        }}
      >
        Choose the version of yourself
        you want to become.
      </p>

      <div
        style={{
          backgroundColor: "#0F141A",
          padding: "20px",
          borderRadius: "16px",
          marginBottom: "20px",
        }}
      >
        <h2>🟢 Healthy Balance</h2>

        <p>
          Long-term health and
          sustainable habits.
        </p>

<button
  onClick={() => onSelect("healthy")}
  style={{
    backgroundColor: "#22C55E",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    marginTop: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  Select
</button>



      </div>

      <div
        style={{
          backgroundColor: "#0F141A",
          padding: "20px",
          borderRadius: "16px",
        }}
      >
        <h2>🔥 Fitness Performance</h2>

        <p>
          Athletic goals and body
          transformation.
        </p>

<button
  onClick={() => onSelect("fitness")}
  style={{
    backgroundColor: "#22C55E",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    marginTop: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  Select
</button>


      </div>
      </div>
  );
}
