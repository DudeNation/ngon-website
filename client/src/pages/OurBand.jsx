import React from "react";
import Header from "../components/Header/Header";
import image1 from "../assets/images/banner_5.jpg";
import image2 from "../assets/images/10.jpg";
import image3 from "../assets/images/2.jpg";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function OurBand() {
	const navigate = useNavigate();

  return (
    <div className="our-brand">
      <Header />
      <div className="our-brand-container">
        {/* image 1 */}
        <div className="our-brand-container-first our-brand-common">
          <div className="our-brand-common-img1">
            <img src={image1} alt="our-brand-img-1" />
          </div>
          <div className="our-brand-common-text1">
            <h1>Vietnam Delight</h1>
            <p>
              Located in the heart of Saigon, Vietnam Delight Restaurant offers
              an immersive experience into the vibrant flavors of Vietnamese
              cuisine. Step into our inviting atmosphere and embark on a
              culinary journey that will transport you to the bustling streets
              and the serene landscapes of the countryside.
            </p>
          </div>
        </div>
        {/* image 2 */}
        <div className="our-brand-container-second our-brand-common">
          <div className="our-brand-common-img2">
            <img src={image2} alt="our-brand-img-2" />
          </div>
          <div className="our-brand-common-text2">
            <h1>High-quality ingredients</h1>
            <p>
              We take pride in sourcing only the freshest and highest quality
              ingredients from locally sourced herbs and vegetables to premium
              cuts of meat and seafood, Each ingredient is carefully selected to
              ensure that every dish served at Vietnam Delight is a true
              culinary delight.
            </p>
          </div>
        </div>
        {/* image3 */}
        <div className="our-brand-container-third our-brand-common">
          <div className="our-brand-common-img3">
            <img src={image3} alt="our-brand-img-3" />
          </div>
          <div className="our-brand-common-text3">
            <div className="our-brand-location">
              <h1>Location</h1>
              <a
                href="https://maps.app.goo.gl/acqP2BGRgbf49vky6"
                target="_blank"
                rel="noreferrer"
              >
                123 Nguyen Hue Street, District 1, HCMC
              </a>
              <a
                href="https://maps.app.goo.gl/ZUuPi9TD7Lgm9GwW7"
                target="_blank"
                rel="noreferrer"
              >
                456 Le Loi Boulevard, District 3, HCMC
              </a>
              <a
                href="https://maps.app.goo.gl/AtW4Aa89Npkcad588"
                target="_blank"
                rel="noreferrer"
              >
                789 Pham Ngu Lao Street, District 5, HCMC
              </a>
            </div>
            <div className="our-brand-open">
              <h1>Open hours</h1>
              <p>All branches: Everyday 11am to 21pm</p>
              <p>Delivery: Everyday 11am to 23pm</p>
            </div>
            <div className="our-brand-btn">
              <Box mb={1}>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  sx={{
                    width: "80%",
                    fontWeight: "500",
                    textTransform: "initial",
									}}
									onClick={() => navigate("/menu")}
                >
                  Go to Menu
                </Button>
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  size="large"
                  color="primary"
                  sx={{
                    width: "80%",
                    fontWeight: "500",
                    textTransform: "initial",
									}}
									onClick={() => navigate("/my-page/sign-up")}
                >
                  Login or Sign up
                </Button>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
