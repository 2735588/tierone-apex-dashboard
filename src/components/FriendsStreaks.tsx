export function FriendsStreaks({ items = [
  { name:"Alex", days:14 }, { name:"Sam", days:9 }, { name:"Jess", days:6 }
]}:{ items?: {name:string; days:number}[] }) {
  return (
    <div className="px-4 mt-5">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-zinc-300">Friends' streaks</div>
        <button className="text-[12px] text-zinc-400 hover:text-zinc-200">View all</button>
      </div>
      <div className="flex gap-3 overflow-x-auto no-scrollbar">
        {items.map(f => (
          <div key={f.name} className="min-w-[140px] rounded-2xl p-3 bg-zinc-900/60 ring-1 ring-white/5">
            <div className="text-zinc-100 font-medium">{f.name}</div>
            <div className="text-emerald-400 text-xl font-bold mt-1">{f.days}d</div>
            <div className="text-[12px] text-zinc-400">current streak</div>
          </div>
        ))}
      </div>
    </div>
  );
}