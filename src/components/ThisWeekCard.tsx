interface DayData {
  day: string;
  completed: boolean;
  group?: string;
  pairToken?: string; // CB, LC, AS for combined workouts
  mode?: "single" | "combined";
}

// Helper function to get display token for week chips
function getWeekToken(log: DayData): string {
  if (log.mode === "combined" && log.pairToken) {
    return log.pairToken; // CB, LC, AS
  }
  
  // Single group mappings
  const tokenMap: Record<string, string> = {
    Push: "Pu",
    Pull: "Pl", 
    Legs: "Le",
    Chest: "Ch",
    Back: "Ba",
    Arms: "Ar",
    Shoulders: "Sh",
    Core: "Co",
    "Full-body": "Fb"
  };
  
  return tokenMap[log.group || ""] || log.group?.slice(0, 2) || "•";
}

export function ThisWeekCard() {
  // Mock data with combined workouts - TODO: Connect to actual workout data
  const weekData: DayData[] = [
    { day: "Mon", completed: true, group: "Chest/Back", pairToken: "CB", mode: "combined" },
    { day: "Tue", completed: true, group: "Pull", mode: "single" },
    { day: "Wed", completed: false },
    { day: "Thu", completed: true, group: "Legs/Core", pairToken: "LC", mode: "combined" },
    { day: "Fri", completed: false },
    { day: "Sat", completed: false },
    { day: "Sun", completed: false },
  ];

  const completedSessions = weekData.filter(d => d.completed).length;
  const totalMinutes = completedSessions * 45; // Mock calculation
  const lastWorkout = weekData.filter(d => d.completed).pop();
  const lastLabel = lastWorkout?.mode === "combined" 
    ? lastWorkout.group 
    : lastWorkout?.group;

  const hasAnyActivity = completedSessions > 0;

  return (
    <div className="px-4 mt-4">
      <div className="rounded-2xl bg-zinc-900/60 ring-1 ring-white/5 p-4">
        <h3 className="text-sm font-semibold text-zinc-100 mb-3">This Week</h3>
        
        {hasAnyActivity ? (
          <>
            {/* Week grid */}
            <div className="grid grid-cols-7 gap-2 mb-3">
              {weekData.map((day, i) => (
                <div key={i} className="text-center">
                  <div className="text-xs text-zinc-400 mb-1">{day.day}</div>
                   <div className={`w-8 h-8 rounded-lg mx-auto flex items-center justify-center text-xs font-medium ${
                     day.completed 
                       ? "bg-emerald-500 text-black" 
                       : "bg-zinc-800 text-zinc-500"
                   }`}>
                     {day.completed ? getWeekToken(day) : "—"}
                   </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="flex justify-center text-sm">
               <span className="text-zinc-400">
                 Last: <span className="text-zinc-100 font-medium">{lastLabel || "—"}</span>
               </span>
            </div>
          </>
        ) : (
          <div className="text-center py-6 text-zinc-400">
            <div className="text-sm">No sessions yet — log your first one above.</div>
          </div>
        )}
      </div>
    </div>
  );
}