import { useState } from "react";

type Split = "PPL" | "CLASSIC" | "COMBINED";
type PairKey = "CB" | "LC" | "AS";

const GROUPS = {
  PPL: ["Push", "Pull", "Legs"],
  CLASSIC: ["Chest", "Back", "Legs", "Arms", "Core"]
};

const COMBINED: Record<PairKey, {name: string; sub: string; groups: string[]}> = {
  CB: { name: "Chest / Back", sub: "Upper push + pull", groups: ["Chest", "Back"] },
  LC: { name: "Legs / Core", sub: "Lower body + stability", groups: ["Legs", "Core"] },
  AS: { name: "Arms / Shoulders", sub: "Biceps/Triceps + Delts", groups: ["Arms", "Shoulders"] },
};

interface QuickLogInlineProps {
  group?: string;
  pairKey?: PairKey;
  onClose: () => void;
  onSaved: () => void;
}

interface CombinedQuickLogProps {
  pairKey: PairKey;
  onClose: () => void;
  onSaved: () => void;
}

function QuickLogInline({ group, onClose, onSaved }: QuickLogInlineProps) {
  const handleSave = () => {
    // TODO: Add analytics tracking and actual save logic
    onSaved();
  };

  return (
    <div className="mt-3 rounded-xl bg-zinc-800 p-3 space-y-3">
      <div className="text-sm text-zinc-300">Quick Log — {group}</div>
      
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

function CombinedQuickLog({ pairKey, onClose, onSaved }: CombinedQuickLogProps) {
  const [groupToggles, setGroupToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(COMBINED[pairKey].groups.map(g => [g, true]))
  );
  const [duration, setDuration] = useState<string>("");
  const [rpe, setRpe] = useState<string>("");

  const handleSave = () => {
    const selectedGroups = COMBINED[pairKey].groups.filter(g => groupToggles[g]);
    // TODO: Add analytics tracking and actual save logic
    console.log('Saving combined log:', { pairKey, selectedGroups, duration, rpe });
    onSaved();
  };

  return (
    <div className="mt-3 rounded-xl bg-zinc-800 p-3 space-y-3">
      <div className="text-sm text-zinc-300">Quick Log — {COMBINED[pairKey].name}</div>
      
      {/* Group toggles */}
      <div className="flex gap-2">
        {COMBINED[pairKey].groups.map(group => (
          <button
            key={group}
            onClick={() => setGroupToggles(prev => ({ ...prev, [group]: !prev[group] }))}
            className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
              groupToggles[group]
                ? "border-emerald-500 bg-emerald-900/30 text-emerald-200"
                : "border-zinc-600 bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
            }`}
          >
            {groupToggles[group] ? "✓ " : ""}{group}
          </button>
        ))}
      </div>

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
          className="flex-1 h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-black font-semibold transition-colors"
          onClick={handleSave}
        >
          Save Log
        </button>
        <button
          className="h-11 px-3 rounded-xl bg-zinc-700 hover:bg-zinc-600 text-zinc-100 transition-colors"
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
  const [split, setSplit] = useState<Split>("COMBINED");
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [activePair, setActivePair] = useState<PairKey | null>(null);
  const [loggedToday] = useState(false); // TODO: Connect to actual state

  const handleGroupClick = (group: string) => {
    // TODO: Add analytics tracking
    setActiveGroup(group);
    setActivePair(null);
  };

  const handlePairClick = (pairKey: PairKey) => {
    // TODO: Add analytics tracking
    setActivePair(pairKey);
    setActiveGroup(null);
  };

  const handleLogSaved = () => {
    setActiveGroup(null);
    setActivePair(null);
    // TODO: Update logged state
  };

  return (
    <div className="px-4 mt-4">
      <div className="rounded-2xl bg-zinc-900/60 ring-1 ring-white/5 p-4">
        <div className="flex items-center justify-center mb-3">
          <h3 className="text-base font-bold text-white bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Log a workout</h3>
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
          <button
            onClick={() => setSplit("COMBINED")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              split === "COMBINED" ? "bg-zinc-700 text-white" : "text-zinc-300 hover:text-white"
            }`}
          >
            Combined
          </button>
        </div>

        {/* Group buttons */}
        {(split === "PPL" || split === "CLASSIC") && (
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
        )}

        {/* Combined preset buttons */}
        {split === "COMBINED" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(COMBINED).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => handlePairClick(key as PairKey)}
                className="rounded-2xl bg-zinc-800 hover:bg-zinc-700 px-4 py-4 text-left transition-colors shadow-[0_6px_18px_rgba(0,0,0,0.35)] border border-emerald-500/10"
                style={{ height: '64px' }}
              >
                <div className="text-base font-semibold text-white leading-tight">{preset.name}</div>
                <div className="text-xs text-zinc-400 mt-1">{preset.sub}</div>
              </button>
            ))}
          </div>
        )}

        {/* Quick log inline */}
        {activeGroup && (
          <QuickLogInline
            group={activeGroup}
            onClose={() => setActiveGroup(null)}
            onSaved={handleLogSaved}
          />
        )}

        {/* Combined quick log inline */}
        {activePair && (
          <CombinedQuickLog
            pairKey={activePair}
            onClose={() => setActivePair(null)}
            onSaved={handleLogSaved}
          />
        )}
      </div>
    </div>
  );
}