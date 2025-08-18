import React from "react";
import GlobePage from "../components/GlobePage";
import fImage2 from "../assets/images/fImage2.avif";
import InfoPage from "../components/InfoPage";
import CctvCamera from "../components/CctvCamera";
import Overview from "../components/overviewsection/Overview";

const HomePage = () => {
  return (
    <div className="relative overflow-hidden">
      {/* 🌍 Top Globe section */}
      <GlobePage />

     

      {/* 📝 Info Section - Tight layout */}
      <div className="relative -mt-1"> {/* Pull up to close gap */}
        <InfoPage />
      </div>

      {/* CCTV Camera Sections - Seamless transitions */}
      {/* <div className="space-y-0">
        <CctvCamera 
          title="OUR SERVICES"
          paragraph="Check out our amazing services below."
          bgImage="src/assets/images/cctv.jpg"
          buttonText="Explore"
          buttonOnClick={() => console.log("Exploring services")}
          startPosition="top bottom" // Start when entering viewport
          endPosition="top 30%"     // End earlier for overlap
          scrubSpeed={1.5}          // Smoother animation
          isFirst={true}           // First in sequence
        />
        <CctvCamera 
          title="WIRELESS"
          paragraph="Advanced wireless solutions for modern needs"
          bgImage="src/assets/images/wireless.jpg"
          buttonText="Discover"
          buttonOnClick={() => console.log("Discover wireless")}
          startPosition="top 70%"   // Starts before first ends
          endPosition="top 30%"     // Overlaps with next
          scrubSpeed={1.5}
        />
        <CctvCamera 
          title="TECHNOLOGY"
          paragraph="Cutting-edge technology solutions"
          bgImage="src/assets/images/tech.jpg"
          buttonText="Learn More"
          buttonOnClick={() => console.log("Learn more")}
          startPosition="top 70%"
          endPosition="top 30%"
          scrubSpeed={1.5}
        />
        <CctvCamera 
          title="CONTACT US"
          paragraph="Get in touch for custom solutions"
          bgImage="src/assets/images/contact.jpg"
          startPosition="top 70%"
          scrubSpeed={1.5}
          isLast={true}            // Special handling for last item
        />
      </div> */}
       <Overview
       img ="src/assets/images/cctv.jpg"
       desc="SOS provides a variety of high top quality CCTV and tracking solutions to secure your office buildings, homes, buildings, institutions 
       and more. Our CCTV tracking system provides most optimum solution for indoor as well as outdoor vigilance...."
       heading= "CCTV Cameras"
       />
       <Overview
       img ="src/assets/images/biomatric.jpg"
       desc="With over 7 years in this service, SOS is an unmatched leader in analyzing,
        optimizing and configuring several biometrics verification solutions for finance, Govt., 
       telecoms and retail store sectors. SOS is devoted in biometrics consulting to several numbers of companies with their speech..."
       heading= "Biometrics"
       />

    </div>
  );
};

export default HomePage;