import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

function AdBanner() {
  const [showAd, setShowAd] = useState(true);
  const handleCloseAds = () => {
    setShowAd(false);
  };
  return (
    <div>
      {showAd && (
        <div style={{ position: "relative" }}>
          <button
            onClick={handleCloseAds}
            style={{ position: "absolute", top: 0, right: 0 }}
          >
            <CloseIcon />
          </button>
          <a
            href="https://mia.vn/cam-nang-du-lich/danh-sach-nha-hang-ngon-ha-noi-14088"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://mia.vn/media/uploads/blog-du-lich/danh-sach-nha-hang-ngon-ha-noi-01-1703062323.jpg"
              alt="Google Ad"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </a>
        </div>
      )}
    </div>
  );
}

export default AdBanner;
