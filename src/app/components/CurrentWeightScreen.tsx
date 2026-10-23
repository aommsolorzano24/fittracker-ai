export default function CurrentWeightScreen({
  onContinue,
}: {
  onContinue: () => void;
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
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        />

        <button
        onClick={onContinue}
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
