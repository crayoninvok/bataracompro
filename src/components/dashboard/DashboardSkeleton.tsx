// src/cemnnoopst / dashboard / DashboardSkeleton.tsx;
import React from "react";

const DashboardSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar skeleton */}
      <div className="fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg hidden md:block">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
              </div>
            </div>
          </div>
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4">
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-gray-200 rounded animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="md:pl-64">
        <div className="p-4 sm:p-6 md:p-8">
          {/* Header skeleton */}
          <div className="mb-8">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse mr-4 hidden sm:block"></div>
              <div className="flex-1">
                <div className="h-7 bg-gray-200 rounded animate-pulse w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
              </div>
            </div>
          </div>

          {/* Stats skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse mr-4"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Content skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4 mb-4"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="border-b border-gray-100 pb-4">
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mb-3"></div>
                    <div className="flex justify-between">
                      <div className="h-6 bg-gray-200 rounded-full animate-pulse w-1/6"></div>
                      <div className="h-6 bg-gray-200 rounded animate-pulse w-1/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-2/3 mb-4"></div>
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="border-b border-gray-100 pb-4">
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4 mt-3"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
