import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { teamsList } from "../../../data/adminTables";
import { deleteTeamById, getAllTeams } from "../../../redux/slice/teamsSlice";
import { MdDelete, MdEdit } from "react-icons/md";
import { formatDate } from "../../../helper/helper";
import Loader from "../../common/Loader";

function TeamList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auctionId } = useParams();
  const { teams, loading } = useSelector((state) => state.teams);

  function handleDeleteTeams(aucId, teamId) {
    dispatch(deleteTeamById({ aucId, teamId }));
  }

  useEffect(() => {
    dispatch(getAllTeams(auctionId));
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-2xl font-medium">Team List</h2>
          <button
            className="bg-green-700 block text-white px-4 py-2 mt-4 rounded mx-auto"
            onClick={() => navigate(`/dashboard/team-add/${auctionId}`)}
          >
            + Add Team
          </button>

          <div className="mt-4 overflow-x-auto table-responsive">
            {teams && teams.length > 0 ? (
              <table className="border-collapse w-full border border-gray-200 mb-3 min-w-[620px]">
                <thead className="bg-gray-100">
                  <tr>
                    {teamsList?.map((li, i) => {
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
                  {teams?.map((data, i) => (
                    <tr key={i} className="">
                      <td className="border border-gray-200 px-4 py-2">
                        <div className="flex gap-2 text-blue-800">
                          <button className="bg-gray-100 hover:bg-gray-200 transition h-8 w-8 flex items-center justify-center rounded-full">
                            <MdEdit size={20} />
                          </button>
                          <button
                            className="bg-gray-100 hover:bg-gray-200 transition h-8 w-8 flex items-center justify-center rounded-full"
                            onClick={() =>
                              handleDeleteTeams(data.auction, data._id)
                            }
                          >
                            <MdDelete size={20} />
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
                        {formatDate(data?.createdAt)}
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

export default TeamList;
