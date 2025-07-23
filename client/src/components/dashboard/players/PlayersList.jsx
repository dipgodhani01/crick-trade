import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { playersList } from "../../../data/adminTables";
import { MdCurrencyRupee, MdDelete, MdEdit } from "react-icons/md";
import Loader from "../../common/Loader";
import {
  deletePlayerById,
  getAllPlayers,
  updatePlayerBasePrice,
} from "../../../redux/slice/playerSlice";
import { FaImage } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import Formfields from "../../common/Formfields";
import { formatIndianNumber } from "../../../helper/helper";

function PlayersList() {
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [basePrice, setBasePrice] = useState("");
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [openBasePricePopup, setOpenBasePricePopup] = useState(false);
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

  const handleChangePrice = async (e) => {
    e.preventDefault();
    if (!basePrice || !selectedPlayerId || !auctionId) return;

    dispatch(
      updatePlayerBasePrice({
        minimumBid: basePrice,
        playerId: selectedPlayerId,
        auctionId,
      })
    );

    setOpenBasePricePopup(false);
  };

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
                            title="Edit Player"
                          >
                            <MdEdit size={20} />
                          </button>
                          <button
                            className="bg-gray-100 hover:bg-gray-200 transition h-8 w-8 flex items-center justify-center rounded-full"
                            onClick={() =>
                              handleDeletePlayer(data.auction, data._id)
                            }
                            title="Delete Player"
                          >
                            <MdDelete size={20} />
                          </button>
                          <button
                            className="bg-gray-100 hover:bg-gray-200 transition h-8 w-8 flex items-center justify-center rounded-full"
                            onClick={() => {
                              setSelectedLogo(data?.logo);
                              setOpenPopup(true);
                            }}
                            title="Show Player Photo"
                          >
                            <FaImage size={18} />
                          </button>
                          <button
                            className="bg-gray-100 hover:bg-gray-200 transition h-8 w-8 flex items-center justify-center rounded-full"
                            onClick={() => {
                              setOpenBasePricePopup(true);
                              setSelectedPlayerId(data._id);
                            }}
                            title="Change Base Price"
                          >
                            <MdCurrencyRupee size={20} />
                          </button>
                        </div>
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {data.name}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {formatIndianNumber(data.minimumBid)}
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

      {openPopup && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setOpenPopup(false)}
        >
          <div className="bg-white rounded shadow-lg relative w-[90%] max-w-md">
            <button
              className="absolute -top-7 p-1 right-0 rounded bg-white text-gray-700 hover:text-red-500 text-xl"
              onClick={() => setOpenPopup(false)}
            >
              <IoClose size={24} />
            </button>

            {selectedLogo ? (
              <img
                src={selectedLogo}
                alt="Team Logo"
                className="w-full h-full object-contain max-h-96"
              />
            ) : (
              <p className="text-gray-600">No logo found.</p>
            )}
          </div>
        </div>
      )}
      {openBasePricePopup && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded shadow-lg relative w-[90%] max-w-md">
            <button
              className="absolute -top-7 p-1 right-0 rounded bg-white text-gray-700 hover:text-red-500 text-xl"
              onClick={() => setOpenBasePricePopup(false)}
            >
              <IoClose size={24} />
            </button>
            <div className="p-4">
              <form onSubmit={handleChangePrice}>
                <Formfields
                  label="Change base price"
                  name="basePrice"
                  type="text"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                  placeholder="Enter base price"
                  required={true}
                />
                <div>
                  <button
                    type="submit"
                    className="mt-4 px-4 bg-green-600 text-white py-2 rounded hover:bg-green-800 transition"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Change"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayersList;
