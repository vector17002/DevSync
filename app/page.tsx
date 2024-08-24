import { FeaturesSectionDemo } from "@/components/main/feature";
import { GlobeDemo } from "@/components/main/globe-middle";
import { HeroParallax } from "@/components/main/hero-parallax";
import Navbar from "@/components/Navbar";
import { products} from "@/lib/constants";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-8">
      <Navbar/>
      <HeroParallax products={products}/>
      <GlobeDemo/>
      <FeaturesSectionDemo />
    </main>
  );
}
