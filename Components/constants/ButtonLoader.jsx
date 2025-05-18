import { Loader2 } from "lucide-react";

function ButtonLoader() {
  return (
    <div className="w-full flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-slate-200" />
    </div>
  );
}

export default ButtonLoader;
