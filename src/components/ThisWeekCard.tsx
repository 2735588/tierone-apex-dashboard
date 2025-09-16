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
  // Mock data - TODO: Connect to actual workout data
  const weekData: DayData[] = [
    { day: "Mon", completed: true },
    { day: "Tue", completed: true },
    { day: "Wed", completed: false },
    { day: "Thu", completed: true },
    { day: "Fri", completed: false },
    { day: "Sat", completed: false },
    { day: "Sun", completed: false },
  ];

  const completedSessions = weekData.filter(d => d.completed).length;

  const hasAnyActivity = completedSessions > 0;

  return (
    <div className="px-4 mt-4">
      <div className="rounded-2xl bg-zinc-900/60 ring-1 ring-white/5 p-4">
        
        {hasAnyActivity ? (
          <>
            {/* Week grid */}
            <div className="grid grid-cols-7 gap-2 mb-3">
              {weekData.map((day, i) => (
                <div key={i} className="text-center">
                  <div className="text-xs text-zinc-400 mb-1">{day.day}</div>
                   <div className={`w-8 h-8 rounded-lg mx-auto ${
                     day.completed 
                       ? "bg-emerald-500" 
                       : "bg-zinc-800"
                   }`}>
                   </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="flex justify-center text-sm">
               <span className="text-zinc-400">
                 {completedSessions} workout{completedSessions !== 1 ? 's' : ''} this week
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