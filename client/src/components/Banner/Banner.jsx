import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Banner() {
  const navigate = useNavigate();
  const [currentBanner, setCurrentBanner] = useState(1);

  useEffect(() => {
    const slide = setInterval(() => {
      setCurrentBanner(currentBanner + 1);
    }, 5000);
    return () => {
      clearInterval(slide);
    };
  }, [currentBanner]);

  useEffect(() => {
    if (currentBanner > 4) {
      navigate('/menu')
    }
  }, [currentBanner, navigate]);

  return (
    <div className="banner">
      <div className="banner-container">
        <div className={`${currentBanner !== 1 ? "hide" : "banner-container-slide banner-first"}`}>
          <div className={`${currentBanner === 1 && 'fadeInDown'}`}>
          </div>
        </div>
        <div className={`${currentBanner !== 2 ? "hide" : "banner-container-slide banner-second"}`}>
          <div className={`${currentBanner === 2 && 'fadeInDown'}`}>
          </div>
        </div>

        <div className={`${currentBanner !== 3 ? "hide" : "banner-container-slide banner-third"}`}>
          <div className={`${currentBanner === 3 && 'fadeInDown'}`}>
          </div>
				</div>
				<div className={`${currentBanner !== 4 ? "hide" : "banner-container-slide banner-four"}`}>
          <div className={`${currentBanner === 4 && 'fadeInDown'}`}>
          </div>
        </div>
      </div>
    </div>
  );
}
