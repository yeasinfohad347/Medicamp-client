import React from "react";
import aboutImg from "../assets/banner-7.jpg"; // Replace with your image
import doc1 from "../assets/doctor-7.jpg"
import doc2 from "../assets/doctor-8.jpg"
import doc3 from "../assets/doctor-9.webp"
import { FaUsers, FaHandsHelping, FaLightbulb } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 space-y-16">
      {/* Header Section */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          About Us
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
          MEDICAMP is dedicated to organizing medical camps for communities in need.
          Our mission is to provide accessible healthcare services and create a
          positive impact through collaboration, innovation, and care.
        </p>
      </section>

      {/* Image + Mission Section */}
      <section className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <img
            src={aboutImg}
            alt="About Us"
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl font-semibold text-primary">Our Mission</h2>
          <p className="text-gray-700 text-base md:text-lg">
            Our goal is to ensure healthcare reaches everyone, especially in
            underserved areas. We organize camps, provide essential medical
            support, and educate communities about preventive healthcare.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-base-100 rounded-lg shadow-md hover:shadow-xl transition">
              <FaUsers className="text-3xl text-primary mx-auto mb-2" />
              <h3 className="font-semibold">Community</h3>
              <p className="text-gray-500 text-sm">
                Building strong and healthy communities.
              </p>
            </div>
            <div className="text-center p-4 bg-base-100 rounded-lg shadow-md hover:shadow-xl transition">
              <FaHandsHelping className="text-3xl text-primary mx-auto mb-2" />
              <h3 className="font-semibold">Care</h3>
              <p className="text-gray-500 text-sm">
                Compassionate medical services for everyone.
              </p>
            </div>
            <div className="text-center p-4 bg-base-100 rounded-lg shadow-md hover:shadow-xl transition">
              <FaLightbulb className="text-3xl text-primary mx-auto mb-2" />
              <h3 className="font-semibold">Innovation</h3>
              <p className="text-gray-500 text-sm">
                Creative solutions for effective healthcare delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
  <h2 className="text-3xl md:text-4xl font-semibold text-primary text-center mb-12">
    Meet Our Team
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {/* Team Member 1 */}
    <div className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
      <img
        src={doc1}
        alt="Dr. Jane Doe"
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-primary"
      />
      <h3 className="text-lg font-semibold text-center mb-1">Dr. Jane Doe</h3>
      <p className="text-sm text-gray-500 text-center">Chief Medical Officer</p>
    </div>

    {/* Team Member 2 */}
    <div className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
      <img
        src={doc2}
        alt="John Smith"
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-primary"
      />
      <h3 className="text-lg font-semibold text-center mb-1">John Smith</h3>
      <p className="text-sm text-gray-500 text-center">Operations Manager</p>
    </div>

    {/* Team Member 3 */}
    <div className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
      <img
        src={doc3}
        alt="Emily Clark"
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-primary"
      />
      <h3 className="text-lg font-semibold text-center mb-1">Emily Clark</h3>
      <p className="text-sm text-gray-500 text-center">Community Coordinator</p>
    </div>
  </div>
</section>

    </div>
  );
};

export default AboutUs;
