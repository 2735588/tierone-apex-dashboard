export default function VideoModal({
  open, onClose, videoUrl, title
}: {
  open: boolean; onClose: ()=>void; videoUrl: string; title: string;
}) {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/80 grid place-items-center p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-zinc-950 ring-1 ring-white/10 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold text-zinc-100">{title} - Video Proof</div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-200">✕</button>
        </div>
        
        <video 
          src={videoUrl} 
          controls 
          autoPlay
          className="w-full rounded-lg ring-1 ring-white/10"
        />
      </div>
    </div>
  );
}