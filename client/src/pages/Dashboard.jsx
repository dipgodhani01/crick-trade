import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logoutUser() {
    dispatch(logout());
    navigate("/home");
  }

  //   email: "dipgodhani1845@gmail.com";
  //   image: "https://lh3.googleusercontent.com/a/ACg8ocKx1-sVxKQwA6mZTX_YUSqApbLY9HHaRTruVlHMRP9a78LpLQ=s96-c";
  //   name: "dip godhani";
  //   _id: "6879da62252ba2c9bc38fd99";
  return (
    <div>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
}

export default Dashboard;
