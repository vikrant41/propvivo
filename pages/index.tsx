import CommunitySection from "../components/Home/CommunitySection";
import CorePillars from "../components/Home/CorePillars";
import FeatureOffer from "../components/Home/FeatureOffer";
import HeroSection from "../components/Home/HeroSection";
import KeyBenefitMain from "../components/Home/KeyBenefitMain";
import Newsletter from "../components/Home/Newsletter";
import RequestDoc from "../components/Home/RequestDoc";
import Testimonials from "../components/Home/Testimonials";

const IndexPage = () => {
  return (
    <>
     <HeroSection />
     <CorePillars />
     <KeyBenefitMain />
     <RequestDoc />
     <FeatureOffer />
     <CommunitySection />
     <Testimonials />
     <Newsletter />
    </>
  );
};

export default IndexPage;
