import CuttingProcess from "@/components/Homepage/CuttingProcess";
import EnquiryCTA from "@/components/Homepage/EnquiryCTA";
import HeroBanner from "@/components/Homepage/HeroBanner";
import MachineRange from "@/components/Homepage/MachineRange";
import MachinesInAction from "@/components/Homepage/MachinesInAction";
import ProductionSection from "@/components/Homepage/ProductionSection";
import WhyChooseVyoncut from "@/components/Homepage/WhyChooseVyoncut";

export default function Home() {
  return (
    <main id="main-content">
      <HeroBanner
        imageSrc="/images/vyoncut-banner.jpg"
        imageAlt="VYONCUT CNC cutting machine"
        heading="Built for steel."
        highlightedHeading="Built for your next step."
        description="Move your fabrication business forward with VYONCUT laser and plasma cutting machines."
        primaryLabel="Explore Our Machines"
        primaryHref="#products"
        secondaryLabel="Book a Live Demo"
        secondaryHref="/contact#enquiry"
      />

     
     <ProductionSection />

     <MachineRange />

     <WhyChooseVyoncut />

     <MachinesInAction />

     <CuttingProcess />
     
     <EnquiryCTA />
  
    </main>
  );
}