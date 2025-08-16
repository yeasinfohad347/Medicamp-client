import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../assets/banner-8.jpg";
import banner2 from "../assets/banner-6.webp";
import banner3 from "../assets/banner-5.jpg";
import { Link } from "react-router";

const bannerData = [
  {
    id: 1,
    title: "Over 2,000 Patients Treated",
    subtitle:
      "Our last medical camp provided free check-ups and medicines to remote villagers.",
    image: banner1,
  },
  {
    id: 2,
    title: "Volunteers Saving Lives",
    subtitle:
      "A success story from our emergency tent care unit in the flood-affected areas.",
    image: banner2,
  },
  {
    id: 3,
    title: "Child Health Camp Impact",
    subtitle:
      "Smiles, vaccinations, and nutrition support for over 500 children.",
    image: banner3,
  },
];

const Banner = () => {
  return (
    <section className="w-full">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
        dynamicHeight={false}
      >
        {bannerData.map((slide) => (
          <div
            key={slide.id}
            className="relative h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px]  w-full flex items-center"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Gradient / Fluid overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto flex flex-col justify-center h-full px-6 md:px-12">
              <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">
                {slide.title}
              </h2>
              <p className="text-white text-sm md:text-lg mb-6 max-w-xl">
                {slide.subtitle}
              </p>
              {/* Center the button */}
              <div className="flex justify-center">
                <Link to="available-camps">
                  <button className="btn btn-primary w-max text-center">
                    Explore Camp
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Banner;
