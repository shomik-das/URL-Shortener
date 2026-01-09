import HeroSection from "@/components/home/hero-section";
import FeaturesSection from "@/components/home/features-section";
import { HeroHeader } from "@/components/common/navbar";
import FooterSection from "@/components/common/footer";

export default function Page() {
  return(
    <>
      <HeroHeader />
      <HeroSection />
      <FeaturesSection />
      <FooterSection />
    </>
  )
}