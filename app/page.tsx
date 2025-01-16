import About from "@/components/main/About";
import Hero from "@/components/main/Hero";
import { InfiniteMovingCards } from "@/components/ui/infinity-carousel";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <InfiniteMovingCards items={Images} direction="right" speed="slow" />
      <InfiniteMovingCards items={Images} direction="left" speed="slow" />
      <About />
    </div>
  );
};

const Images = [
  {
    src: "/obr1.png",
    alt: "hotelova izba 1",
  },
  {
    src: "/obr7.png",
    alt: "hotelova izba2",
  },
  {
    src: "/obr3.png",
    alt: "hotelova izba3",
  },
  {
    src: "/obr5.png",
    alt: "hotelova izba4",
  },
  {
    src: "/obr9.png",
    alt: "hotelova izba5",
  },
  {
    src: "/obr10.png",
    alt: "hotelova izba6",
  },
];

export default HomePage;
