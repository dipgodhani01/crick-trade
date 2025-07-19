import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slice/userSlice";
import { MdMenu, MdClose } from "react-icons/md";
import { TiHome } from "react-icons/ti";
import { Link } from "react-router-dom";
import { getUsersAuction } from "../../redux/slice/auctionSlice";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useSelector((state) => state.user.user);

  const userId = user._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logoutUser() {
    dispatch(logout());
    navigate("/home");
  }

  useEffect(() => {
    dispatch(getUsersAuction(userId));
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed md:relative z-30 transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 bg-white shadow-lg h-screen`}
      >
        <div className="p-4 font-bold text-xl border-b flex justify-between items-center">
          <span>Cricktrade</span>
          <button onClick={() => setSidebarOpen(false)}>
            <MdClose className="md:hidden h-6 w-6" />
          </button>
        </div>
        <ul className="p-4 space-y-2">
          <Link to="/dashboard">
            <li className="hover:bg-gray-200 p-2 rounded cursor-pointer text-lg font-medium flex items-center gap-2">
              <TiHome size={22} />
              <span>My Auction</span>
            </li>
          </Link>
        </ul>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 h-screen md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white p-3.5 shadow flex justify-between md:justify-end items-center sticky top-0 z-10">
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <MdClose className="h-6 w-6" />
            ) : (
              <MdMenu className="h-6 w-6" />
            )}
          </button>
          <button
            className="bg-red-500 rounded px-4 py-1 text-white"
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
