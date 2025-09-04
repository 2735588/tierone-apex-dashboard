import { useState } from "react";

type Split = "PPL" | "CLASSIC";

const GROUPS = {
  PPL: ["Push", "Pull", "Legs"],
  CLASSIC: ["Chest", "Back", "Legs", "Arms", "Core"]
};

interface QuickLogInlineProps {
  group: string;
  onClose: () => void;
  onSaved: () => void;
}

function QuickLogInline({ group, onClose, onSaved }: QuickLogInlineProps) {
  const [duration, setDuration] = useState<string>("");
  const [rpe, setRpe] = useState<string>("");

  const handleSave = () => {
    // TODO: Add analytics tracking and actual save logic
    onSaved();
  };

  return (
    <div className="mt-3 rounded-xl bg-zinc-800 p-3 space-y-3">
      <div className="text-sm text-zinc-300">Quick Log — {group}</div>
      
      {/* Duration */}
      <div className="space-y-1">
        <div className="text-xs text-zinc-400">Duration</div>
        <div className="flex gap-2">
          {["30m", "45m", "60m"].map(d => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                duration === d 
                  ? "bg-emerald-600 text-black font-medium" 
                  : "bg-zinc-700 text-zinc-100 hover:bg-zinc-600"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* RPE */}
      <div className="space-y-1">
        <div className="text-xs text-zinc-400">RPE</div>
        <div className="flex gap-2">
          {["6", "7", "8", "9"].map(r => (
            <button
              key={r}
              onClick={() => setRpe(r)}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                rpe === r 
                  ? "bg-emerald-600 text-black font-medium" 
                  : "bg-zinc-700 text-zinc-100 hover:bg-zinc-600"
              }`}
            >
              RPE{r}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          className="flex-1 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-black font-semibold transition-colors"
          onClick={handleSave}
        >
          Save Log
        </button>
        <button
          className="h-10 px-3 rounded-xl bg-zinc-700 hover:bg-zinc-600 text-zinc-100 transition-colors"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
      
      <button className="text-xs text-emerald-300 underline hover:text-emerald-200 transition-colors">
        Open detailed log
      </button>
    </div>
  );
}

export function WorkoutLogCard() {
  const [split, setSplit] = useState<Split>("PPL");
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [loggedToday] = useState(false); // TODO: Connect to actual state

  const handleGroupClick = (group: string) => {
    // TODO: Add analytics tracking
    setActiveGroup(group);
  };

  const handleLogSaved = () => {
    setActiveGroup(null);
    // TODO: Update logged state
  };

  return (
    <div className="px-4 mt-4">
      <div className="rounded-2xl bg-zinc-900/60 ring-1 ring-white/5 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-zinc-100">Log a workout</h3>
          {loggedToday && (
            <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full">
              Logged today (edit)
            </span>
          )}
        </div>

        {/* Split selector */}
        <div className="flex w-full bg-zinc-800 rounded-xl p-1 mb-3">
          <button
            onClick={() => setSplit("PPL")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              split === "PPL" ? "bg-zinc-700 text-white" : "text-zinc-300 hover:text-white"
            }`}
          >
            PPL
          </button>
          <button
            onClick={() => setSplit("CLASSIC")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              split === "CLASSIC" ? "bg-zinc-700 text-white" : "text-zinc-300 hover:text-white"
            }`}
          >
            Classic
          </button>
        </div>

        {/* Group buttons */}
        <div className="grid grid-cols-3 gap-2">
          {GROUPS[split].map(group => (
            <button
              key={group}
              onClick={() => handleGroupClick(group)}
              className="py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium transition-colors"
            >
              {group}
            </button>
          ))}
        </div>

        {/* Quick log inline */}
        {activeGroup && (
          <QuickLogInline
            group={activeGroup}
            onClose={() => setActiveGroup(null)}
            onSaved={handleLogSaved}
          />
        )}
      </div>
    </div>
  );
}