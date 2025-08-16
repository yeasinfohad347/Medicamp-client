import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send email to backend or email service
    console.log("Subscribed email:", email);
    setSubmitted(true);
    setEmail("");
  };

//   return (
//     <section className="bg-primary/20 py-16 px-4 md:px-8 text-center">
//       <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
//         Stay Updated!
//       </h2>
//       <p className=" mb-8 max-w-2xl mx-auto">
//         Subscribe to our newsletter to get the latest updates about upcoming medical camps,
//         health tips, and community programs.
//       </p>

//       {submitted ? (
//         <p className="text-green-600 font-semibold">Thank you for subscribing!</p>
//       ) : (
//         <form
//           onSubmit={handleSubmit}
//           className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto"
//         >
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="px-4 py-3 rounded-lg border border-primary focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-auto flex-1"
//           />
//           <button
//             type="submit"
//             className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition"
//           >
//             Subscribe <FaPaperPlane />
//           </button>
//         </form>
//       )}
//     </section>
//   );
// };

// export default Newsletter;
