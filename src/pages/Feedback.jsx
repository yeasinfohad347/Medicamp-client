import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaStar } from "react-icons/fa";

const Feedback = () => {
  const axiosSecure = useAxiosSecure();
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axiosSecure
      .get(`/feedbacks`)
      .then((res) => setFeedbacks(res.data))
      .catch((err) => console.error("Failed to fetch feedbacks", err));
  }, [axiosSecure]);

  const renderStars = (count) => {
    return [...Array(count)].map((_, idx) => (
      <FaStar key={idx} className="text-yellow-500 inline-block mr-1" />
    ));
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="p-6 max-w-7xl mx-auto ">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-primary">
        My Camp Feedback & Ratings
      </h2>

      {feedbacks.length === 0 ? (
        <p className="text-center text-gray-500">No feedback submitted yet.</p>
      ) : (
        <Slider {...settings}>
          {feedbacks.map((item, index) => (
            <div key={index} className="px-4">
              <div
                className="bg-white rounded-xl shadow-md p-6 h-full min-h-[200px] flex flex-col justify-between
                  transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-50"
              >
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2 text-center">
                    {item.campName}
                  </h3>
                  <div className="flex justify-center mb-3">
                    {renderStars(item.rating)}
                  </div>
                  <p className="text-base italic text-gray-700 mb-4 text-center">
                    “{item.feedback}”
                  </p>
                </div>
                <p className="text-sm text-gray-500 text-right">
                  Submitted on:{" "}
                  <span className="font-medium">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Feedback;
