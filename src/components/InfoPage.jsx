import React from "react";
import fImage1 from "../assets/images/fImage1.avif"; // replace with your image
import TiltedCard from "../blocks/Components/TiltedCard/TiltedCard";
import ScrollReveal from "../blocks/TextAnimations/ScrollReveal/ScrollReveal";
import PillNav from "../blocks/Components/PillNav/PillNav";

const InfoPage = () => {
    return (
        <div className="w-full min-h-screen flex justify-center bg-gray-100 px-12 py-24">
            <div className="flex flex-col md:flex-row  items-center md:items-start w-full gap-16">
                {/* Left side: Text */}
                <div className="md:w-1/2 flex  justify-center">
                    <TiltedCard
                        imageSrc={fImage1}
                        altText="SOS Services"
                        imageHeight="35vw" // ✅ increased size
                        imageWidth="35vw"  // ✅ increased size
                        rotateAmplitude={12}
                        scaleOnHover={1.2}
                        showMobileWarning={false}
                        showTooltip={true}
                        displayOverlayContent={true}
                    />
                </div>
                <div className="md:w-1/2 flex flex-col space-y-8 px-15">
                    <div className="text-[4vw] font-bold text-gray-900 leading-tight">
                        <ScrollReveal
                            baseOpacity={0}
                            enableBlur={true}
                            baseRotation={5}
                            blurStrength={10}
                        >
                            Welcome To SOS
                        </ScrollReveal>
                    </div>

                    <div className="text-gray-700 leading-relaxed">
                        <ScrollReveal
                            textClassName="text-black text-[1vw] font-[anzo4] " // ✅ larger text
                            baseOpacity={0}
                            enableBlur={true}
                            baseRotation={5}
                            blurStrength={10}
                        >
                            SOS offers fast and reliable security and network solutions 
                            for residents and businesses in India. We are specialized in CCTV 
                            cameras & surveillance systems, Wifi services and Biometrics. 
                            We strive to provide timely, efficient services to our customers. From new installations
                             to large scale repair after any natural calamity, we have completed various projects.
                        </ScrollReveal>
                        <ScrollReveal
                            textClassName="text-black text-[1vw] font-[anzo4] " // ✅ larger text
                            baseOpacity={0}
                            enableBlur={true}
                            baseRotation={5}
                            blurStrength={10}
                        >
                            We are based in Odisha; a land which has witnessed many low
                            intensity to severe cyclones. Here we have experienced the massive
                            repairing drives. Aftermath a major storm or significant power
                            outage, we are here to help. Our service team acts swiftly, and
                            they restore your connectivity quickly. Our services are primarily
                            available in North Eastern & South Eastern India, mainly in Assam,
                            Odisha, Bihar and Jharkhand. However, we also offer our services
                            nationwide. We work on projects ranging in size from small to
                            large and deal with products such as different types of CCTV
                            installations, Biometrics Solutions, total Wireless LAN & WAN
                            solutions and more. We cater to every arena of life & business and
                            also offer website designing services.
                        </ScrollReveal>
                    </div>
                </div>

                {/* Right side: Image */}

            </div>
        </div>
    );
};

export default InfoPage;
