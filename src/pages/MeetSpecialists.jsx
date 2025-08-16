import React from "react";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import doc1 from "../assets/doctor-7.jpg";
import doc2 from "../assets/doctor-8.jpg";
import doc3 from "../assets/doctor-9.webp";

const specialists = [
  {
    name: "Dr. Jane Doe",
    role: "Cardiologist",
    description:
      "Expert in heart health and preventive cardiology with 15 years of experience.",
    image: doc1,
    socials: { linkedin: "#", twitter: "#", facebook: "#" },
  },
  {
    name: "Dr. John Smith",
    role: "Neurologist",
    description:
      "Specializes in neurological disorders and patient-centered treatments.",
    image: doc2,
    socials: { linkedin: "#", twitter: "#", facebook: "#" },
  },
  {
    name: "Dr. Emily Clark",
    role: "Pediatrician",
    description:
      "Passionate about child healthcare and developmental guidance for families.",
    image: doc3,
    socials: { linkedin: "#", twitter: "#", facebook: "#" },
  },
];

const MeetSpecialists = () => {
  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
        Meet Our Specialists
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {specialists.map((spec, idx) => (
          <div
            key={idx}
            className="bg-base-100 rounded-xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-2 hover:scale-105 overflow-hidden relative"
          >
            <img
              src={spec.image}
              alt={spec.name}
              className="w-40 h-40 rounded-full mx-auto mt-6 object-cover border-4 border-primary"
            />
            <div className="text-center p-6">
              <h3 className="text-lg font-semibold mb-1">{spec.name}</h3>
              <p className="text-gray-500 text-sm mb-2">{spec.role}</p>
              <p className="text-gray-600 text-sm mb-4">{spec.description}</p>

              {/* Social Links overlay on hover */}
              <div className="flex justify-center gap-4  transition-opacity duration-300">
                <a
                  href={spec.socials.linkedin}
                  className="text-blue-600 hover:text-blue-800 text-xl"
                >
                  <FaLinkedin />
                </a>
                <a
                  href={spec.socials.twitter}
                  className="text-blue-400 hover:text-blue-600 text-xl"
                >
                  <FaTwitter />
                </a>
                <a
                  href={spec.socials.facebook}
                  className="text-blue-700 hover:text-blue-900 text-xl"
                >
                  <FaFacebook />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetSpecialists;
