import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { UrlContext } from "../context/UrlContext";
import { QRCodeSVG } from "qrcode.react";

const CreateUrl = () => {
  const { user } = useContext(AppContext);
  const { createUrl } = useContext(UrlContext);

  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null); // store full object
  const [copied, setCopied] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login before creating a short URL!");
      return;
    }

    try {
      const res = await createUrl({ full_url: url });
      if (res) setShortUrl(res);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create short URL");
    }
  };

  const handleCopy = () => {
    if (shortUrl?.short_link) {
      navigator.clipboard.writeText(shortUrl.short_link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="space-y-4">
      <div>
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Enter your URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        Shorten URL
      </button>

    {shortUrl && (
  <div className="mt-6">
    <h2 className="text-lg font-semibold mb-2">Your shortened URL:</h2>
    <div className="flex items-center mb-2">
      <input
        type="text"
        readOnly
        value={shortUrl.short_link}
        className="flex-1 p-2 border border-gray-300 rounded-l-md bg-gray-50"
      />
      <button
        onClick={handleCopy}
        type="button"
        className={`px-4 py-2 rounded-r-md transition-colors duration-200 ${
          copied ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>

    <p>Clicks: {shortUrl.clicks || 0}</p>

    <div className="mt-4">
      <h3 className="text-md font-medium mb-2">QR Code:</h3>
      <QRCodeSVG value={shortUrl.short_link} size={150} />
    </div>
  </div>
)}

    </form>
  );
};

export default CreateUrl;
