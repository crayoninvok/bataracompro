"use client";

import React, { useState, useEffect } from "react";
import { 
  Newspaper, 
  Download, 
  BookOpen, 
  Search, 
  ChevronRight, 
  Calendar,
  User,
  Clock,
  AlertCircle
} from "lucide-react";
import { Article, DriverUpdate } from "@/types/adminemploye";
import { articleService } from "@/services/article.services";
import { driverService } from "@/services/driver.services";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";

type ContentCategory = "NEWS" | "ARTICLE" | "UPDATE";

export default function EmployeeDashboard() {
  const [activeTab, setActiveTab] = useState<ContentCategory>("NEWS");
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [driverUpdates, setDriverUpdates] = useState<DriverUpdate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch articles
        const articlesData = await articleService.getAll(undefined, true);
        setArticles(articlesData);

        // Fetch driver updates
        const updatesData = await driverService.getAll();
        setDriverUpdates(updatesData);
      } catch (err: any) {
        setError("Failed to load content. Please try again later.");
        console.error("Error fetching content:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Filter content based on active tab and search query
  const getFilteredContent = () => {
    let filteredItems: (Article | DriverUpdate & { contentType: ContentCategory })[] = [];
    
    // Process articles
    const processedArticles = articles.map(article => ({
      ...article,
      contentType: article.type as ContentCategory
    }));
    
    // Process driver updates
    const processedDriverUpdates = driverUpdates.map(update => ({
      ...update,
      contentType: "UPDATE" as ContentCategory
    }));
    
    // Combine based on selected tab
    if (activeTab === "NEWS" || activeTab === "ARTICLE") {
      filteredItems = [...processedArticles.filter(item => item.contentType === activeTab)];
    } else if (activeTab === "UPDATE") {
      filteredItems = [...processedDriverUpdates];
    }
    
    // Apply search filter if query exists
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredItems = filteredItems.filter(item => 
        "title" in item && item.title.toLowerCase().includes(query) ||
        "description" in item && item.description.toLowerCase().includes(query) ||
        "content" in item && item.content.toLowerCase().includes(query) ||
        "summary" in item && item.summary?.toLowerCase().includes(query)
      );
    }
    
    return filteredItems;
  };

  const filteredContent = getFilteredContent();

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return dateString;
    }
  };

  // Determine read time for articles
  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg flex items-start">
        <AlertCircle className="text-red-500 h-5 w-5 mr-2 mt-0.5" />
        <div>
          <h3 className="text-red-800 font-medium">Error loading content</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  // Render content card
  const renderContentCard = (item: any) => {
    const isArticle = "content" in item;
    const isDriverUpdate = "version" in item;
    
    // Get content category for styling
    let categoryStyle = "";
    if (isArticle) {
      categoryStyle = item.type === "NEWS" 
        ? "bg-blue-100 text-blue-800" 
        : "bg-purple-100 text-purple-800";
    } else if (isDriverUpdate) {
      categoryStyle = "bg-green-100 text-green-800";
    }
    
    return (
      <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
        {isArticle && item.imageUrl && (
          <div className="h-48 overflow-hidden relative">
            <Image 
              src={item.imageUrl} 
              alt={item.title} 
              fill
              className="object-cover object-center transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}
        <div className="p-5">
          <div className="flex items-center mb-2">
            <div className={`text-xs font-bold px-2 py-1 rounded-full ${categoryStyle}`}>
              {isArticle 
                ? item.type 
                : isDriverUpdate 
                  ? "UPDATE" 
                  : "CONTENT"}
            </div>
            {isArticle && (
              <span className="ml-2 text-gray-600 text-sm flex items-center">
                <Clock className="h-3 w-3 mr-1" /> {getReadTime(item.content)}
              </span>
            )}
            {isDriverUpdate && item.isRequired && (
              <span className="ml-2 text-red-600 text-sm flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" /> Required Update
              </span>
            )}
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
          <p className="text-gray-600 mb-4">
            {isArticle 
              ? item.summary || item.content.substring(0, 120) + "..." 
              : item.description.substring(0, 120) + "..."}
          </p>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-gray-600" />
              </div>
              <span className="ml-2 text-sm text-gray-700">
                {isArticle 
                  ? item.author?.name || "Admin" 
                  : item.author?.name || "System Admin"}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              {isArticle 
                ? formatDate(item.publishedAt || item.createdAt) 
                : formatDate(item.releaseDate)}
            </div>
          </div>
          
          <Link 
            href={isArticle 
              ? `/employee/news/${item.slug}` 
              : `/employee/updates/${item.id}`}
            className="mt-4 text-orange-500 font-medium flex items-center hover:text-orange-700 transition-colors"
          >
            Read more <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Dashboard Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back</h1>
        <p className="text-gray-600">Stay updated with the latest company news and updates</p>
      </div>
      
      {/* Content Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Company Updates</h2>
          <Link href="/employee/news" className="text-orange-500 text-sm font-medium hover:text-orange-700">
            View all
          </Link>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button 
            className={`px-4 py-2 text-sm font-medium flex items-center ${
              activeTab === "NEWS" 
                ? "text-orange-500 border-b-2 border-orange-500" 
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("NEWS")}
          >
            <Newspaper className="h-4 w-4 mr-2" />
            News
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium flex items-center ${
              activeTab === "UPDATE" 
                ? "text-orange-500 border-b-2 border-orange-500" 
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("UPDATE")}
          >
            <Download className="h-4 w-4 mr-2" />
            App Updates
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium flex items-center ${
              activeTab === "ARTICLE" 
                ? "text-orange-500 border-b-2 border-orange-500" 
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("ARTICLE")}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Articles
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Content Grid */}
        {filteredContent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map(renderContentCard)}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <Newspaper className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">No items found</h3>
            <p className="text-gray-600">Try changing your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}