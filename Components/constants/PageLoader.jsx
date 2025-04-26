import { Loader } from "lucide-react";
import React from "react";

function PageLoader() {
  return (
    <div>
      <Loader className="text-blue-500 w-12 h-12 animate-spin" />
    </div>
  );
}

export default PageLoader;
