import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAuctionById,
  updateAuction,
} from "../../../redux/slice/auctionSlice";
import Formfields from "../../common/Formfields";
import { formFieldsData } from "../../../data/addAuction";

function EditAuction() {
  const [formData, setFormData] = useState({});
  const [logoPreview, setLogoPreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auctionId } = useParams();
  const { selectedAuction, loading } = useSelector((state) => state.auction);

  useEffect(() => {
    dispatch(getAuctionById(auctionId));
  }, [auctionId]);

  useEffect(() => {
    if (selectedAuction) {
      setFormData({
        logo: selectedAuction.logo,
        name: selectedAuction.name,
        date: selectedAuction.date.split("T")[0],
        sportType: selectedAuction.sportType,
        pointPerTeam: selectedAuction.pointPerTeam,
        minimumBid: selectedAuction.minimumBid,
        bidIncrement: selectedAuction.bidIncrement,
        playersPerTeam: selectedAuction.playersPerTeam,
      });
    }
  }, [selectedAuction]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && name === "logo") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
      if (file) {
        setLogoPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    const res = await dispatch(updateAuction({ auctionId, formData: data }));
    if (res.payload.success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-medium">Edit Auction</h2>
      <div className="mt-6 xl:w-[70%]">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <img
                src={logoPreview || selectedAuction?.logo}
                alt="AuctionLogo"
                className="h-24 w-32 object-contain"
              />
            </div>
            {formFieldsData.map((field, i) => (
              <Formfields
                key={i}
                label={field.label}
                name={field.name}
                type={field.type}
                value={
                  field.type === "file" ? undefined : formData[field.name] ?? ""
                }
                onChange={handleChange}
                options={field.options}
                placeholder={field.placeholder}
                required={field.required}
              />
            ))}
          </div>

          <button
            type="submit"
            className="mt-4 px-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-800 transition"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Auction"}
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

export default EditAuction;
