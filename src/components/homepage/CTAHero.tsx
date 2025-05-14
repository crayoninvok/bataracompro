"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Check,
  AlertCircle,
  Truck,
  Calendar
} from "lucide-react";

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}
interface StatusState {
  type: "success" | "error" | null;
  message: string;
}

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusState>({
    type: null,
    message: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100");
            entry.target.classList.remove("opacity-0", "translate-y-6");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".reveal-cta");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `
            Name: ${formData.name}
            Company: ${formData.company}
            Email: ${formData.email}
            Phone: ${formData.phone}
            
            Message:
            ${formData.message}
          `,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message:
            "Your message has been successfully sent. We will contact you soon.",
        });
        // Reset form
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          message:
            data.message ||
            "An error occurred while sending the message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus({
        type: "error",
        message: "An error occurred on the system. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 lg:px-24 bg-black/80 backdrop-blur-lg text-white relative overflow-hidden border-y border-gray-800">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#E85C23]/10 to-transparent rounded-full -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#1FBFB8]/10 to-transparent rounded-full -ml-48 -mb-48"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left Side: Contact Info */}
          <div className="reveal-cta opacity-0 translate-y-6 transition-all duration-700">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Need reliable mining & hauling solutions?
            </h2>
            <p className="text-base text-gray-300 mb-6">
              PT. Batara Dharma Persada is ready to be your trusted partner for all your mining transportation needs. Contact us for consultation and tailored solutions.
            </p>

            <div className="space-y-5">
              <div className="flex items-center">
                <div className="bg-[#E85C23]/10 p-2.5 rounded-lg mr-3">
                  <Phone className="w-5 h-5 text-[#E85C23]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Phone</p>
                  <p className="font-medium text-gray-200">+62 21 1234 5678</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-[#1FBFB8]/10 p-2.5 rounded-lg mr-3">
                  <Mail className="w-5 h-5 text-[#1FBFB8]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="font-medium text-gray-200">info@bataramining.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#E85C23]/10 p-2.5 rounded-lg mr-3 mt-0.5">
                  <MapPin className="w-5 h-5 text-[#E85C23]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Head Office</p>
                  <p className="font-medium text-gray-200 text-sm">
                    Jl. Agung Sedayu City Boulevard Utara No.58, Cakung Bar.,
                    Kec. Cakung, East Jakarta, Special Capital Region of Jakarta
                    13910
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-[#1FBFB8]/10 p-2.5 rounded-lg mr-3">
                  <Truck className="w-5 h-5 text-[#1FBFB8]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Operational Area</p>
                  <p className="font-medium text-gray-200">Tabang - East Kalimantan</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-[#E85C23]/10 p-2.5 rounded-lg mr-3">
                  <Calendar className="w-5 h-5 text-[#E85C23]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Business Hours</p>
                  <p className="font-medium text-gray-200">Monday - Friday: 8:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="reveal-cta opacity-0 translate-y-6 transition-all duration-700 delay-200">
            <div className="bg-gray-900/80 p-6 rounded-lg shadow-lg border border-gray-800">
              <h3 className="text-xl font-bold mb-5 text-white">Contact Us</h3>

              {status.type === "success" ? (
                <div className="bg-green-900/30 border border-green-700/50 rounded p-3 mb-5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Check className="h-4 w-4 text-green-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-300">
                        {status.message}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              {status.type === "error" ? (
                <div className="bg-red-900/30 border border-red-700/50 rounded p-3 mb-5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-300">
                        {status.message}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-medium mb-1.5 text-gray-300"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-gray-700 rounded bg-gray-800/50 text-gray-200 focus:ring-1 focus:ring-[#1FBFB8] focus:border-[#1FBFB8] text-sm"
                    placeholder="Your full name"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-xs font-medium mb-1.5 text-gray-300"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-gray-700 rounded bg-gray-800/50 text-gray-200 focus:ring-1 focus:ring-[#1FBFB8] focus:border-[#1FBFB8] text-sm"
                    placeholder="Your company name"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-medium mb-1.5 text-gray-300"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-gray-700 rounded bg-gray-800/50 text-gray-200 focus:ring-1 focus:ring-[#1FBFB8] focus:border-[#1FBFB8] text-sm"
                      placeholder="Your email address"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-medium mb-1.5 text-gray-300"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-gray-700 rounded bg-gray-800/50 text-gray-200 focus:ring-1 focus:ring-[#1FBFB8] focus:border-[#1FBFB8] text-sm"
                      placeholder="Your phone number"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-medium mb-1.5 text-gray-300"
                  >
                    Your Requirements
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-gray-700 rounded bg-gray-800/50 text-gray-200 focus:ring-1 focus:ring-[#1FBFB8] focus:border-[#1FBFB8] text-sm"
                    placeholder="Describe your mining and hauling requirements"
                    required
                    disabled={loading}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full inline-flex justify-center items-center ${
                    loading
                      ? "bg-gray-600"
                      : "bg-[#E85C23] hover:bg-[#d14b17]"
                  } text-white py-2.5 px-5 rounded transition group font-medium shadow-md text-sm`}
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}