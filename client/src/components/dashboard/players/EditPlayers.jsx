import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Formfields from "../../common/Formfields";
import { getPlayerById, updatePlayer } from "../../../redux/slice/playerSlice";
import { formFieldsData } from "../../../data/addPlayer";

function EditPlayers() {
  const [formData, setFormData] = useState({});
  const [logoPreview, setLogoPreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auctionId, playerId } = useParams();
  const { selectedPlayer, loading } = useSelector((state) => state.players);

  useEffect(() => {
    dispatch(getPlayerById({ auctionId, playerId }));
  }, [auctionId]);

  useEffect(() => {
    if (selectedPlayer) {
      setFormData({
        logo: selectedPlayer.logo,
        name: selectedPlayer.name,
        sportCategory: selectedPlayer.category,
        phone: selectedPlayer.phone,
        age: selectedPlayer.age,
        tshirtSize: selectedPlayer.ts_size,
        trouserSize: selectedPlayer.tr_size,
        jerseyName: selectedPlayer.ts_name,
        jerseyNumber: selectedPlayer.ts_number,
      });
    }
  }, [selectedPlayer]);

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

    if (selectedPlayer) {
      data.append("auctionId", selectedPlayer.auction);
      data.append("playerId", selectedPlayer._id);
    }

    const res = await dispatch(updatePlayer(data));
    if (res.payload.success) {
      navigate(-1);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-medium">Edit Player</h2>
      <div className="mt-6 xl:w-[70%]">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <img
                src={logoPreview || selectedPlayer?.logo}
                alt="Player Photo"
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
            {loading ? "Updating..." : "Update Player"}
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

export default EditPlayers;
