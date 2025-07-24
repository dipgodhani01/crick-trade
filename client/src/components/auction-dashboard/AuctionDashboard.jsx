import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllTeams } from "../../redux/slice/teamsSlice";
import { getPendingPlayers } from "../../redux/slice/playerSlice";
import Loader from "../common/Loader";
import { formatIndianNumber } from "../../helper/helper";

function AuctionDashboard() {
  const [randomPlayer, setRandomPlayer] = useState(null);
  const { auctionId } = useParams();
  const dispatch = useDispatch();
  const { teams, loading } = useSelector((state) => state.teams);
  const { pending } = useSelector((state) => state.players);

  useEffect(() => {
    dispatch(getAllTeams(auctionId));
    dispatch(getPendingPlayers(auctionId));
  }, [auctionId]);

  useEffect(() => {
    if (pending && pending.length > 0) {
      const randomIndex = Math.floor(Math.random() * pending.length);
      setRandomPlayer(pending[randomIndex]);
    }
  }, [pending]);

  console.log("Pending :", pending);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="h-screen w-screen space_bg flex md:flex-row flex-col gap-4">
          <div className="w-full md:w-[45%] text-white p-4">
            <div className="md:h-[300px] lg:h-[400px] xl:h-[500px]">
              <img
                src={randomPlayer?.logo}
                alt="Player Photo"
                className="h-full w-full"
              />
            </div>
            <p className="text-2xl md:text-3xl mt-4 ">
              Base Price : {formatIndianNumber(randomPlayer?.minimumBid)}
            </p>
            <div className="p-4 mt-4 h-auto bg-black">
              <h2 className="text-2xl md:text-3xl font-medium mb-6 text-center">
                Player Details
              </h2>
              <p className="text-xl md:text-2xl">Name : {randomPlayer?.name}</p>
              <p className="text-xl md:text-2xl">Age : {randomPlayer?.age}</p>
              <p className="text-xl md:text-2xl">
                Sports Category : {randomPlayer?.category}
              </p>
              <p className="text-xl md:text-2xl">
                Contact : +91 {randomPlayer?.phone}
              </p>
            </div>
          </div>
          <div className="w-full md:w-[55%] text-white">2</div>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 h-[600px] w-full gap-4">
            <div>
              <img
                src={randomPlayer?.logo}
                alt="Player Photo"
                className="h-full w-full"
              />
            </div>
            <div className="p-5 flex flex-col justify-between">
              <div className="grid grid-cols-2 gap-6">
                {teams && teams?.length > 0 ? (
                  teams?.map((team, i) => (
                    <button
                      key={i}
                      className="py-2 px-6 w-full bg-purple-800 text-white text-lg font-semibold rounded shadow hover:bg-purple-700 transition"
                    >
                      {team.name}
                    </button>
                  ))
                ) : (
                  <p className="text-white text-lg mt-4">
                    No player available.
                  </p>
                )}
              </div>
              <div>
                <button className="text-white">Sold</button>
                <button className="text-white">Unsold</button>
              </div>
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
}

export default AuctionDashboard;
