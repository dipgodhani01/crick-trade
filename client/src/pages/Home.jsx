import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("cricktrade-userinfo");
    const userData = JSON.parse(data);
    setUser(userData);
  }, []);

  const logout = () => {
    localStorage.removeItem("cricktrade-userinfo");
    navigate("/login");
  };

  return (
    <div className="p-6">
      <img src={user?.image} alt="user" />
      <h2 className="text-xl">Welcome,{user?.name}</h2>
      <p>Email: {user?.email}</p>
      <button className="text-red-500 mt-4 block" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Home;
