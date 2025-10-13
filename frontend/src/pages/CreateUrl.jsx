import React, { useState, useContext, useRef } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { UrlContext } from "../context/UrlContext";
import { QRCodeSVG } from "qrcode.react";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateUrl = () => {
  const { user } = useContext(AppContext);
  const { createUrl } = useContext(UrlContext);

  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [copied, setCopied] = useState(false);
  const qrRef = useRef(null);

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

  // 🆕 Function to download QR code as PNG
  const handleDownloadQR = () => {
    const svg = qrRef.current.querySelector("svg");
    const serializer = new XMLSerializer();
    const svgData = serializer.serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "qr-code.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    img.src = url;
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-sm border-0 p-4">
            <h2 className="text-center text-primary mb-4">
              Create Short URL
            </h2>

            <form onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label htmlFor="url" className="form-label fw-semibold">
                  Enter your URL
                </label>
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  required
                  className="form-control form-control-lg"
                />
              </div>

              <button
                type="submit"
                className="btn btn-success w-100 btn-lg fw-semibold"
              >
                Shorten URL
              </button>
            </form>

            {shortUrl && (
              <div className="mt-5">
                <h5 className="fw-semibold mb-3 text-center">
                  Your Shortened URL
                </h5>

                <div className="input-group mb-3">
                  <input
                    type="text"
                    readOnly
                    value={shortUrl.short_link}
                    className="form-control bg-light"
                  />
                  <button
                    onClick={handleCopy}
                    type="button"
                    className={`btn ${
                      copied ? "btn-success" : "btn-outline-secondary"
                    }`}
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>

                {/* <p className="text-muted text-center mb-4">
                  Total Clicks: <strong>{shortUrl.clicks || 0}</strong>
                </p> */}

                <div className="text-center" ref={qrRef}>
                  <h6 className="fw-semibold mb-2">QR Code</h6>
                  <QRCodeSVG value={shortUrl.short_link} size={150} />
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={handleDownloadQR}
                      className="btn btn-primary"
                    >
                      Download QR
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUrl;
