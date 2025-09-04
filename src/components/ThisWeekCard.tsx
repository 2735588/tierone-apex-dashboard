interface DayData {
  day: string;
  completed: boolean;
  group?: string;
}

export function ThisWeekCard() {
  // Mock data - TODO: Connect to actual workout data
  const weekData: DayData[] = [
    { day: "Mon", completed: true, group: "Push" },
    { day: "Tue", completed: true, group: "Pull" },
    { day: "Wed", completed: false },
    { day: "Thu", completed: true, group: "Legs" },
    { day: "Fri", completed: false },
    { day: "Sat", completed: false },
    { day: "Sun", completed: false },
  ];

  const completedSessions = weekData.filter(d => d.completed).length;
  const totalMinutes = completedSessions * 45; // Mock calculation
  const lastGroup = weekData.filter(d => d.completed).pop()?.group;

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
                    {day.completed ? (day.group ? day.group.slice(0, 2) : "✓") : "—"}
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">
                Sessions: <span className="text-zinc-100 font-medium">{completedSessions}</span>
              </span>
              <span className="text-zinc-400">
                Minutes: <span className="text-zinc-100 font-medium">{totalMinutes}</span>
              </span>
              <span className="text-zinc-400">
                Last: <span className="text-zinc-100 font-medium">{lastGroup || "—"}</span>
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