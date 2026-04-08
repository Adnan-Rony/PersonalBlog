import React, { useRef, useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import emailjs from "emailjs-com";

const ContactSection = () => {
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setSuccessMsg("");

    emailjs
      .sendForm(
        "service_gmde58s",
        "template_3vuktkz",
        formRef.current,
        "8toko7QrvhFcuPhJA"
      )
      .then(
        () => {
          setIsSending(false);
          setSuccessMsg("Message sent successfully!");
          formRef.current.reset();
        },
        () => {
          setIsSending(false);
          setSuccessMsg("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <section className="bg-[#0a0a12] py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Contact Me
          </h2>
          <p className="text-gray-400 text-sm">
            Let’s build something amazing together 🚀
          </p>
        </div>

        {/* CONTACT CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: <FaPhoneAlt />,
              title: "Phone",
              desc: "+8801747430447",
            },
            {
              icon: <FaEnvelope />,
              title: "Email",
              desc: "adnanrony19@gmail.com",
            },
            {
              icon: <FaMapMarkerAlt />,
              title: "Location",
              desc: "Dhaka, Bangladesh",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-[#11111c] border border-white/10 rounded-xl p-6 hover:border-orange-500/40 transition group"
            >
              <div className="p-4 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white text-lg group-hover:scale-110 transition">
                {item.icon}
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FORM */}
        <form
          ref={formRef}
          onSubmit={sendEmail}
          className="bg-[#11111c] border border-white/10 rounded-2xl p-6 md:p-10 shadow-xl"
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            Send Message
          </h3>

          <div className="space-y-6">

            {/* NAME + EMAIL */}
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                className="w-full bg-[#0f0f18] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
              />

              <input
                type="email"
                name="email"
                required
                placeholder="Email address"
                className="w-full bg-[#0f0f18] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
              />
            </div>

            {/* SUBJECT */}
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="w-full bg-[#0f0f18] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
            />

            {/* MESSAGE */}
            <textarea
              name="message"
              rows="5"
              required
              placeholder="Write your message..."
              className="w-full bg-[#0f0f18] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition resize-none"
            />

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isSending}
              className="w-full md:w-auto px-8 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 transition font-semibold text-white shadow-lg shadow-orange-500/20"
            >
              {isSending ? "Sending..." : "Send Message 🚀"}
            </button>

            {/* STATUS */}
            {successMsg && (
              <p
                className={`text-sm ${
                  successMsg.includes("successfully")
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {successMsg}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;