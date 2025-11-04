import { createContext, useContext } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export const UrlContext = createContext();

const UrlContextProvider = ({ children }) => {
  const { token, backendUrl, user } = useContext(AppContext);

  // ✅ Create short URL function
  const createUrl = async (urlData) => {
    if (!user) {
      toast.error("Please login before creating a short URL!");
      return;
    }

    try {
      
      console.log("📤 Sending request to:", `${backendUrl}/api/create`);
      console.log("📦 Request body:", urlData);

      const { data } = await axios.post(`${backendUrl}/api/create`, urlData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Backend response:", data);

      if (data.short_link) {
        toast.success("Short URL created successfully!");
        return data;
      } else {
        toast.error("Failed to create short URL");
        return null;
      }

    } catch (error) {
      console.error("❌ Create URL error:", error);

      // More detailed feedback
      const backendMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message;

      toast.error(`Failed to create short URL: ${backendMsg}`);
      return null;
    }
  };

  return (
    <UrlContext.Provider value={{ createUrl }}>
      {children}
    </UrlContext.Provider>
  );
};

export default UrlContextProvider;
