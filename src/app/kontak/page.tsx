"use client";

import React, { useEffect, useRef, useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare,
  Send,
  User,
  Building,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  ArrowRight,
  ChevronRight
} from "lucide-react";

export default function Contact() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: ""
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
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

    const elements = document.querySelectorAll(".reveal-contact");
    elements.forEach((el) => observer.observe(el));

    // Initialize map
    if (typeof window !== 'undefined') {
      import('leaflet').then(L => {
        setTimeout(() => {
          const mapContainer = document.getElementById('office-map');
          
          if (mapContainer && !mapContainer.hasChildNodes()) {
            const map = L.map('office-map').setView([-6.163255, 106.929148], 15);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            
            const headOfficeMarker = L.marker([-6.163255, 106.929148]).addTo(map);
            headOfficeMarker.bindPopup("<b>Head Office PT Batara Dharma Persada</b><br>Jl. Agung Sedayu City Boulevard Utara No.58, Cakung Bar., Kec. Cakung, Kota Jakarta Timur, DKI Jakarta 13910").openPopup();
          }
        }, 1000);
      });
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Your message has been sent. We will contact you soon.");
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      message: ""
    });
  };

  // Parallax effect calculation
  const parallaxOffset = scrollPosition * 0.3;

  return (
    <main className="min-h-screen bg-black/80 backdrop-blur-lg">
      {/* Hero Header */}
      <section className="relative py-28 overflow-hidden border-b border-gray-800">
        {/* Background layers */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#3A3A3D] to-[#1F1F23]"
          style={{ transform: `translateY(${parallaxOffset * 0.2}px)` }}
        />
        
        {/* Animated grid pattern */}
        <div 
          className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 bg-[length:60px_60px]"
          style={{ 
            transform: `translateY(${parallaxOffset * 0.1}px)`,
            animation: 'gridMove 20s linear infinite'
          }} 
        />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#E85C23]/30"
              style={{
                width: `${Math.random() * 8 + 2}px`,
                height: `${Math.random() * 8 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-block mb-6">
              <div className="w-full h-0.5 bg-[#E85C23]/30 mt-2" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="relative inline-block">
                <span className="relative z-10">Contact Us</span>
                <span className="absolute bottom-0 left-0 w-full h-3 bg-[#E85C23]/30 z-0" style={{ bottom: '5px' }} />
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Connect with <span className="text-[#E85C23] font-medium">PT. Batara Dharma Persada</span> for all your mining and hauling service needs
            </p>
            
            <div className="animate-bounce mt-8">
              <ChevronRight className="w-8 h-8 text-[#1FBFB8] transform rotate-90" />
            </div>
          </div>
        </div>
        
        {/* Custom animations */}
        <style jsx global>{`
          @keyframes float {
            0% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-20px) translateX(10px); }
            100% { transform: translateY(0) translateX(0); }
          }
          @keyframes gridMove {
            0% { background-position: 0 0; }
            100% { background-position: 60px 60px; }
          }
        `}</style>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20 px-4 md:px-8 lg:px-24 relative border-b border-gray-800">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#E85C23]/10 to-transparent rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#1FBFB8]/10 to-transparent rounded-full -ml-48 -mb-48"></div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="reveal-contact opacity-0 translate-y-6 transition-all duration-700">
              <h2 className="text-3xl font-bold mb-6 relative inline-block">
                <span className="relative z-10 text-white">Contact Details</span>
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#E85C23]/20 z-0"></span>
              </h2>
              <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                Reach out to discuss your coal transportation needs or explore other business cooperation opportunities with PT Batara Dharma Persada.
              </p>

              <div className="space-y-8">
                <div className="flex items-start group">
                  <div className="bg-[#1FBFB8]/20 p-4 rounded-lg mr-5 group-hover:bg-[#1FBFB8]/30 transition-colors">
                    <Building className="w-6 h-6 text-[#1FBFB8]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-white group-hover:text-[#1FBFB8] transition-colors">Head Office</h3>
                    <p className="text-gray-300">
                      Jl. Agung Sedayu City Boulevard Utara No.58, 
                      <br />Cakung Bar., Kec. Cakung, 
                      <br />East Jakarta, DKI Jakarta 13910
                    </p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-[#E85C23]/20 p-4 rounded-lg mr-5 group-hover:bg-[#E85C23]/30 transition-colors">
                    <Phone className="w-6 h-6 text-[#E85C23]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-white group-hover:text-[#E85C23] transition-colors">Phone</h3>
                    <p className="text-gray-300">
                      +62 21 5437 8932 <span className="text-gray-400">(Office)</span>
                      <br />
                      +62 812 9876 5432 <span className="text-gray-400">(Customer Service)</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-[#1FBFB8]/20 p-4 rounded-lg mr-5 group-hover:bg-[#1FBFB8]/30 transition-colors">
                    <Mail className="w-6 h-6 text-[#1FBFB8]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-white group-hover:text-[#1FBFB8] transition-colors">Email</h3>
                    <p className="text-gray-300">
                      info@batara.id <span className="text-gray-400">(General Information)</span>
                      <br />
                      sales@batara.id <span className="text-gray-400">(Business Cooperation)</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-[#E85C23]/20 p-4 rounded-lg mr-5 group-hover:bg-[#E85C23]/30 transition-colors">
                    <Clock className="w-6 h-6 text-[#E85C23]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-white group-hover:text-[#E85C23] transition-colors">Operating Hours</h3>
                    <p className="text-gray-300">
                      Monday - Friday: 08:00 - 17:00 WIB
                      <br />
                      Saturday: 08:00 - 13:00 WIB
                      <br />
                      Sunday & Public Holidays: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-12">
                <h3 className="font-bold text-xl mb-5 text-white">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://instagram.com/pt_batara" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-black/30 hover:bg-[#E85C23]/30 transition-all duration-300 p-4 rounded-lg border border-gray-800 hover:border-[#E85C23]"
                  >
                    <Instagram className="w-6 h-6 text-gray-300 hover:text-[#E85C23] transition" />
                  </a>
                  <a 
                    href="https://facebook.com/ptbatara" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-black/30 hover:bg-[#1FBFB8]/30 transition-all duration-300 p-4 rounded-lg border border-gray-800 hover:border-[#1FBFB8]"
                  >
                    <Facebook className="w-6 h-6 text-gray-300 hover:text-[#1FBFB8] transition" />
                  </a>
                  <a 
                    href="https://linkedin.com/company/pt-batara-dharma-persada" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-black/30 hover:bg-[#1FBFB8]/30 transition-all duration-300 p-4 rounded-lg border border-gray-800 hover:border-[#1FBFB8]"
                  >
                    <Linkedin className="w-6 h-6 text-gray-300 hover:text-[#1FBFB8] transition" />
                  </a>
                  <a 
                    href="https://twitter.com/pt_batara" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-black/30 hover:bg-[#E85C23]/30 transition-all duration-300 p-4 rounded-lg border border-gray-800 hover:border-[#E85C23]"
                  >
                    <Twitter className="w-6 h-6 text-gray-300 hover:text-[#E85C23] transition" />
                  </a>
                  <a 
                    href="https://youtube.com/channel/ptbatara" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-black/30 hover:bg-[#1FBFB8]/30 transition-all duration-300 p-4 rounded-lg border border-gray-800 hover:border-[#1FBFB8]"
                  >
                    <Youtube className="w-6 h-6 text-gray-300 hover:text-[#1FBFB8] transition" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="reveal-contact opacity-0 translate-y-6 transition-all duration-700 delay-200">
              <div className="bg-gray-900/60 rounded-xl p-8 shadow-lg border border-gray-800 relative overflow-hidden">
                {/* Background accent */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#E85C23]/10 via-[#1FBFB8]/5 to-transparent rounded-full -mr-20 -mt-20 blur-xl"></div>
                <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-gradient-to-tr from-[#1FBFB8]/10 via-[#E85C23]/5 to-transparent rounded-full blur-xl"></div>
                
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-6 text-white">Send a Message</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="block w-full pl-10 pr-3 py-3 bg-black/40 border border-gray-700 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1FBFB8] focus:border-transparent text-white"
                            placeholder="Enter full name"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                          Email
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-500" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="block w-full pl-10 pr-3 py-3 bg-black/40 border border-gray-700 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1FBFB8] focus:border-transparent text-white"
                            placeholder="email@company.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                            Company
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Building className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                              type="text"
                              id="company"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              className="block w-full pl-10 pr-3 py-3 bg-black/40 border border-gray-700 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1FBFB8] focus:border-transparent text-white"
                              placeholder="Company name"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                            Phone
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Phone className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="block w-full pl-10 pr-3 py-3 bg-black/40 border border-gray-700 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1FBFB8] focus:border-transparent text-white"
                              placeholder="+62 812 3456 7890"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                          Message
                        </label>
                        <div className="relative">
                          <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                            <MessageSquare className="h-5 w-5 text-gray-500" />
                          </div>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            required
                            className="block w-full pl-10 pr-3 py-3 bg-black/40 border border-gray-700 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1FBFB8] focus:border-transparent text-white"
                            placeholder="Explain your question or need..."
                          />
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-gradient-to-r from-[#E85C23] to-[#d14b17] hover:from-[#d14b17] hover:to-[#E85C23] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E85C23] transition-all duration-300 group"
                        >
                          <Send className="w-5 h-5 mr-2 transform group-hover:translate-x-1 transition-transform" />
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-20 px-4 md:px-8 lg:px-24 relative border-b border-gray-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#1FBFB8]/10 to-transparent rounded-full -mr-48 -mt-48"></div>
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 reveal-contact opacity-0 translate-y-6 transition-all duration-700">
            <h2 className="text-3xl font-bold mb-4 relative inline-block">
              <span className="relative z-10 text-white">Our Location</span>
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#1FBFB8]/20 z-0"></span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Visit the PT Batara Dharma Persada head office in East Jakarta
            </p>
          </div>

          <div className="reveal-contact opacity-0 translate-y-6 transition-all duration-700 bg-gray-900/60 rounded-xl overflow-hidden shadow-lg border border-gray-800" style={{ height: "500px" }}>
            {/* Map Container */}
            <div id="office-map" className="w-full h-full">
              {/* Leaflet will initialize here */}
            </div>
            
            {/* CSS for Leaflet */}
            <style jsx global>{`
              @import 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
              
              .leaflet-container {
                background-color: #1a1a1a;
              }
              
              .leaflet-popup-content-wrapper {
                background: rgba(30, 30, 30, 0.95);
                color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(80, 80, 80, 0.3);
              }
              
              .leaflet-popup-tip {
                background: rgba(30, 30, 30, 0.95);
              }
              
              .leaflet-popup-content {
                margin: 13px 19px;
                line-height: 1.5;
              }
              
              .leaflet-popup-content p {
                margin: 8px 0;
                color: #e0e0e0;
              }
              
              .leaflet-popup-content b {
                font-weight: bold;
                color: #E85C23;
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 lg:px-24 relative">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#E85C23]/10 to-transparent rounded-full -ml-48 -mb-48"></div>
        
        <div className="max-w-4xl mx-auto text-center reveal-contact opacity-0 translate-y-6 transition-all duration-700">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Want to Learn More?
          </h2>
          <p className="text-lg md:text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
            Download our company brochure for complete information about PT Batara Dharma Persada's mining and transportation services.
          </p>
          <a
            href="https://res.cloudinary.com/dysmj8esf/image/upload/v1747210242/bdp_companyProfile_202410_r00_jgiio4.pdf"
            className="inline-flex items-center bg-[#e85c23] hover:bg-[#d14b17] text-white px-8 py-4 rounded-md transition-colors shadow-lg text-lg group"
          >
            <span>Download Company Profile</span>
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </main>
  );
}