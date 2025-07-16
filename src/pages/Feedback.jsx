import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authentication/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaStar } from "react-icons/fa";

const ParticipantFeedback = () => {
  
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

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-primary">
        My Camp Feedback & Ratings
      </h2>

      {feedbacks.length === 0 ? (
        <p className="text-center">No feedback submitted yet.</p>
      ) : (
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={5000}
          emulateTouch
          swipeable
          className="px-4"
        >
          {feedbacks.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8 mx-2 text-left max-w-2xl mx-auto"
            >
              <h3 className="text-xl md:text-2xl font-semibold text-primary mb-2">
                {item.campName}
              </h3>
              <div className="mb-2">{renderStars(item.rating)}</div>
              <p className="text-base italic text-gray-700 dark:text-gray-200 mb-4">
                “{item.feedback}”
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Submitted on:{" "}
                <span className="font-medium">
                  {new Date(item.date).toLocaleDateString()}
                </span>
              </p>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default ParticipantFeedback;
