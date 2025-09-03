import { useEffect, useState } from "react";
import { getFriendsStreaks } from "@/lib/api";

function FriendCard({ name, days }:{ name:string; days:number }) {
  const pct = Math.min(days/30, 1); // progress to 30d
  return (
    <div className="min-w-[140px] rounded-xl p-3 bg-zinc-900/60 ring-1 ring-white/5 mr-3">
      <div className="text-sm font-semibold text-zinc-100 truncate">{name}</div>
      <div className="mt-1 text-emerald-400 font-extrabold text-lg">{days}d</div>
      <div className="mt-1 h-1.5 w-full rounded-full bg-zinc-800">
        <div className="h-full rounded-full bg-emerald-500" style={{ width:`${pct*100}%` }} />
      </div>
      <div className="mt-1 text-[11px] text-zinc-500">current streak</div>
    </div>
  );
}

export default function FriendsStreaks() {
  const [friends,setFriends]=useState<Array<{id:string;name:string;days:number}>>([]);

  useEffect(()=>{ (async()=> setFriends(await getFriendsStreaks()))(); },[]);

  return (
    <div className="mt-3 px-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-semibold text-zinc-100">Friends' streaks</div>
        <button className="text-[12px] text-zinc-400 hover:text-zinc-200">View all</button>
      </div>
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex pr-4">
          {friends.map(f => <FriendCard key={f.id} name={f.name} days={f.days} />)}
        </div>
      </div>
    </div>
  );
}