import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { playersList } from "../../../data/adminTables";
import { MdDelete, MdEdit } from "react-icons/md";
import Loader from "../../common/Loader";
import {
  deletePlayerById,
  getAllPlayers,
} from "../../../redux/slice/playerSlice";

function PlayersList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auctionId } = useParams();
  const { players, loading } = useSelector((state) => state.players);

  function handleDeletePlayer(aucId, playerId) {
    dispatch(deletePlayerById({ aucId, playerId }));
  }

  useEffect(() => {
    dispatch(getAllPlayers(auctionId));
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-2xl font-medium">Players List</h2>
          <button
            className="bg-green-700 block text-white px-4 py-2 mt-4 rounded mx-auto"
            onClick={() => navigate(`/dashboard/player-add/${auctionId}`)}
          >
            + Add Player
          </button>

          <div className="mt-4 overflow-x-auto table-responsive">
            {players && players.length > 0 ? (
              <table className="border-collapse w-full border border-gray-200 mb-3 min-w-[1280px]">
                <thead className="bg-gray-100">
                  <tr>
                    {playersList?.map((li, i) => {
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
                  {players?.map((data, i) => (
                    <tr key={i}>
                      <td className="border border-gray-200 px-4 py-2">
                        <div className="flex gap-2 text-blue-800">
                          <button
                            className="bg-gray-100 hover:bg-gray-200 transition h-8 w-8 flex items-center justify-center rounded-full"
                            onClick={() =>
                              navigate(
                                `/dashboard/player-edit/${data.auction}/${data._id}`
                              )
                            }
                          >
                            <MdEdit size={20} />
                          </button>
                          <button
                            className="bg-gray-100 hover:bg-gray-200 transition h-8 w-8 flex items-center justify-center rounded-full"
                            onClick={() =>
                              handleDeletePlayer(data.auction, data._id)
                            }
                          >
                            <MdDelete size={20} />
                          </button>
                        </div>
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {data.name}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {data.minimumBid}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 capitalize">
                        {data.category}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {data.phone}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {data.age}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 uppercase">
                        {data.ts_size}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 uppercase">
                        {data.tr_size}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {data.ts_name}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {data.ts_number}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-4 text-center text-red-600 text-xl md:text-2xl font-medium">
                No Teams Available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayersList;
