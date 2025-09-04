import { useNavigate } from 'react-router-dom';

interface QuickActionsProps {
  lastScanDate?: string;
}

export function QuickActions({ lastScanDate }: QuickActionsProps) {
  const navigate = useNavigate();

  const handleUploadPR = () => {
    // TODO: Add analytics tracking
    navigate('/prs-main');
  };

  const handleBodyScan = () => {
    // TODO: Add analytics tracking
    navigate('/scan');
  };

  return (
    <div className="px-4 mt-4">
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleUploadPR}
          className="h-12 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition-colors"
        >
          Upload PR
        </button>
        <div className="flex flex-col">
          <button
            onClick={handleBodyScan}
            className="h-12 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold transition-colors"
          >
            Body Scan
          </button>
          <div className="text-xs text-zinc-500 text-center mt-1">
            {lastScanDate ? `Last: ${lastScanDate}` : "No scans yet"}
          </div>
        </div>
      </div>
    </div>
  );
}