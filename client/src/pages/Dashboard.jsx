import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const auction = null;
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
      </div>
    </div>
  );
}

export default Dashboard;
