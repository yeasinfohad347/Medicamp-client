import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../assets/banner-4.jpg"
import banner2 from "../assets/banner-6.webp"
import banner3 from "../assets/banner-5.jpg"

const bannerData = [
  {
    id: 1,
    title: "Over 2,000 Patients Treated",
    subtitle: "Our last medical camp provided free check-ups and medicines to remote villagers.",
    image: banner1
  },
  {
    id: 2,
    title: "Volunteers Saving Lives",
    subtitle: "A success story from our emergency tent care unit in the flood-affected areas.",
    image: banner2
  },
  {
    id: 3,
    title: "Child Health Camp Impact",
    subtitle: "Smiles, vaccinations, and nutrition support for over 500 children.",
    image: banner3
  },
];

const Banner = () => {
  return (
    <section className="w-full max-w-7xl mx-auto rounded-lg overflow-hidden shadow-lg mt-4">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
        dynamicHeight={false}
      >
        {bannerData.map((slide) => (
          <div key={slide.id} className="relative">
            <img src={slide.image} alt={slide.title} className="h-[600px] w-full object-cover" />
            <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-center items-center text-center p-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{slide.title}</h2>
              <p className="text-white text-sm md:text-base max-w-xl">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Banner;
