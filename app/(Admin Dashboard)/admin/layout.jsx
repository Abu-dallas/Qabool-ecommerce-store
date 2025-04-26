import SideBar from "@/Components/sideBar";
import Navigationbar from "@/Components/navigationbar";

export default function AdminLayout({ children }) {
  return (
    <>
      <Navigationbar />
      <div className="flex">
        <div className=" lg:fixed top-0 left-0">
          <SideBar />
        </div>
        <div className="lg:ml-[250px] w-full">{children}</div>
      </div>
    </>
  );
}
