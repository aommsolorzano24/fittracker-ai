"use client";

import { useEffect, useState } from "react";
type Run = { id: string; goal: string; week: number; day: number; completed: boolean; startedAt: string; endedAt?: string };
type Journey = { active: Run | null; history: Run[]; revision: number };
type Block = { name: string; focus: string; sessions: string[][] };
const empty: Journey = { active: null, history: [], revision: 0 };

export default function MyJourney() {
  const [journey, setJourney] = useState<Journey>(empty);
  const [selection, setSelection] = useState("");
  const [choosing, setChoosing] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [workoutBlocks, setBlocks] = useState<Block[]>([]);
  const [trainingDays, setDays] = useState<string[]>([]);
  const [signedIn, setSignedIn] = useState(false);
  const [premium, setPremium] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  async function load() {
    setReady(false);
    setJourney(empty); setBlocks([]); setDays([]);
    try {
      const response = await fetch("/api/account", { cache: "no-store" });
      const user = await response.json();
      if (!response.ok) {
        setSignedIn(false); setPremium(false);
        if (response.status !== 401) throw new Error(user.error);
        return;
      }
      setSignedIn(true); setPremium(user.premium === true);
      if (user.premium) {
        const r = await fetch("/api/journey", { cache: "no-store" });
        const data = await r.json();
        if (!r.ok) throw new Error(data.error);
        setJourney(data.journey); setSelection(data.journey.active?.goal ?? "");
        setBlocks(data.blocks); setDays(data.trainingDays);
      }
      setError("");
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to load account."); }
    finally { setReady(true); }
  }
  useEffect(() => { void load(); }, []);
  async function signIn(e: React.FormEvent) {
    e.preventDefault(); setBusy(true);
    try {
      const r = await fetch("/api/account", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      setPassword(""); await load();
    } catch (e) { setError(e instanceof Error ? e.message : "Sign in failed."); }
    finally { setBusy(false); }
  }
  async function signOut() {
    setBusy(true);
    try {
      const r = await fetch("/api/account", { method: "DELETE" });
      if (!r.ok) throw new Error("Unable to sign out. Try again.");
      setJourney(empty); setBlocks([]); setDays([]); setSelection(""); setChoosing(false);
      setSignedIn(false); setPremium(false); setError("");
    } catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  }
  async function mutate(action: string, goal?: string) {
    if (busy) return false;
    setBusy(true);
    try {
      const r = await fetch("/api/journey", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action, goal, revision: journey.revision }) });
      const data = await r.json();
      if (!r.ok) {
        if (r.status === 401 || r.status === 403) { setJourney(empty); setBlocks([]); setPremium(false); }
        throw new Error(data.error);
      }
      setJourney(data.journey); setError(""); return true;
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to save progress."); return false; }
    finally { setBusy(false); }
  }
  async function start() {
    if (await mutate("select", selection)) setChoosing(false);
  }
  const active = journey.active;
  const block = workoutBlocks.find(b => b.name === active?.goal);
  const dayIndex = active ? ((active.week - 1) * 7 + active.day - 1) % 4 : 0;
  async function completeDay() { await mutate("advance"); }
  return (
    <section aria-labelledby="my-journey-heading" className="mb-5 rounded-2xl bg-[#0F141A] p-5">
      <h2 id="my-journey-heading" className="text-xl font-semibold">My Journey</h2>
      <h3 className="mt-3 font-semibold">Premium workout blocks</h3>
      <p>Choose one goal. Each block lasts five weeks, with seven days per week. Repeat Push, Legs, Pull, then Rest.</p>
      <p className="text-sm text-slate-300">Progress is saved to your account and available on your other browsers.</p>
      {!ready ? <p>Loading saved journey…</p> : !signedIn ? <form onSubmit={signIn} className="my-4 space-y-3">
        <p>Sign in to your account. Premium is required for exercise blocks.</p>
        <label className="block">Email<input type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} className="block rounded border p-2" /></label>
        <label className="block">Password<input type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} className="block rounded border p-2" /></label>
        <button disabled={busy} className="rounded bg-green-600 p-3">Sign in</button>
      </form> : <>
        <button disabled={busy} onClick={signOut} className="my-3 p-2">Sign out</button>
        {!premium ? <p>Your Free dashboard remains available. Exercise routines require an active Premium account.</p> : <>

        {(!active || choosing) && <fieldset className="my-4 space-y-3">
          <legend>Select your Premium goal</legend>
          {workoutBlocks.map(b => <label key={b.name} className="block rounded-xl border border-slate-700 p-3">
            <input type="radio" name="premium-goal" value={b.name} checked={selection === b.name} onChange={() => setSelection(b.name)} /> {b.name}
            <span className="block text-sm text-slate-300">{b.focus}</span>
          </label>)}
          {active && <p>Changing goals starts at Week 1, Day 1. Your previous block stays in History.</p>}
          <button type="button" disabled={!selection || busy} onClick={start} className="rounded bg-green-600 p-3 disabled:opacity-50">{active ? "Confirm goal" : "Start five-week block"}</button>
          {active && <button type="button" onClick={() => { setSelection(active.goal); setChoosing(false); }} className="ml-3 p-3">Cancel</button>}
        </fieldset>}
        {active && block && <div className="my-4 rounded-xl border border-slate-700 p-4">
          <h3 className="font-semibold">{active.goal}</h3>
          <p>Week {active.week} of 5 · Day {active.day} of 7</p>
          {active.completed ? <p role="status">Five-week block completed!</p> : <>
            <h4 className="mt-3 font-semibold">{dayIndex === 3 ? "Rest" : trainingDays[dayIndex]}</h4>
            {dayIndex === 3 ? <p>Recovery day. Rest before your next session.</p> : <ul className="list-disc pl-5">{block.sessions[dayIndex].map(e => <li key={e}>{e}</li>)}</ul>}
            <p className="my-3 text-sm">Strength sets × reps: Easy 3 × 10, Intermediate 4 × 10, Hard 5 × 10. Rest 1:15 between sets and 2:00 between exercises.</p>
            <button type="button" disabled={busy} className="rounded bg-green-600 p-3" onClick={completeDay}>{active.week === 5 && active.day === 7 ? "Complete block" : "Complete day and save"}</button>
          </>}
          {!choosing && <button type="button" className="ml-3 p-3" onClick={() => setChoosing(true)}>Change goal</button>}
        </div>}
        <h3 className="font-semibold">History</h3>
        {journey.history.length === 0 ? <p>No previous blocks yet.</p> : <ul>{journey.history.map(r => <li key={r.id} className="my-2">{r.goal} — Week {r.week}, Day {r.day} · {r.completed ? "Completed" : "Archived"} · Started {new Date(r.startedAt).toLocaleDateString()}</li>)}</ul>}
      </>}</>}
      {error && <p role="alert">{error}</p>}
    </section>
  );
}
