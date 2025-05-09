"use client";

import React, { useEffect, useRef } from "react";
import { 
  Briefcase, 
  GraduationCap, 
  Users, 
  ArrowRight, 
  Clock, 
  MapPin, 
  FileText,
  Send
} from "lucide-react";

export default function Careers() {
  const sectionRef = useRef(null);

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

    const elements = document.querySelectorAll(".reveal-career");
    elements.forEach((el) => observer.observe(el));

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
            Careers at PT Batara Dharma Persada
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Join our team to build a better future for the coal transportation industry
          </p>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 px-4 md:px-8 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 relative inline-block">
              <span className="relative z-10">Why Join Us</span>
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-orange-300 opacity-40 z-0"></span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              PT Batara Dharma Persada offers a dynamic working environment with plenty of opportunities for growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="reveal-career opacity-0 translate-y-6 transition-all duration-700 bg-white p-6 rounded-xl shadow-sm hover:shadow-md border border-gray-100">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Career Development</h3>
              <p className="text-gray-600">
                We provide training and development programs to help you reach your full potential in your career.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="reveal-career opacity-0 translate-y-6 transition-all duration-700 delay-100 bg-white p-6 rounded-xl shadow-sm hover:shadow-md border border-gray-100">
              <div className="bg-orange-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Supportive Team</h3>
              <p className="text-gray-600">
                Join a dedicated team of professionals and work in a collaborative, supportive environment.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="reveal-career opacity-0 translate-y-6 transition-all duration-700 delay-200 bg-white p-6 rounded-xl shadow-sm hover:shadow-md border border-gray-100">
              <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Briefcase className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Compensation Package</h3>
              <p className="text-gray-600">
                We offer competitive compensation packages and various benefits for employee welfare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-4 md:px-8 lg:px-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal-career opacity-0 translate-y-6 transition-all duration-700">
            <h2 className="text-3xl font-bold mb-4 relative inline-block">
              <span className="relative z-10">Available Positions</span>
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-blue-300 opacity-40 z-0"></span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find positions that match your skills and interests at PT Batara Dharma Persada
            </p>
          </div>

          <div className="space-y-6">
            {/* Job 1 */}
            <div className="reveal-career opacity-0 translate-y-6 transition-all duration-700 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">
                      Full Time
                    </span>
                    <h3 className="text-xl font-bold mb-2">Site Manager - East Kalimantan</h3>
                    <div className="flex flex-wrap gap-3 text-gray-500 text-sm mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>Tabang, East Kalimantan</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>Open until June 30, 2025</span>
                      </div>
                    </div>
                    <p className="text-gray-600 max-w-xl">
                      Lead site operations and manage the team to ensure smooth coal transportation processes with high safety and efficiency standards.
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <a
                      href="/careers/site-manager"
                      className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition"
                    >
                      <span>Position Details</span>
                      <ArrowRight className="ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Job 2 */}
            <div className="reveal-career opacity-0 translate-y-6 transition-all duration-700 delay-100 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">
                      Full Time
                    </span>
                    <h3 className="text-xl font-bold mb-2">HSE Supervisor</h3>
                    <div className="flex flex-wrap gap-3 text-gray-500 text-sm mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>Tabang, East Kalimantan</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>Open until June 15, 2025</span>
                      </div>
                    </div>
                    <p className="text-gray-600 max-w-xl">
                      Ensure the implementation of safety, health, and environmental management systems across company operations.
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <a
                      href="/careers/hse-supervisor"
                      className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition"
                    >
                      <span>Position Details</span>
                      <ArrowRight className="ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Job 3 */}
            <div className="reveal-career opacity-0 translate-y-6 transition-all duration-700 delay-200 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">
                      Full Time
                    </span>
                    <h3 className="text-xl font-bold mb-2">Logistic Coordinator</h3>
                    <div className="flex flex-wrap gap-3 text-gray-500 text-sm mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>East Jakarta (Head Office)</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>Open until June 20, 2025</span>
                      </div>
                    </div>
                    <p className="text-gray-600 max-w-xl">
                      Coordinate and optimize logistics between the head office and operational sites to ensure smooth supply chain operations.
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <a
                      href="/careers/logistic-coordinator"
                      className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition"
                    >
                      <span>Position Details</span>
                      <ArrowRight className="ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10 reveal-career opacity-0 translate-y-6 transition-all duration-700">
            <a
              href="/karir/all-carreers"
              className="inline-flex items-center bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-md transition"
            >
              <span>See All Open Positions</span>
              <ArrowRight className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 px-4 md:px-8 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal-career opacity-0 translate-y-6 transition-all duration-700">
            <h2 className="text-3xl font-bold mb-4 relative inline-block">
              <span className="relative z-10">Recruitment Process</span>
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-orange-300 opacity-40 z-0"></span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Understand the steps of PT Batara Dharma Persada's recruitment process
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Process 1 */}
            <div className="reveal-career opacity-0 translate-y-6 transition-all duration-700 bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold absolute -top-4 -left-4">
                1
              </div>
              <div className="text-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold">Application</h3>
              </div>
              <p className="text-gray-600 text-center">
                Submit your resume, cover letter, and other supporting documents to recruitment@batara.id
              </p>
            </div>

            {/* Process 2 */}
            <div className="reveal-career opacity-0 translate-y-6 transition-all duration-700 delay-100 bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold absolute -top-4 -left-4">
                2
              </div>
              <div className="text-center mb-4">
                <div className="bg-orange-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold">Interview</h3>
              </div>
              <p className="text-gray-600 text-center">
                Interview with HR and potential supervisors to assess competence and fit
              </p>
            </div>

            {/* Process 3 */}
            <div className="reveal-career opacity-0 translate-y-6 transition-all duration-700 delay-200 bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold absolute -top-4 -left-4">
                3
              </div>
              <div className="text-center mb-4">
                <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold">Tests & Assessment</h3>
              </div>
              <p className="text-gray-600 text-center">
                Technical tests and assessments relevant to the position applied for
              </p>
            </div>

            {/* Process 4 */}
            <div className="reveal-career opacity-0 translate-y-6 transition-all duration-700 delay-300 bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold absolute -top-4 -left-4">
                4
              </div>
              <div className="text-center mb-4">
                <div className="bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold">Placement</h3>
              </div>
              <p className="text-gray-600 text-center">
                Job offer and placement at the location suitable for the position
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spontaneous Application */}
      <section className="py-20 px-4 md:px-8 lg:px-24 bg-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center reveal-career opacity-0 translate-y-6 transition-all duration-700">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Don't See a Position That Fits?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            We're always looking for talented individuals. Send us your spontaneous application, and we'll contact you if a suitable position becomes available.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-xl mx-auto">
            <a
              href="mailto:recruitment@batara.id"
              className="inline-flex items-center bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 rounded-md transition font-medium"
            >
              <Send className="mr-2" />
              <span>Send Spontaneous Application</span>
            </a>
            <p className="text-sm mt-4 opacity-80">
              Send your CV and cover letter to <strong>recruitment@batara.id</strong> with the subject: "Spontaneous Application - [Your Name]"
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
