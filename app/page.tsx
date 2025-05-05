import About from "@/components/main/About";
import Hero from "@/components/main/Hero";
import { InfiniteMovingCards } from "@/components/ui/infinity-carousel";
import { Room } from "@/database";

const HomePage = async () => {
  const Images =
    (
      await Room.findAll({
        attributes: ["imageUrl", "description"],
        where: { active: true }, // ← iba aktívne izby
      })
    )
      .map((i) => ({ src: i.imageUrl || "", alt: i.description || "" }))
      .concat(ImagesPlaceholder) || ImagesPlaceholder;
  return (
    <div>
      <Hero />
      <InfiniteMovingCards items={Images} direction="right" speed="slow" />
      <InfiniteMovingCards items={Images} direction="left" speed="slow" />
      <About />
    </div>
  );
};

const ImagesPlaceholder = [
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
