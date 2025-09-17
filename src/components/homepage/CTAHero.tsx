"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Check,
  AlertCircle,
  Calendar,
  Send,
  MessageCircle,
  Building,
  Clock,
  Sparkles,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

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
  const [isVisible, setIsVisible] = useState(false);
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
  const [hoveredContact, setHoveredContact] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = sectionRef.current;
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
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

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+62 21 38865143",
      color: "#E85C23",
      description: "Call us directly"
    },
    {
      icon: Mail,
      label: "Email", 
      value: "info@bataramining.com",
      color: "#1FBFB8",
      description: "Send us an email"
    },
    {
      icon: MapPin,
      label: "Head Office",
      value: "Jl. Agung Sedayu City Boulevard Utara No.58, Cakung Bar., Kec. Cakung, East Jakarta, Special Capital Region of Jakarta 13910",
      color: "#E85C23",
      description: "Visit our office"
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Monday - Friday: 8:00 AM - 5:00 PM",
      color: "#1FBFB8",
      description: "Our availability"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-15, 15, -15],
      rotate: [0, 5, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden border-y border-gray-800/50"
      id="contact"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main gradient overlays */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E85C23]/10 via-[#E85C23]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#1FBFB8]/10 via-[#1FBFB8]/5 to-transparent" />

        {/* Animated floating orbs */}
        <motion.div
          className="absolute top-20 right-32 w-80 h-80 rounded-full bg-[#E85C23]/8 blur-3xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-[#1FBFB8]/6 blur-3xl"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "4s" }}
        />

        {/* Pulsing accent elements */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-4 h-4 rounded-full bg-[#1FBFB8]/40"
          variants={pulseVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-[#E85C23]/40"
          variants={pulseVariants}
          animate="animate"
          style={{ animationDelay: "1.5s" }}
        />

        {/* Geometric patterns */}
        <div className="absolute top-1/4 right-1/5 w-px h-24 bg-gradient-to-b from-[#1FBFB8]/20 to-transparent animate-pulse" />
        <div className="absolute bottom-1/4 left-1/5 w-6 h-6 border border-[#E85C23]/20 rotate-45 animate-spin-slow" />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        {/* Enhanced section header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <MessageCircle className="w-5 h-5 text-[#1FBFB8]" />
            <span className="text-[#1FBFB8] font-semibold tracking-wider uppercase text-sm">
              Get In Touch
            </span>
            <MessageCircle className="w-5 h-5 text-[#1FBFB8]" />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            Ready to{" "}
            <span className="relative">
              <span className="text-[#E85C23] relative z-10">Partner</span>
              <span className="absolute bottom-0 left-0 w-full h-4 bg-[#E85C23]/30 -z-1" />
            </span>{" "}
            with Us?
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed"
          >
            Transform your mining operations with our comprehensive solutions. 
            Let's discuss how we can support your business goals with reliable, 
            sustainable mining and hauling services.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto">
          {/* Enhanced Left Side: Contact Info */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {/* Company highlights */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-gray-900/90 via-gray-800/60 to-gray-900/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#1FBFB8]/20 rounded-xl flex items-center justify-center">
                  <Building className="w-6 h-6 text-[#1FBFB8]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Why Choose PT Batara?</h3>
                  <p className="text-gray-400 text-sm">Your trusted mining partner</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Users, text: "Expert Team", color: "#1FBFB8" },
                  { icon: Check, text: "Proven Results", color: "#E85C23" },
                  { icon: Sparkles, text: "Latest Technology", color: "#1FBFB8" },
                  { icon: Clock, text: "24/7 Support", color: "#E85C23" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <item.icon 
                      className="w-4 h-4" 
                      style={{ color: item.color }} 
                    />
                    <span className="text-gray-300 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Enhanced contact info */}
            <motion.div variants={itemVariants} className="space-y-4">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={index}
                  className="group bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl"
                  onMouseEnter={() => setHoveredContact(index)}
                  onMouseLeave={() => setHoveredContact(null)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  style={{
                    borderColor: hoveredContact === index ? contact.color + "40" : undefined,
                    boxShadow: hoveredContact === index ? `0 20px 40px ${contact.color}15` : undefined,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: `${contact.color}15`,
                        border: `2px solid ${contact.color}25`,
                      }}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <contact.icon 
                        className="w-5 h-5 transition-colors duration-300" 
                        style={{ 
                          color: hoveredContact === index ? contact.color : `${contact.color}CC` 
                        }} 
                      />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs text-gray-400 uppercase tracking-wider">
                          {contact.label}
                        </p>
                        <span className="text-xs text-gray-500">
                          {contact.description}
                        </span>
                      </div>
                      <p className="font-semibold text-gray-200 leading-relaxed break-words">
                        {contact.value}
                      </p>
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, ${contact.color}05 0%, transparent 70%)`,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Right Side: Contact Form */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="relative"
          >
            <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-gray-700/50 relative overflow-hidden">
              {/* Form header with icon */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-[#E85C23]/20 rounded-xl flex items-center justify-center">
                  <Send className="w-6 h-6 text-[#E85C23]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Send Us a Message</h3>
                  <p className="text-gray-400 text-sm">We'll get back to you within 24 hours</p>
                </div>
              </div>

              {/* Status messages with enhanced styling */}
              {status.type === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-green-900/40 to-green-800/30 border border-green-600/50 rounded-xl p-4 mb-6 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-green-300 font-medium">{status.message}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {status.type === "error" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-red-900/40 to-red-800/30 border border-red-600/50 rounded-xl p-4 mb-6 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertCircle className="h-3 w-3 text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm text-red-300 font-medium">{status.message}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Enhanced form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2 text-gray-300"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-600/50 rounded-xl bg-gray-800/60 backdrop-blur-sm text-gray-200 focus:ring-2 focus:ring-[#1FBFB8]/50 focus:border-[#1FBFB8] transition-all duration-300 placeholder-gray-500"
                      placeholder="Enter your full name"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium mb-2 text-gray-300"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-600/50 rounded-xl bg-gray-800/60 backdrop-blur-sm text-gray-200 focus:ring-2 focus:ring-[#1FBFB8]/50 focus:border-[#1FBFB8] transition-all duration-300 placeholder-gray-500"
                      placeholder="Your company name"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2 text-gray-300"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-600/50 rounded-xl bg-gray-800/60 backdrop-blur-sm text-gray-200 focus:ring-2 focus:ring-[#1FBFB8]/50 focus:border-[#1FBFB8] transition-all duration-300 placeholder-gray-500"
                      placeholder="your.email@company.com"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2 text-gray-300"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-600/50 rounded-xl bg-gray-800/60 backdrop-blur-sm text-gray-200 focus:ring-2 focus:ring-[#1FBFB8]/50 focus:border-[#1FBFB8] transition-all duration-300 placeholder-gray-500"
                      placeholder="+62 xxx xxxx xxxx"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-gray-300"
                  >
                    Your Requirements *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-600/50 rounded-xl bg-gray-800/60 backdrop-blur-sm text-gray-200 focus:ring-2 focus:ring-[#1FBFB8]/50 focus:border-[#1FBFB8] transition-all duration-300 placeholder-gray-500 resize-none"
                    placeholder="Tell us about your mining and hauling requirements, project scope, timeline, and any specific needs..."
                    required
                    disabled={loading}
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full group relative overflow-hidden bg-gradient-to-r from-[#1FBFB8] to-[#1FBFB8]/90 hover:from-[#E85C23] hover:to-[#E85C23]/90 text-black py-4 px-6 rounded-xl transition-all duration-500 font-semibold shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  <div className="flex justify-center items-center gap-3">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                        <span>Send Message</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </div>

                  {/* Button glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#1FBFB8]/20 to-[#E85C23]/20 blur-xl group-hover:blur-2xl transition-all duration-500 -z-10" />
                </motion.button>
              </form>

              {/* Form background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1FBFB8]/5 via-transparent to-[#E85C23]/5 rounded-2xl pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }
      `}</style>
    </section>
  );
}