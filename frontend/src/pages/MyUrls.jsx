// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "../context/AppContext";
// import { UrlContext } from "../context/UrlContext";
// import { QRCodeSVG } from "qrcode.react";
// import { toast } from "react-toastify";

// const MyUrls = () => {
//   const { user } = useContext(AppContext);
//   const { getUserUrls } = useContext(UrlContext);
//   const [urls, setUrls] = useState([]);

//   useEffect(() => {
//     if (user) {
//       (async () => {
//         const res = await getUserUrls(user.id);
//         setUrls(res || []);
//       })();
//     }
//   }, [user]);

//   const handleCopy = (link) => {
//     navigator.clipboard.writeText(link);
//     toast.success("Copied!");
//   };

//   const handleDownloadQR = (link, id) => {
//     const svg = document.getElementById(`qr-${id}`).querySelector("svg");
//     if (!svg) return;
//     const serializer = new XMLSerializer();
//     const svgData = serializer.serializeToString(svg);
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
//     const img = new Image();
//     const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
//     const url = URL.createObjectURL(blob);

//     img.onload = () => {
//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx.drawImage(img, 0, 0);
//       URL.revokeObjectURL(url);
//       const pngUrl = canvas.toDataURL("image/png");
//       const linkEl = document.createElement("a");
//       linkEl.href = pngUrl;
//       linkEl.download = "qr-code.png";
//       linkEl.click();
//     };
//     img.src = url;
//   };

//   if (!user)
//     return (
//       <div className="text-center mt-10 text-gray-600">
//         Please log in to view your shortened URLs.
//       </div>
//     );

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">My Shortened URLs</h1>
//       {urls.length === 0 ? (
//         <p className="text-gray-600">No URLs found yet.</p>
//       ) : (
//         <div className="space-y-4">
//           {urls.map((u) => (
//             <div key={u.id || u._id} className="border rounded-lg p-4 bg-white shadow-sm">
//               <div className="flex justify-between items-center">
//                 <a
//                   href={u.short_link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 font-medium hover:underline"
//                 >
//                   {u.short_link}
//                 </a>
//                 <button
//                   onClick={() => handleCopy(u.short_link)}
//                   className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm"
//                 >
//                   Copy
//                 </button>
//               </div>
//               <p className="text-sm text-gray-600 mt-1">
//                 Original:{" "}
//                 <a
//                   href={u.full_url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 hover:underline"
//                 >
//                   {u.full_url}
//                 </a>
//               </p>
//               <p className="text-sm mt-1">Clicks: {u.clicks || 0}</p>

//               <div className="mt-3 flex items-center space-x-4">
//                 <div id={`qr-${u.id || u._id}`}>
//                   <QRCodeSVG value={u.short_link} size={100} />
//                 </div>
//                 <button
//                   onClick={() => handleDownloadQR(u.short_link, u.id || u._id)}
//                   className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                 >
//                   Download QR
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyUrls;
