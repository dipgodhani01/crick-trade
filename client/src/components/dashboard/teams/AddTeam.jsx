import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Formfields from "../../common/Formfields";
import { createTeams } from "../../../redux/slice/teamsSlice";

function AddTeam() {
  const [formData, setFormData] = useState({
    logo: null,
    name: "",
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auction);
  const { auctionId } = useParams();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      setLogoPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("logo", formData.logo);
    data.append("name", formData.name);
    data.append("auctionId", auctionId);

    const res = await dispatch(createTeams(data));
    if (res.payload.success) {
      navigate(-1);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-medium">Create Team</h2>
      <div className="mt-6 xl:w-[70%]">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {logoPreview && (
              <img
                src={logoPreview}
                alt="Logo Preview"
                className="w-32 h-24 object-contain rounded"
              />
            )}

            <Formfields
              label="Team Logo"
              name="logo"
              type="file"
              onChange={handleChange}
              required={true}
            />
            <Formfields
              label="Team Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter team name"
              required={true}
            />
          </div>

          <button
            type="submit"
            className="mt-4 px-4 bg-green-600 text-white py-2 rounded hover:bg-green-800 transition"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Team"}
          </button>
          <button
            className="ml-4 py-2 bg-red-500 hover:bg-red-700 rounded px-6 text-white transition"
            onClick={() => navigate(-1)}
            type="button"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTeam;
