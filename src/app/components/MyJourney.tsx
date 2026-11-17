"use client";

import { useEffect, useState } from "react";
import { workoutBlocks, trainingDays } from "./workoutBlocks";

type Run = { id: string; goal: string; week: number; day: number; completed: boolean; startedAt: string; endedAt?: string };
type Journey = { active: Run | null; history: Run[] };
const storageKey = "norden-premium-journey-v1";
const empty: Journey = { active: null, history: [] };
function validRun(value: unknown): value is Run {
  if (!value || typeof value !== "object") return false;
  const r = value as Run;
  return typeof r.id === "string" && typeof r.startedAt === "string" &&
    workoutBlocks.some(b => b.name === r.goal) && Number.isInteger(r.week) &&
    r.week >= 1 && r.week <= 5 && Number.isInteger(r.day) && r.day >= 1 && r.day <= 7 && typeof r.completed === "boolean";
}

export default function MyJourney() {
  const [journey, setJourney] = useState<Journey>(empty);
  const [selection, setSelection] = useState("");
  const [choosing, setChoosing] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw);
        if ((saved.active === null || validRun(saved.active)) && Array.isArray(saved.history) && saved.history.every(validRun)) {
          setJourney(saved);
          setSelection(saved.active?.goal ?? "");
        } else setError("Saved journey could not be read. Select a goal to start again.");
      }
    } catch { setError("Saved journey could not be read. Browser storage may be unavailable."); }
    setReady(true);
  }, []);
  function save(next: Journey) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setJourney(next);
      setError("");
      return true;
    } catch {
      setError("Progress could not be saved. Enable browser storage and try again.");
      return false;
    }
  }
  function start() {
    if (!workoutBlocks.some(b => b.name === selection)) return;
    if (journey.active?.goal === selection) { setChoosing(false); return; }
    const now = new Date().toISOString();
    const next = { active: { id: crypto.randomUUID(), goal: selection, week: 1, day: 1, completed: false, startedAt: now },
      history: journey.active ? [...journey.history, { ...journey.active, endedAt: now }] : journey.history };
    if (save(next)) setChoosing(false);
  }
  const active = journey.active;
  const block = workoutBlocks.find(b => b.name === active?.goal);
  const dayIndex = active ? ((active.week - 1) * 7 + active.day - 1) % 4 : 0;
  function completeDay() {
    if (!active || active.completed) return;
    const last = active.week === 5 && active.day === 7;
    save({ ...journey, active: { ...active, completed: last,
      week: last ? 5 : active.day === 7 ? active.week + 1 : active.week,
      day: last ? 7 : active.day === 7 ? 1 : active.day + 1 } });
  }
  return (
    <section aria-labelledby="my-journey-heading" className="mb-5 rounded-2xl bg-[#0F141A] p-5">
      <h2 id="my-journey-heading" className="text-xl font-semibold">My Journey</h2>
      <h3 className="mt-3 font-semibold">Premium workout blocks</h3>
      <p>Choose one goal. Each block lasts five weeks, with seven days per week. Repeat Push, Legs, Pull, then Rest.</p>
      <p className="text-sm text-slate-300">Progress is saved in this browser.</p>
      {!ready ? <p>Loading saved journey…</p> : <>
        {(!active || choosing) && <fieldset className="my-4 space-y-3">
          <legend>Select your Premium goal</legend>
          {workoutBlocks.map(b => <label key={b.name} className="block rounded-xl border border-slate-700 p-3">
            <input type="radio" name="premium-goal" value={b.name} checked={selection === b.name} onChange={() => setSelection(b.name)} /> {b.name}
            <span className="block text-sm text-slate-300">{b.focus}</span>
          </label>)}
          {active && <p>Changing goals starts at Week 1, Day 1. Your previous block stays in History.</p>}
          <button type="button" disabled={!selection} onClick={start} className="rounded bg-green-600 p-3 disabled:opacity-50">{active ? "Confirm goal" : "Start five-week block"}</button>
          {active && <button type="button" onClick={() => { setSelection(active.goal); setChoosing(false); }} className="ml-3 p-3">Cancel</button>}
        </fieldset>}
        {active && block && <div className="my-4 rounded-xl border border-slate-700 p-4">
          <h3 className="font-semibold">{active.goal}</h3>
          <p>Week {active.week} of 5 · Day {active.day} of 7</p>
          {active.completed ? <p role="status">Five-week block completed!</p> : <>
            <h4 className="mt-3 font-semibold">{dayIndex === 3 ? "Rest" : trainingDays[dayIndex]}</h4>
            {dayIndex === 3 ? <p>Recovery day. Rest before your next session.</p> : <ul className="list-disc pl-5">{block.sessions[dayIndex].map(e => <li key={e}>{e}</li>)}</ul>}
            <p className="my-3 text-sm">Strength sets × reps: Easy 3 × 10, Intermediate 4 × 10, Hard 5 × 10. Rest 1:15 between sets and 2:00 between exercises.</p>
            <button type="button" className="rounded bg-green-600 p-3" onClick={completeDay}>{active.week === 5 && active.day === 7 ? "Complete block" : "Complete day and save"}</button>
          </>}
          {!choosing && <button type="button" className="ml-3 p-3" onClick={() => setChoosing(true)}>Change goal</button>}
        </div>}
        <h3 className="font-semibold">History</h3>
        {journey.history.length === 0 ? <p>No previous blocks yet.</p> : <ul>{journey.history.map(r => <li key={r.id} className="my-2">{r.goal} — Week {r.week}, Day {r.day} · {r.completed ? "Completed" : "Archived"} · Started {new Date(r.startedAt).toLocaleDateString()}</li>)}</ul>}
      </>}
      {error && <p role="alert">{error}</p>}
    </section>
  );
}
