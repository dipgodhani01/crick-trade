import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Formfields from "../../common/Formfields";
import { formFieldsData } from "../../../data/addAuction";
import { createAuction } from "../../../redux/slice/auctionSlice";

function AddAuction() {
  const [formData, setFormData] = useState({
    logo: null,
    name: "",
    date: "",
    sportType: "",
    pointPerTeam: "",
    minimumBid: "",
    bidIncrement: "",
    playersPerTeam: "",
  });
  const [logoPreview, setLogoPreview] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.user._id);
  const { loading } = useSelector((state) => state.auction);

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
    data.append("date", formData.date);
    data.append("sportType", formData.sportType);
    data.append("pointPerTeam", formData.pointPerTeam);
    data.append("minimumBid", formData.minimumBid);
    data.append("bidIncrement", formData.bidIncrement);
    data.append("playersPerTeam", formData.playersPerTeam);
    data.append("userId", userId);

    const res = await dispatch(createAuction(data));
    if (res.payload.success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-medium">Create Auction</h2>
      <div className="mt-6 xl:w-[70%]">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {logoPreview && (
              <img
                src={logoPreview}
                alt="Logo Preview"
                className="w-32 h-32 object-contain border rounded"
              />
            )}
            {formFieldsData.map((field, i) => (
              <Formfields
                key={i}
                label={field.label}
                name={field.name}
                type={field.type}
                value={field.type === "file" ? undefined : formData[field.name]}
                onChange={handleChange}
                options={field.options}
                placeholder={field.placeholder}
                required={field.required}
              />
            ))}
          </div>

          <button
            type="submit"
            className="mt-4 px-4 bg-green-600 text-white py-2 rounded hover:bg-green-800 transition"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Auction"}
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

export default AddAuction;
