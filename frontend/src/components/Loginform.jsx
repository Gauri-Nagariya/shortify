// // import React, { useState, useContext } from "react";
// // import axios from "axios";
// // import { toast } from "react-toastify";
// // import { AppContext } from "../context/AppContext";

// // const Loginform = () => {
// //   const { setShowLogin, setUser } = useContext(AppContext);
// //   const backendUrl = import.meta.env.VITE_BACKEND_URL;

// //   const [User_name, setUser_name] = useState("");
// //   const [Email, setEmail] = useState("");
// //   const [Password, setPassword] = useState("");

// //   const onSubmitHandler = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const { data } = await axios.post(`${backendUrl}/api/login`, {
// //         User_name, // matches backend schema
// //         Email,
// //         Password,
// //       });

// //       if (data._id) { // backend returns the saved user object
// //         toast.success("Login successful!");
// //         setUser(data);
// //         localStorage.setItem("user", JSON.stringify(data));
// //         setShowLogin(false);
// //       } else {
// //         toast.error("Login failed!");
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       toast.error("Backend not reachable or something went wrong");
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center">
// //       <form
// //         onSubmit={onSubmitHandler}
// //         className="bg-white p-8 rounded-xl shadow-md w-[300px]"
// //       >
// //         <h2 className="text-xl font-bold text-center mb-4">Login</h2>

// //         <input
// //           type="text"
// //           value={User_name}
// //           onChange={(e) => setUser_name(e.target.value)}
// //           placeholder="Username"
// //           className="w-full border p-2 rounded mb-3"
// //           required
// //         />

// //         <input
// //           type="email"
// //           value={Email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           placeholder="Email"
// //           className="w-full border p-2 rounded mb-3"
// //           required
// //         />

// //         <input
// //           type="password"
// //           value={Password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           placeholder="Password"
// //           className="w-full border p-2 rounded mb-3"
// //           required
// //         />

// //         <button className="w-full bg-blue-600 text-white py-2 rounded">
// //           Login
// //         </button>

// //         <span
// //           onClick={() => setShowLogin(false)}
// //           className="absolute top-4 right-5 text-lg cursor-pointer"
// //         >
// //           ✕
// //         </span>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Loginform;


// import React, { useState, useContext } from "react";
// import { AppContext } from "../context/AppContext";

// const Loginform = () => {
//   const { setShowLogin, loginUser, signupUser } = useContext(AppContext);

//   const [state, setState] = useState("Login"); // "Login" or "SignUp"
//   const [User_name, setUser_name] = useState("");
//   const [Email, setEmail] = useState("");
//   const [Password, setPassword] = useState("");

//   const onSubmitHandler = (e) => {
//     e.preventDefault();
//     if (state === "Login") {
//       loginUser(Email, Password);
//     } else {
//       signupUser(User_name, Email, Password);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center">
//       <form onSubmit={onSubmitHandler} className="bg-white p-8 rounded-xl shadow-md w-[300px] relative">
//         <h2 className="text-xl font-bold text-center mb-4">{state}</h2>

//         {state !== "Login" && (
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={User_name}
//             onChange={(e) => setUser_name(e.target.value)}
//             className="w-full border p-2 rounded mb-3"
//             required
//           />
//         )}

//         <input
//           type="email"
//           placeholder="Email"
//           value={Email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border p-2 rounded mb-3"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={Password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full border p-2 rounded mb-3"
//           required
//         />

//         <button className="w-full bg-blue-600 text-white py-2 rounded">
//           {state === "Login" ? "Login" : "Sign Up"}
//         </button>

//         <p className="mt-3 text-center text-sm cursor-pointer text-blue-600"
//            onClick={() => setState(state === "Login" ? "SignUp" : "Login")}>
//           {state === "Login" ? "Don't have an account? Sign Up" : "Already have an account? Login"}
//         </p>

// <span
//           onClick={() => setShowLogin(false)}
//           className="absolute top-4 right-5 text-lg cursor-pointer"
//         >
//           ✕
//         </span>
//         {/* <span onClick={() => setShowLogin(false)} className="absolute top-4 right-4 cursor-pointer text-lg">✕</span> */}
        
//       </form>
//     </div>
//   );
// };

// export default Loginform;



import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

const Loginform = () => {
  const { setShowLogin, loginUser, registerUser } = useContext(AppContext);
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (state === "Login") {
      await loginUser(email, password);
    } else {
      await registerUser(name, email, password);
    }
  };

  return (
    <div>
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-10 rounded-xl text-slate-500 relative"
      >
        <h1 className="text-center text-2xl font-medium">{state}</h1>

        {state !== "Login" && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            className="w-full border p-2 rounded mb-3"
            required
          />
        )}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-3"
          required
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-3"
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded mb-3">
          {state === "Login" ? "Login" : "Sign Up"}
        </button>

        <p className="text-center text-sm">
          {state === "Login" ? (
            <>
              Don't have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setState("SignUp")}
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setState("Login")}
              >
                Login
              </span>
            </>
          )}
        </p>

        <span
          onClick={() => setShowLogin(false)}
          className="absolute top-3 right-3 cursor-pointer"
        >
          ✕
        </span>
      </form>
    </div>
  );
};

export default Loginform;
