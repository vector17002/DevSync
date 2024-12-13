import { BentoGridDemo } from "@/components/main/bentogrid";
import  Hero from "@/components/main/hero";
import Navbar from "@/components/main/homenav";
import Footer from "@/components/main/footer";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />
      <Hero/>
      <BentoGridDemo/>
      <Footer/>
    </main>
  );
}
