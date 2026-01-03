import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [credit, setCredit] = useState(0);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  // ✅ Axios setup (TOKEN based auth)
  axios.defaults.baseURL = backendUrl;
  axios.defaults.headers.common["token"] = token || "";

  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get("/api/user/credits");
      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post("/api/image/generate-image", { prompt });

      if (data.success) {
        loadCreditsData();
        return data.resultImage;
      } else {
        toast.error(data.message);
        loadCreditsData();
        if (data.creditBalance === 0) navigate("/buy");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  useEffect(() => {
    if (token) loadCreditsData();
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        showLogin,
        setShowLogin,
        credit,
        setCredit,
        loadCreditsData,
        backendUrl,
        generateImage,
        logout,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
