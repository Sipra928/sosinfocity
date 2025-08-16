import React from 'react'
import fImage1 from '../assets/images/fImage1.avif' // replace with your image
import TiltedCard from '../blocks/Components/TiltedCard/TiltedCard'
import ScrollReveal from '../blocks/TextAnimations/ScrollReveal/ScrollReveal'

const InfoPage = () => {
    return (
        <div className="w-full min-h-screen flex  justify-center bg-gray-100 px-8 py-16">
            <div className="flex flex-col md:flex-row items-center md:items-start max-w-6xl w-full gap-12">
                {/* Left side: Text */}
                <div className="md:w-1/2 flex flex-col space-y-6 -">
                    <div className="text-4xl font-bold text-gray-900">

                        <ScrollReveal
                            baseOpacity={0}
                            enableBlur={true}
                            baseRotation={5}
                            blurStrength={10}
                        >
                            Welcome To SOS
                        </ScrollReveal>
                    </div>
                    {/* <div  className="text-gray-700  leading-relaxed">
                        <ScrollReveal
                            textClassName='text-black text-[1vw]  font-light font-[anzo4] '
                            baseOpacity={0}
                            enableBlur={true}
                            baseRotation={5}
                            blurStrength={10}
                        >
                           SOS offers fast and reliable security and network solutions for residents and businesses in India. We are specialized in CCTV cameras & surveillance systems, Wifi services and Biometrics. We strive to provide timely, efficient services to our customers. From new installations to large scale repair after any natural calamity, we have completed various projects.
                        </ScrollReveal>
                        </div> */}
                    <div  className="text-gray-700 leading-relaxed">
                        <ScrollReveal
                            textClassName='text-black text-[1vw]   font-[anzo4] '
                            baseOpacity={0}
                            enableBlur={true}
                            baseRotation={5}
                            blurStrength={10}
                        >
                           We are based in Odisha; a land which has witnessed many low intensity to severe cyclones. Here we have experienced the massive repairing drives. Aftermath a major storm or significant power outage, we are here to help. Our service team acts swiftly, and they restore your connectivity quickly. Our services are available primarily available in North Eastern & South Eastern India, mainly in Assam, Odisha, Bihar and Jharkhand. However we do also offer our services nationwide. We work on projects ranging in size from small to large and deal with products such as different types of CCTV installations, Biometrics Solutions, total Wireless LAN & WAN solution and more. We cater to every arena of life & business and also offer website designing services.
                        </ScrollReveal>
                        </div>
                    
                
                </div>

                {/* Right side: Image */}
                <div className="md:w-1/2 flex justify-center">

                    <TiltedCard
                        imageSrc={fImage1}
                        altText="Kendrick Lamar - GNX Album Cover"
                        //   captionText="Kendrick Lamar - GNX"
                        //   containerHeight="500px"
                        //   containerWidth="300px"
                        imageHeight="500px"
                        imageWidth="500px"
                        rotateAmplitude={12}
                        scaleOnHover={1.2}
                        showMobileWarning={false}
                        showTooltip={true}
                        displayOverlayContent={true}
                        // overlayContent={
                        //     <p className="tilted-card-demo-text">
                        //         Kendrick Lamar - GNX
                        //     </p>
                        // }
                    />

                </div>
            </div>
        </div>
    )
}

export default InfoPage
