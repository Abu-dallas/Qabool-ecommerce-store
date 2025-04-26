import RenderBarChart from "@/Components/constants/Reacherts";
import { DollarSign, PenLine, ShoppingCart, Users2 } from "lucide-react";

function AdminPage() {
  return (
    <div className="bg-gray-200 overflow-y-hidden w-full">
      <div className="max-lg:grid flex justify-center grid-cols-4 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1 w-full mt-6 max-lg:px-1 px-8">
        <div className="bg-white/80 p-4 w-[250px] rounded-2xl max-lg:w-full">
          <div className="flex items-center justify-between p-2">
            <p className="text-sm font-bold text-slate-600">MONTHLY REVENUE</p>
            <DollarSign className="size-8 text-slate-600" />
          </div>
          <p className="text-4xl font-bold px-2 text-slate-600">5,652</p>
        </div>
        <div className="bg-white/80 p-4 w-[250px] rounded-2xl max-lg:w-full">
          <div className="flex items-center justify-between p-2">
            <p className="text-sm font-bold text-slate-600">SALES</p>
            <ShoppingCart className="size-8 text-green-400" />
          </div>
          <p className="text-4xl font-bold px-2 text-slate-600">52</p>
        </div>
        <div className="bg-white/80 p-4 w-[250px] rounded-2xl max-lg:w-full">
          <div className="flex items-center justify-between p-2">
            <p className="text-sm font-bold text-slate-600">CUSTOMERS</p>
            <Users2 className="size-8 text-blue-400" />
          </div>
          <p className="text-4xl font-bold px-2 text-slate-600">25</p>
        </div>
        <div className="bg-white/80 p-4 w-[250px] rounded-2xl max-lg:w-full">
          <div className="flex items-center justify-between p-2">
            <p className="text-sm font-bold text-slate-600">PENDING ORDERS</p>
            <PenLine className="size-8 text-red-400" />
          </div>
          <p className="text-4xl font-bold px-2 text-slate-600">14</p>
        </div>
      </div>
      <div className="md:p-6 mt-6 max-sm:h-[350px] h-[500px] w-full flex items-center justify-center">
        <RenderBarChart />
      </div>
    </div>
  );
}

export default AdminPage;
