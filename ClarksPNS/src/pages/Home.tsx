import React from "react";
import MobileHero from "@/components/site/MobileHero";
import { DesktopHero } from "@/components/site/DesktopHero";


// Example images for MobileHero; replace with your actual paths
import phone from "@/assets/clarkshero.png";

import phone640 from "@/assets/phone-640.jpg";
import phone960 from "@/assets/phone-960.jpg";
import phone1440 from "@/assets/phone-1440.jpg";



export default function Home() {
  return (
    <main className="w-full overflow-x-clip">
      {/* Mobile hero */}
      <MobileHero
        title="Get 1,500 Points Free"
        subtitle="When you join the Clarks Rewards app"
        ctaLabel="Join Rewards"
        ctaHref="/rewards"
        img={{ src640: phone640, src960: phone960, src1440: phone1440, alt: "Rewards App preview" }}
      />


      {/* Desktop hero */}
      <DesktopHero />


      {/* Rest of homepage sections go here */}
      {/* <RewardsPromo /> */}
      {/* <LocationsPreview /> */}
      {/* <Footer /> */}
    </main>
  );
}