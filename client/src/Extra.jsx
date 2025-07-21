// // Dashboard layout
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Outlet, useNavigate, Link } from "react-router-dom";
// import { logout } from "../../redux/slice/userSlice";
// import { getUsersAuction } from "../../redux/slice/auctionSlice";
// import { toggleSidebar } from "../../redux/slice/layoutSlice";
// import { MdMenu, MdClose } from "react-icons/md";
// import { TiHome } from "react-icons/ti";

// function DashboardLayout() {
//   const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
//   const user = useSelector((state) => state.user.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const userId = user?._id;

//   function logoutUser() {
//     dispatch(logout());
//     navigate("/home");
//   }

//   function handleSidebarToggle() {
//     dispatch(toggleSidebar());
//   }

//   useEffect(() => {
//     if (userId) dispatch(getUsersAuction(userId));
//   }, [dispatch, userId]);

//   return (
//     <div className="flex min-h-screen bg-gray-100 relative">
//       <aside
//         className={`fixed top-0 left-0 h-screen w-[250px] bg-white shadow-md z-30 transform transition-transform duration-300 ease-in-out
//         ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0 lg:static`}
//       >
//         <div className="p-4 font-bold text-xl border-b flex justify-between items-center lg:justify-center">
//           <span>Cricktrade</span>
//           <button className="lg:hidden" onClick={handleSidebarToggle}>
//             <MdClose className="h-6 w-6" />
//           </button>
//         </div>
//         <ul className="p-4 space-y-2">
//           <Link to="/dashboard">
//             <li className="hover:bg-gray-200 p-2 rounded cursor-pointer text-lg font-medium flex items-center gap-2">
//               <TiHome size={22} />
//               <span>My Auction</span>
//             </li>
//           </Link>
//         </ul>
//       </aside>

//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-30 z-20 lg:hidden"
//           onClick={handleSidebarToggle}
//         />
//       )}

//       <div
//         className={`flex-1 flex flex-col transition-all duration-300 ${
//           isSidebarOpen ? "ml-0 lg:ml-[250px]" : "ml-0"
//         }`}
//       >
//         <header className="bg-white p-4 shadow-md flex justify-between items-center lg:justify-end sticky top-0 z-10">
//           <button className="lg:hidden" onClick={handleSidebarToggle}>
//             {isSidebarOpen ? (
//               <MdClose className="h-6 w-6" />
//             ) : (
//               <MdMenu className="h-6 w-6" />
//             )}
//           </button>
//           <button
//             onClick={logoutUser}
//             className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
//           >
//             Logout
//           </button>
//         </header>

//         <main className="p-6 flex-1">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

// export default DashboardLayout;
