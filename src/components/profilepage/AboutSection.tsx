"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, Users, Briefcase, Award, ChevronRight, MapPin, Target, Zap, Shield, Leaf } from "lucide-react";

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [countUp, setCountUp] = useState({ employees: 0, capacity: 0 });

  const tabs = [
    { 
      id: 'mission', 
      label: 'Our Mission', 
      icon: Target,
      content: 'To elevate Indonesia\'s quality of life through strategic resource management, sustainable mining practices, and comprehensive human capital development while maintaining the highest safety and environmental standards.'
    },
    { 
      id: 'vision', 
      label: 'Our Vision', 
      icon: Zap,
      content: 'To become Indonesia\'s most trusted and innovative mining solutions provider, leading the transformation of the mining industry through technology, sustainability, and operational excellence.'
    },
    { 
      id: 'values', 
      label: 'Our Values', 
      icon: Shield,
      content: 'Safety First, Environmental Stewardship, Operational Excellence, Integrity, Innovation, and Community Development are the core principles that guide every aspect of our operations.'
    }
  ];

  const milestones = [
    { year: '2024', title: 'Company Founded', description: 'Established with divine guidance and vision for excellence' },
    { year: '2024', title: 'First Major Contract', description: 'Secured coal hauling operations in Kalimantan' },
    { year: '2024', title: 'Fleet Expansion', description: 'Expanded to 200+ specialized mining vehicles' },
    { year: '2025', title: 'Sustainable Growth', description: 'Targeting 6.2M ton production capacity' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          
          // Animate counter for employees
          const employeeTarget = 200;
          const capacityTarget = 6.2;
          let employeeCount = 0;
          let capacityCount = 0;
          
          const employeeInterval = setInterval(() => {
            if (employeeCount < employeeTarget) {
              employeeCount += Math.ceil(employeeTarget / 50);
              setCountUp(prev => ({ ...prev, employees: Math.min(employeeCount, employeeTarget) }));
            } else {
              clearInterval(employeeInterval);
            }
          }, 50);
          
          const capacityInterval = setInterval(() => {
            if (capacityCount < capacityTarget) {
              capacityCount += 0.1;
              setCountUp(prev => ({ ...prev, capacity: Math.min(capacityCount, capacityTarget) }));
            } else {
              clearInterval(capacityInterval);
            }
          }, 100);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("about-section");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  useEffect(() => {
    const tabInterval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length);
    }, 4000);

    return () => clearInterval(tabInterval);
  }, []);

  return (
    <section id="about-section" className="py-20 md:py-28 bg-black/80 backdrop-blur-lg text-white relative overflow-hidden border-t border-gray-800">
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E85C23]/10 to-transparent -z-0" />
      <div className="absolute bottom-20 left-0 w-40 h-40 rounded-full bg-[#1FBFB8]/10 blur-3xl -z-0 animate-pulse" />
      <div className="absolute top-1/4 -right-20 w-64 h-64 rounded-full bg-[#E85C23]/10 blur-3xl -z-0" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#1FBFB8]/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 15}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}>
          <span className="inline-block text-[#1FBFB8] font-medium mb-3 text-sm uppercase tracking-wider">
            OUR COMPANY
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Committed to Excellence in{" "}
            <span className="relative">
              <span className="text-[#1FBFB8] relative z-10">Mining Operations</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-[#1FBFB8]/20 -z-1" />
            </span>
          </h2>
        </div>

        <div className="flex flex-col xl:flex-row items-start gap-16">
          {/* Left Column - Image and Milestones */}
          <div className={`xl:w-1/2 space-y-8 transition-all duration-700 ease-out ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
          }`}>
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-700 group">
              <Image
                src="https://res.cloudinary.com/dysmj8esf/image/upload/v1747204272/IMG_8480_sc9mlm.jpg"
                alt="PT. Batara Dharma Persada Office"
                width={640}
                height={480}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-medium text-lg mb-2">
                  PT. Batara Dharma Persada Operations
                </p>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-[#1FBFB8] mr-2" />
                  <span className="text-white/80 text-sm">Kalimantan, Indonesia</span>
                </div>
              </div>
            </div>

            {/* Company Milestones Timeline */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Calendar className="w-5 h-5 text-[#E85C23] mr-2" />
                Company Milestones
              </h3>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#1FBFB8]/10 rounded-lg flex items-center justify-center border border-[#1FBFB8]/30">
                      <span className="text-[#1FBFB8] font-bold text-sm">{milestone.year}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{milestone.title}</h4>
                      <p className="text-gray-400 text-sm">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className={`xl:w-1/2 transition-all duration-700 ease-out ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
          }`}>
            {/* Main Content */}
            <div className="space-y-8">
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Founded in 2024 with <span className="text-[#1FBFB8] font-medium">divine guidance</span> as our foundation, 
                  PT Batara Dharma Persada is dedicated to elevating Indonesia's quality of life through strategic 
                  resource management and human capital development.
                </p>
                <p className="leading-relaxed">
                  We specialize in providing comprehensive mining solutions for medium-scale operations 
                  in coal, bauxite, and nickel sectors, implementing industry-best practices that 
                  prioritize safety, environmental responsibility, and operational efficiency.
                </p>
              </div>

              {/* Interactive Tabs */}
              <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
                <div className="flex border-b border-gray-700">
                  {tabs.map((tab, index) => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(index)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 transition-all duration-300 ${
                          activeTab === index 
                            ? 'bg-[#1FBFB8]/10 text-[#1FBFB8] border-b-2 border-[#1FBFB8]' 
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span className="text-sm font-medium hidden sm:block">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="p-6">
                  <p className="text-gray-300 leading-relaxed">
                    {tabs[activeTab].content}
                  </p>
                </div>
              </div>

              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { 
                    icon: Calendar, 
                    value: "2024", 
                    label: "Established", 
                    color: "#E85C23",
                    description: "Year founded"
                  },
                  { 
                    icon: Users, 
                    value: `${countUp.employees}+`, 
                    label: "Employees", 
                    color: "#1FBFB8",
                    description: "Team members"
                  },
                  { 
                    icon: Briefcase, 
                    value: "5+", 
                    label: "Active Projects", 
                    color: "#E85C23",
                    description: "Ongoing operations"
                  },
                  { 
                    icon: Award, 
                    value: `${countUp.capacity.toFixed(1)}M`, 
                    label: "Ton Capacity", 
                    color: "#1FBFB8",
                    description: "Annual production"
                  }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all duration-300 group"
                  >
                    <div className="flex items-start space-x-3">
                      <div 
                        className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110`}
                        style={{ backgroundColor: `${item.color}20` }}
                      >
                        <item.icon className="w-5 h-5" style={{ color: item.color }} />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-white">{item.value}</p>
                        <p className="text-gray-400 text-xs">{item.label}</p>
                        <p className="text-gray-500 text-xs mt-1">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Environmental Commitment */}
              <div className="bg-gradient-to-r from-green-900/20 to-[#1FBFB8]/10 rounded-xl p-6 border border-green-700/30">
                <div className="flex items-center gap-3 mb-3">
                  <Leaf className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-semibold text-white">Environmental Commitment</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  We implement sustainable mining practices and environmental restoration programs, 
                  ensuring our operations contribute to long-term ecological balance.
                </p>
              </div>

              {/* Call to Action */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="/proyek"
                  className="inline-flex items-center group bg-[#1FBFB8] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1FBFB8]/90 transition-all duration-300 shadow-lg hover:shadow-[#1FBFB8]/25"
                >
                  Explore Our Projects
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                
                <a
                  href="/kontak"
                  className="inline-flex items-center group border-2 border-[#E85C23] text-[#E85C23] px-6 py-3 rounded-lg font-medium hover:bg-[#E85C23]/10 transition-all duration-300"
                >
                  Contact Us
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(8px); }
          100% { transform: translateY(0) translateX(0); }
        }
      `}</style>
    </section>
  );}