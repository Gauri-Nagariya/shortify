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
      const { data } = await axios.post(`${backendUrl}/api/create`, urlData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.short_link) {
        // this matches what your backend sends
        toast.success("Short URL created successfully!");
        console.log("Created Short URL:", data);
        return data; // ✅ return the URL so frontend can display it
      } else {
        toast.error("Failed to create short URL");
        return null;
      }
      
   } catch (error) {
  console.error(error);
  toast.error("Something went wrong while creating the short URL");
  return null;
}
  };

  return (
    <UrlContext.Provider value={{ createUrl }}>{children}</UrlContext.Provider>
  );
};

// const getClicks = async (shortCode) => {
//   try {
//     const { data } = await axios.get(`${backendUrl}/api/${shortCode}`);
//     return data.clicks; // your backend should return { clicks: X }
//   } catch (err) {
//     console.error(err);
//     return 0;
//   }
// };


export default UrlContextProvider;
