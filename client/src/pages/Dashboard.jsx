import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../helper/helper";
import { auctionList } from "../data/adminTables";
import { MdDelete, MdEdit } from "react-icons/md";
import Loader from "../components/common/Loader";
import { deleteAuctionById } from "../redux/slice/auctionSlice";
import { FaUser, FaUserGroup } from "react-icons/fa6";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auctions, loading } = useSelector((state) => state.auction);

  function handleDeleteAuction(auctionId) {
    dispatch(deleteAuctionById(auctionId));
  }
  function editAuction(auctionId) {
    navigate(`auction-edit/${auctionId}`);
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-2xl font-medium">My Auction List</h2>
          <button
            className="bg-green-700 block text-white px-4 py-2 mt-4 rounded mx-auto"
            onClick={() => navigate("auction-add")}
          >
            + Add Auction
          </button>

          <div className="mt-4 overflow-x-auto table-responsive">
            {auctions && auctions.length > 0 ? (
              <table className="border-collapse w-full border border-gray-200 mb-3 min-w-[1080px]">
                <thead className="bg-gray-100">
                  <tr>
                    {auctionList?.map((li, i) => {
                      return (
                        <th
                          key={i}
                          className="border border-gray-200 px-4 py-2 text-left"
                        >
                          {li}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {auctions?.map((data, i) => (
                    <tr key={i} className="">
                      <td className="border border-gray-200 px-4 py-2">
                        <div className="flex gap-2 text-blue-800">
                          <button
                            className="bg-gray-100 hover:bg-gray-200 transition h-8 w-8 flex items-center justify-center rounded-full"
                            onClick={() => editAuction(data._id)}
                            title="Edit Auction"
                          >
                            <MdEdit size={20} />
                          </button>
                          <button
                            className="bg-gray-100 hover:bg-gray-200 transition h-8 w-8 flex items-center justify-center rounded-full"
                            onClick={() => handleDeleteAuction(data._id)}
                            title="Delete Auction"
                          >
                            <MdDelete size={20} />
                          </button>
                          <button
                            className="bg-gray-100 hover:bg-gray-200 transition h-8 w-8 flex items-center justify-center rounded-full"
                            // onClick={() => navigate(`teams/${data._id}`)}
                            title="All Players"
                          >
                            <FaUser size={16} />
                          </button>
                          <button
                            className="bg-gray-100 hover:bg-gray-200 transition h-8 w-8 flex items-center justify-center rounded-full"
                            onClick={() => navigate(`teams/${data._id}`)}
                            title="All Teams"
                          >
                            <FaUserGroup size={16} />
                          </button>
                        </div>
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        <img
                          src={data?.logo}
                          alt="logo"
                          className="w-16 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {data.name}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {data.sportType}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {data.pointPerTeam}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {data.minimumBid}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {data.bidIncrement}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {data.playersPerTeam}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {formatDate(data?.date)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-4 text-center text-red-600 text-xl md:text-2xl font-medium">
                No Auction Available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
