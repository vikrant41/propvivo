import CommunitySection from "../components/Home/CommunitySection";
import FeatureOffer from "../components/Home/FeatureOffer";
import HeroSection from "../components/Home/HeroSection";
import KeyBenefitMain from "../components/Home/KeyBenefitMain";
import Newsletter from "../components/Home/Newsletter";
import OnboardingSteps from "../components/Home/OnboardingSteps";
import OurhmServices from "../components/Home/OurhmServices";
import Testimonials from "../components/Home/Testimonials";
import ThreeCorePillars from "../components/Home/ThreeCorePillars";

const IndexPage = () => {
  return (
    <>
     <HeroSection />
     {/* <CorePillars /> */}
     {/* <RequestDoc /> */}
     <ThreeCorePillars />
     <OurhmServices />
     {/* <FeatureOffer /> */}
     <KeyBenefitMain />
     <Testimonials />
     {/* <OnboardingSteps /> */}
     <CommunitySection />
     {/* <Newsletter /> */}
    </>
  );
};

export default IndexPage;
