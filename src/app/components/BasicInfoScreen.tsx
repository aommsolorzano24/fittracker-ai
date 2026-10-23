export default function BasicInfoScreen({
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
        Tell us about yourself
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#94A3B8",
          marginBottom: "40px",
        }}
      >
        This helps Norden create your
        personalized journey.
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
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        >
          <option>Male</option>
          <option>Female</option>
        </select>

        <p>Age</p>

        <input
          type="number"
          placeholder="Enter your age"
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
            style={{
              width: "120px",
              padding: "12px",
              borderRadius: "10px",
            }}
          />

          <input
            type="number"
            placeholder="Inches"
            style={{
              width: "120px",
              padding: "12px",
              borderRadius: "10px",
            }}
          />
        </div>

        <button
        onClick={onContinue}
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
