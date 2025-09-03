export function HomeHeader({ name = "Braedon Williams" }: { name?: string }) {
  return (
    <header className="relative flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <img src="/t1-mark-64.png" alt="TierOne" className="h-6 w-6 rounded-sm" />
        <div className="text-sm text-zinc-300">
          <div className="text-zinc-400">Welcome back,</div>
          <div className="font-semibold text-zinc-100">{name}</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button aria-label="Notifications" className="h-8 w-8 grid place-items-center rounded-xl bg-zinc-900 ring-1 ring-white/5 text-zinc-300">🔔</button>
        <button aria-label="Settings" className="h-8 w-8 grid place-items-center rounded-xl bg-zinc-900 ring-1 ring-white/5 text-zinc-300">⚙️</button>
      </div>
    </header>
  );
}