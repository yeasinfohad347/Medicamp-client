import { useState } from "react";

const faqs = [
  {
    question: "How do I register for a medical camp?",
    answer:
      "Simply log in to your account, browse the Available Camps page, and click 'Join Camp' to register. After registration, you can complete payment and track your status from the dashboard.",
  },
  {
    question: "Is there any registration fee for camps?",
    answer:
      "Yes, each camp may have a different fee depending on the type of service provided. The camp fee is clearly listed on the camp details page.",
  },
  {
    question: "Can I cancel my registration?",
    answer:
      "You can cancel your registration before making a payment. After successful payment, cancellations are not allowed from the dashboard. Please contact the organizer if necessary.",
  },
  {
    question: "How can I give feedback after attending a camp?",
    answer:
      "Once you have completed payment and attended a camp, you’ll see a 'Feedback' button in your Registered Camps section. Click it to submit your feedback and rating.",
  },
  {
    question: "I’m an organizer. How do I add a new camp?",
    answer:
      "After logging in as an organizer, go to the dashboard and click on 'Add A Camp'. Fill out the form with details like name, location, date, and healthcare professionals involved.",
  },
  {
    question: "Can I edit camp information later?",
    answer:
      "Yes, organizers can update their listed camps anytime before the event date. Just go to 'My Camps' from the dashboard and click the edit icon.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className=" py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-arrow bg-base-100 shadow-md rounded-lg"
            >
              <input
                type="checkbox"
                className="peer"
                checked={openIndex === index}
                onChange={() => toggleFAQ(index)}
              />
              <div className="collapse-title text-lg font-semibold peer-checked:text-primary">
                {faq.question}
              </div>
              <div className="collapse-content text-gray-600">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
