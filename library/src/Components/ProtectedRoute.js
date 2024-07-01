import { message } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetLoggedInUserDetails } from "../services/users";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/usersSlice";
import { HideLoading, ShowLoading } from "../Redux/loadersSlice";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const validateUserToken = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetLoggedInUserDetails();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        localStorage.removeItem("token")
        navigate('/login')
        message.error(response.message);
      }
    } catch (error) {
      localStorage.removeItem("token")
      navigate("/login")
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      validateUserToken();
    }
  }, [navigate]);

  return (
    <div>
      {user && (
        <div className="p-1">
          <div className="header p-2 bg-primary flex justify-between rounded items-center">
            <h1
              className="text-2xl text-white font-bold cursor-pointer"
              onClick={() => navigate("/")}
            >
            LIBRARY
            </h1>

            <div className="flex items-center gap-1 bg-white p-1 rounded">
              <i className="ri-shield-user-line "></i>
              <span
                className="text-sm underline"
                onClick={() => navigate("/profile")}
              >
                {user.name.toUpperCase()}
              </span>
              <i
                className="ri-logout-box-r-line ml-2"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              ></i>
            </div>
          </div>

          <div className="content mt-1">{children}</div>
        </div>
      )}
    </div>
  );
}

export default ProtectedRoute;
