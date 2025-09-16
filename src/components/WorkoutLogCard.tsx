import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type WorkoutType = "bodybuilding" | "athlete" | "weightloss";

export function WorkoutLogCard() {
  const [selectedType, setSelectedType] = useState<WorkoutType>("bodybuilding");
  const [loggedToday] = useState(false); // TODO: Connect to actual state

  const workoutTypes = [
    { key: "bodybuilding" as WorkoutType, label: "Bodybuilding" },
    { key: "athlete" as WorkoutType, label: "Athlete" },
    { key: "weightloss" as WorkoutType, label: "Weight Loss" }
  ];

  const handleTypeSelect = (type: WorkoutType) => {
    setSelectedType(type);
    // TODO: Add analytics tracking and actual save logic
  };

  return (
    <div className="px-4 mt-4">
      <div className="rounded-2xl bg-zinc-900/60 ring-1 ring-white/5 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Workout</h3>
            <span className="text-sm font-medium text-emerald-400">Thursday</span>
          </div>
          <div className="flex items-center gap-2">
            {loggedToday && (
              <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full">
                Logged today
              </span>
            )}
            <Select value={selectedType} onValueChange={(value) => handleTypeSelect(value as WorkoutType)}>
              <SelectTrigger className="w-32 h-8 bg-zinc-800 border-zinc-700 text-white text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                {workoutTypes.map(type => (
                  <SelectItem key={type.key} value={type.key} className="text-white hover:bg-zinc-700 focus:bg-zinc-700">
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* AI Workout Content Area */}
        <div className="min-h-[200px] rounded-xl bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center">
          <div className="text-center text-zinc-400">
            <div className="text-sm font-medium mb-1">Today's AI Workout</div>
            <div className="text-xs opacity-70">Based on your TierScore & {workoutTypes.find(t => t.key === selectedType)?.label} program</div>
            <div className="text-xs opacity-50 mt-2">Coming soon...</div>
          </div>
        </div>
      </div>
    </div>
  );
}