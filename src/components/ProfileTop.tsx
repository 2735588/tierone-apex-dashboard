interface ProfileTopProps {
  name: string;
  athlete: string;
}

export function ProfileTop({ name, athlete }: ProfileTopProps) {
  return (
    <div className="px-6 pt-6 pb-4">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-foreground">{name}</h1>
        <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-500/15 text-emerald-300 px-3 py-1 text-[12px] font-medium w-fit">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          {athlete}
        </div>
      </div>
    </div>
  );
}