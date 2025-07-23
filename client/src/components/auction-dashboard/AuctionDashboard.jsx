import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllTeams } from "../../redux/slice/teamsSlice";

function AuctionDashboard() {
  const { auctionId } = useParams();
  const dispatch = useDispatch();
  const { teams, loading } = useSelector((state) => state.teams);

  useEffect(() => {
    dispatch(getAllTeams(auctionId));
  }, [auctionId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-screen space_bg">
      <div className="flex flex-col items-center justify-center p-6">
        <div className="h-[450px] w-full flex items-center justify-center">
          <img src="" alt="Player Photo" className="h-full object-contain" />
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {teams && teams.length > 0 ? (
            teams.map((team, i) => (
              <button
                key={i}
                className="py-2 px-6 w-[300px] bg-purple-800 text-white text-lg font-semibold rounded shadow hover:bg-purple-700 transition"
              >
                {team.name}
              </button>
            ))
          ) : (
            <p className="text-white text-lg mt-4">No teams available.</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div>
          <img src="" alt="" />
        </div>
        <p className="text-white text-2xl">Right panel content</p>
      </div>
    </div>
  );
}

export default AuctionDashboard;
