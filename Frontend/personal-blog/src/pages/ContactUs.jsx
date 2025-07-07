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
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      {/* Contact Info */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
        {[{
          icon: <FaPhoneAlt />,
          title: "Phone",
          desc: "+8801747430447",
        }, {
          icon: <FaEnvelope />,
          title: "E-Mail",
          desc: "adnanrony19@gmail.com",
        }, {
          icon: <FaMapMarkerAlt />,
          title: "Location",
          desc: "Dhaka,Bangladesh",
        }].map((item, i) => (
          <div key={i} className="flex items-center bg-white shadow-sm rounded-xl p-6 border">
            <div className="bg-gradient-to-r from-[#4f49f3] to-[#af1ffe] p-4 rounded-full text-white mr-4">
              {item.icon}
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <form ref={formRef} onSubmit={sendEmail}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            Send Message
          </h2>
          <div className="w-12 h-2 bg-gradient-to-r from-[#4f49f3] to-[#af1ffe] rounded-full mb-8"></div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                className="w-full p-4 rounded-full border border-gray-200 focus:ring-2 focus:text-[#4f49f3] focus:outline-none"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email address"
                className="w-full p-4 rounded-full border border-gray-200 focus:ring-2 focus:text-[#4f49f3] focus:outline-none"
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="w-full p-4 rounded-full border border-gray-200 focus:ring-2 focus:text-[#4f49f3] focus:outline-none"
            />

            <textarea
              name="message"
              rows="5"
              required
              placeholder="Your message here..."
              className="w-full p-4 border border-[#af1ffe] rounded-2xl focus:ring-2 focus:text-[#4f49f3] focus:outline-none"
            ></textarea>

            <button
              type="submit"
              disabled={isSending}
              className="bg-gradient-to-r from-[#4f49f3] to-[#af1ffe] text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition"
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>

            {successMsg && (
              <p className={`text-sm mt-4 ${successMsg.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                {successMsg}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactSection;
