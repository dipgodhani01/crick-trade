import { useEffect, useState } from "react";
import { getProfile, logoutUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUser(res.data.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  async function logout() {
    try {
      const res = await logoutUser();
      if (res.status) {
        navigate("login");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl">Welcome, {user?.name}</h2>
      <p>Email: {user?.email}</p>
      <button className="text-red-500 mt-4 block" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Home;
