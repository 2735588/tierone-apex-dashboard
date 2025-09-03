import { useEffect, useState } from "react";
import { kgToLb, lbToKg } from "@/lib/pr";

export default function PRUpdateModal({
  open, onClose, lift, currentKg, onSave
}: { open: boolean; onClose: ()=>void; lift: string; currentKg: number; onSave: (newKg:number)=>Promise<void>; }) {
  const [unit, setUnit] = useState<"kg"|"lb">("kg");
  const [val, setVal] = useState<number>(currentKg);

  useEffect(()=>{ setVal(currentKg); setUnit("kg"); }, [currentKg, lift, open]);

  const shown = unit === "kg" ? val : kgToLb(val);
  function setShown(n: number) { setVal(unit === "kg" ? n : lbToKg(n)); }

  return !open ? null : (
    <div className="fixed inset-0 z-50 bg-black/60 grid place-items-end md:place-items-center p-0 md:p-6">
      <div className="w-full md:w-[420px] rounded-t-2xl md:rounded-2xl bg-zinc-950 ring-1 ring-white/10 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-zinc-400">Update PR</div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-200">✕</button>
        </div>
        <div className="text-lg font-semibold text-zinc-100">{lift}</div>

        <div className="mt-4 flex items-end gap-3">
          <div className="flex-1">
            <label className="text-[11px] text-zinc-400">PR Value</label>
            <input
              inputMode="decimal"
              value={Number.isFinite(shown) ? shown : ""}
              onChange={(e)=> setShown(parseFloat(e.target.value || "0"))}
              className="mt-1 w-full rounded-xl bg-zinc-900 ring-1 ring-white/10 px-3 py-2 text-zinc-100"
            />
          </div>
          <div>
            <label className="text-[11px] text-zinc-400">Unit</label>
            <select value={unit} onChange={e=> setUnit(e.target.value as any)}
              className="mt-1 rounded-xl bg-zinc-900 ring-1 ring-white/10 px-2 py-2 text-zinc-100">
              <option>kg</option><option>lb</option>
            </select>
          </div>
        </div>

        <div className="mt-4 text-[12px] text-zinc-400">
          Current: <span className="text-zinc-200">{currentKg} kg</span> ({kgToLb(currentKg)} lb)
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-lg px-3 py-2 bg-zinc-800 text-zinc-200">Cancel</button>
          <button
            onClick={async ()=> { await onSave(val); onClose(); }}
            className="rounded-lg px-3 py-2 bg-emerald-500 text-black font-semibold"
          >Save PR</button>
        </div>
      </div>
    </div>
  );
}