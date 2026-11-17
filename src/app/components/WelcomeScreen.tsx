export default function WelcomeScreen({ onStart }: { onStart?: () => void }) {
  return (
    <div>
      <h1>NORDEN</h1>

      <h2>Find Your Healthy Balance</h2>

      <p>
        A healthier tomorrow starts today.
      </p>

      <button type="button" onClick={onStart}>
        Get Started
      </button>
    </div>
  );
}
