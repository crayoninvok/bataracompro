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
  ArrowRight
} from "lucide-react";

export default function Contact() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission - in a real implementation this would connect to an API
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

    const elements = document.querySelectorAll(".reveal-contact");
    elements.forEach((el) => observer.observe(el));

    // Initialize Leaflet map when the component mounts
    // This runs only in the browser, not during server-side rendering
    if (typeof window !== 'undefined') {
      // Dynamically import leaflet when in the browser
      import('leaflet').then(L => {
        // Wait for the DOM to be ready
        setTimeout(() => {
          // Initialize the map if the container exists
          const mapContainer = document.getElementById('office-map');
          
          if (mapContainer && !mapContainer.hasChildNodes()) {
            // Create a map instance
            const map = L.map('office-map').setView([-6.163255, 106.929148], 15);
            
            // Add the OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            
            // Add marker for Head Office
            const headOfficeMarker = L.marker([-6.163255, 106.929148]).addTo(map);
            headOfficeMarker.bindPopup("<b>Head Office PT BATARA</b><br>Jl. Agung Sedayu City Boulevard Utara No.58, Cakung Bar., Kec. Cakung, Kota Jakarta Timur, DKI Jakarta 13910").openPopup();
          }
        }, 1000); // Delay to ensure DOM is ready
      });
    }

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <section className="bg-blue-700 text-white py-24 px-4 md:px-8 lg:px-24 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full -mr-32 -mt-32 opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-800 rounded-full -ml-48 -mb-48 opacity-40"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            We are ready to listen to your questions, suggestions, or needs regarding coal transportation services
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-4 md:px-8 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div className="reveal-contact opacity-0 translate-y-6 transition-all duration-700">
              <h2 className="text-3xl font-bold mb-6 relative inline-block">
                <span className="relative z-10">Contact Information</span>
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-orange-300 opacity-40 z-0"></span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Contact us to discuss your coal transportation needs or other business cooperation with PT Batara Dharma Persada.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Building className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Head Office</h3>
                    <p className="text-gray-600">
                      Jl. Agung Sedayu City Boulevard Utara No.58, Cakung Bar., 
                      <br />Kec. Cakung, East Jakarta City, DKI Jakarta 13910
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone</h3>
                    <p className="text-gray-600">
                      +62 21 5437 8932 <span className="text-gray-400">(Office)</span>
                      <br />
                      +62 812 9876 5432 <span className="text-gray-400">(Customer Service)</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-orange-100 p-3 rounded-full mr-4">
                    <Mail className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-gray-600">
                      info@batara.id <span className="text-gray-400">(General Information)</span>
                      <br />
                      sales@batara.id <span className="text-gray-400">(Business Cooperation)</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Operating Hours</h3>
                    <p className="text-gray-600">
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
                <h3 className="font-bold text-lg mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://instagram.com/pt_batara" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-orange-100 transition p-3 rounded-full"
                  >
                    <Instagram className="w-6 h-6 text-gray-700 hover:text-orange-600 transition" />
                  </a>
                  <a 
                    href="https://facebook.com/ptbatara" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-blue-100 transition p-3 rounded-full"
                  >
                    <Facebook className="w-6 h-6 text-gray-700 hover:text-blue-600 transition" />
                  </a>
                  <a 
                    href="https://linkedin.com/company/pt-bahtera-putera-nusantara" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-blue-100 transition p-3 rounded-full"
                  >
                    <Linkedin className="w-6 h-6 text-gray-700 hover:text-blue-600 transition" />
                  </a>
                  <a 
                    href="https://twitter.com/pt_batara" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-blue-100 transition p-3 rounded-full"
                  >
                    <Twitter className="w-6 h-6 text-gray-700 hover:text-blue-600 transition" />
                  </a>
                  <a 
                    href="https://youtube.com/channel/ptbatara" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-red-100 transition p-3 rounded-full"
                  >
                    <Youtube className="w-6 h-6 text-gray-700 hover:text-red-600 transition" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="reveal-contact opacity-0 translate-y-6 transition-all duration-700 delay-200">
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="email@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                          Company
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Building className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Company name"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="+62 812 3456 7890"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                          <MessageSquare className="h-5 w-5 text-gray-400" />
                        </div>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          required
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Explain your question or need..."
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                      >
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 px-4 md:px-8 lg:px-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 reveal-contact opacity-0 translate-y-6 transition-all duration-700">
            <h2 className="text-3xl font-bold mb-4 relative inline-block">
              <span className="relative z-10">Our Location</span>
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-blue-300 opacity-40 z-0"></span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Visit the PT Batara Dharma Persada head office in East Jakarta
            </p>
          </div>

          <div className="reveal-contact opacity-0 translate-y-6 transition-all duration-700 bg-white rounded-xl overflow-hidden shadow-sm" style={{ height: "400px" }}>
            {/* Map Container */}
            <div id="office-map" className="w-full h-full">
              {/* Leaflet will initialize here */}
            </div>
            
            {/* CSS for Leaflet */}
            <style jsx global>{`
              @import 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
              
              /* Make sure the popups are styled correctly */
              .leaflet-popup-content {
                margin: 13px 19px;
                line-height: 1.4;
              }
              
              .leaflet-popup-content p {
                margin: 10px 0;
              }
              
              .leaflet-popup-content b {
                font-weight: bold;
                color: #333;
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 lg:px-24 bg-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center reveal-contact opacity-0 translate-y-6 transition-all duration-700">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Want to Learn More?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Download our company brochure for complete information about PT Batara Dharma Persada’s coal transportation services
          </p>
          <a
            href="/download/company-profile.pdf"
            className="inline-flex items-center bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 rounded-md transition font-medium"
          >
            <span>Download Company Profile</span>
            <ArrowRight className="ml-2" />
          </a>
        </div>
      </section>
    </main>
  );
}
