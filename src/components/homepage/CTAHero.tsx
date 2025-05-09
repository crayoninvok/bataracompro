"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Check,
  AlertCircle,
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
    <section className="py-24 px-4 md:px-8 lg:px-24 bg-white text-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side: Contact Info */}
          <div className="reveal-cta opacity-0 translate-y-6 transition-all duration-700">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need reliable coal transportation solutions?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              PT. Batara Dharma Persada is ready to be your trusted partner for
              your coal transportation needs. Contact us for consultation and
              special offers.
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-bold">+62 21 1234 5678</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-bold">info@bataramining.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4 mt-1">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Head Office</p>
                  <p className="font-bold">
                    Jl. Agung Sedayu City Boulevard Utara No.58, Cakung Bar.,
                    Kec. Cakung, East Jakarta, Special Capital Region of Jakarta
                    13910
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gray-100 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Operational Area:</h4>
              <p className="text-gray-700">Tabang - East Kalimantan</p>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="reveal-cta opacity-0 translate-y-6 transition-all duration-700 delay-200">
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold mb-6">Contact Us</h3>

              {status.type === "success" ? (
                <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800">
                        {status.message}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              {status.type === "error" ? (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">
                        {status.message}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1 text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
                    placeholder="Your full name"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium mb-1 text-gray-700"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
                    placeholder="Your company name"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1 text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
                    placeholder="Your email address"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-1 text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
                    placeholder="Your phone number"
                    disabled={loading}
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-1 text-gray-700"
                  >
                    Your Needs
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
                    placeholder="Describe your coal transportation needs"
                    required
                    disabled={loading}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full inline-flex justify-center items-center ${
                    loading
                      ? "bg-gray-400"
                      : "bg-orange-500 hover:bg-orange-600"
                  } text-white py-3 px-4 rounded-md transition group`}
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
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
