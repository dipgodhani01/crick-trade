import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../helper/helper";

function Dashboard() {
  const navigate = useNavigate();
  const { auctions } = useSelector((state) => state.auction);
  console.log(auctions);

  return (
    <div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-medium">My Auction List</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 mt-2 rounded"
          onClick={() => navigate("auction-add")}
        >
          Add Auction
        </button>

        <div className="mt-4 ">
          <div className="overflow-x-auto table-responsive">
            <table className="border-collapse w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Action
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Name
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Type Of Sport
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Points Per Team
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Minimum Bid
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Bid Increase By
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Player Per Team
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {auctions?.map((data, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">
                      <img
                        src={data?.logo}
                        alt="logo"
                        className="w-10 h-10 object-cover rounded"
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
