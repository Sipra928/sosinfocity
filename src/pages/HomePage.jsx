import React from "react";
import GlobePage from "../components/GlobePage";
import logo from "../assets/images/logo.jpg";
import InfoPage from "../components/InfoPage";
import CctvCamera from "../components/CctvCamera";
import Overview from "../components/overviewsection/Overview";
import Navbar from "../components/Navbar";
import Curve from "../blocks/curve";
import { AnimatePresence } from "framer-motion";
import PillNav from "../blocks/Components/PillNav/PillNav";

const HomePage = () => {
  return (

    <Curve>
    <div className="relative overflow-hidden">
     


      
      {/* 🌍 Top Globe section */}
        <Navbar/>
      <GlobePage />

     

      {/* 📝 Info Section - Tight layout */}
      <div className="relative -mt-1"> {/* Pull up to close gap */}
        <InfoPage />
      </div>

      
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
       <Overview
       img ="src/assets/images/wifi.png"
       desc="Make your office free from the tangle of wired networks
       and make some space for innovation. Wireless networks,
       otherwise known as Wi-Fi are fast becoming a basic need, just like water,
       electricity and education. SOS provides unmatched service in its area on
       Wireless LAN and WAN..."
       heading= "Networks"
       />
    
     
    </div>
             </Curve>

  );
};

export default HomePage;