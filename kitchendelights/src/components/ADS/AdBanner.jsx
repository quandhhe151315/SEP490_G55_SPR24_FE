import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { getAdsStatus } from "../../services/Advertisement";
import { Button, Carousel, Flex } from "antd";

const contentStyle = {
  height: "160px",
  color: "#fff",
  witdh: "100%",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
function AdBanner() {
  const [showAd, setShowAd] = useState(true);
  const [ADS, setADS] = useState([]);
  const [loading, setloading] = useState(false);
  const handleCloseAds = () => {
    setShowAd(false);
    debugger;
  };
  useEffect(() => {
    getADS();
  }, [loading]);
  const getADS = async () => {
    try {
      const response = await getAdsStatus();
      if (response.status === 200) {
        setADS(response.data);
      } else {
        console.error("không thể lấy dữ liệu về ads");
      }
    } catch (error) {
      console.error("lỗi khi tải danh sách ads", error);
    }
  };
  return (
    <div>
      {showAd && ADS.length > 0 && (
        <div>
          <Flex justify="end">
            <Button size="small" onClick={handleCloseAds}>
              <CloseIcon />
            </Button>
          </Flex>

          <div style={{ marginTop: "-13px" }}>
            <Carousel autoplay>
              {ADS.map((item) => (
                <div>
                  <h3 style={contentStyle}>
                    <a
                      href={item.advertisementLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={item.advertisementImage}
                        alt="Google Ad"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    </a>
                  </h3>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdBanner;
