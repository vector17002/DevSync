import { BentoGridDemo } from "@/components/main/bentogrid";
import  Hero from "@/components/main/hero";
import Navbar from "@/components/main/homenav";
import Footer from "@/components/main/footer";
import { Testimonials } from "@/components/main/testimonials";
import { FAQ } from "@/components/main/faq";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />
      <Hero/>
      <BentoGridDemo/>
      <Testimonials/>
      <FAQ/>
      <Footer/>
    </main>
  );
}
