import { useState } from "react";

type WorkoutType = "bodybuilding" | "athlete" | "weightloss";

export function WorkoutLogCard() {
  const [selectedType, setSelectedType] = useState<WorkoutType | null>(null);
  const [loggedToday] = useState(false); // TODO: Connect to actual state

  const workoutTypes = [
    { key: "bodybuilding" as WorkoutType, label: "Bodybuilding", desc: "Build muscle mass" },
    { key: "athlete" as WorkoutType, label: "Athlete", desc: "Performance training" },
    { key: "weightloss" as WorkoutType, label: "Weight Loss", desc: "Burn calories" }
  ];

  const handleTypeSelect = (type: WorkoutType) => {
    setSelectedType(type);
    // TODO: Add analytics tracking and actual save logic
    setTimeout(() => {
      setSelectedType(null);
    }, 1000);
  };

  return (
    <div className="px-4 mt-4">
      <div className="rounded-2xl bg-zinc-900/60 ring-1 ring-white/5 p-4">
        <div className="flex items-center justify-center mb-4">
          <h3 className="text-base font-bold text-white bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Workout</h3>
          {loggedToday && (
            <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full ml-2">
              Logged today
            </span>
          )}
        </div>

        {/* Workout type buttons */}
        <div className="grid grid-cols-1 gap-3">
          {workoutTypes.map(type => (
            <button
              key={type.key}
              onClick={() => handleTypeSelect(type.key)}
              disabled={selectedType === type.key}
              className={`rounded-xl px-4 py-4 text-left transition-colors ${
                selectedType === type.key
                  ? "bg-emerald-600 text-black"
                  : "bg-zinc-800 hover:bg-zinc-700 text-white"
              }`}
            >
              <div className="text-base font-semibold">{type.label}</div>
              <div className="text-sm opacity-70 mt-1">{type.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}