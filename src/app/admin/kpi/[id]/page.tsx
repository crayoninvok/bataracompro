"use client";
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  CheckCircle,
  Clock,
  Calendar,
  User,
  Target,
  BarChart3,
  Edit,
  Trash2,
  MessageSquare,
} from "lucide-react";
import {
  kpiService,
  KPI,
  KPIEntry,
  KPIAnalytics,
} from "@/services/key-performace.services";
import AddEntryModal from "@/components/keyperformance/KPIEntryModal";

const KPIDetailPage: React.FC = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  
  // Get kpiId from URL parameters
  const kpiId = params?.id as string;
  const initialTab = searchParams?.get('tab') || 'overview';

  const [kpi, setKpi] = useState<KPI | null>(null);
  const [entries, setEntries] = useState<KPIEntry[]>([]);
  const [analytics, setAnalytics] = useState<KPIAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (kpiId) {
      fetchKPIData();
    } else {
      setError("KPI ID not found in URL");
      setLoading(false);
    }
  }, [kpiId]);

  const fetchKPIData = async () => {
    if (!kpiId) {
      setError("KPI ID is required");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching KPI data for ID:", kpiId);
      
      // Use getKPIById with includeEntries=true to get KPI and entries in one call
      const kpiResponse = await kpiService.getKPIById(kpiId, true, 50);

      if (kpiResponse?.data) {
        setKpi(kpiResponse.data);
        
        // Set entries from the KPI response if they exist
        if (kpiResponse.data.entries) {
          setEntries(kpiResponse.data.entries);
        }
      }
      
      // Fetch analytics separately only if needed
      try {
        const analyticsResponse = await kpiService.getKPIAnalytics(kpiId);
        if (analyticsResponse?.data) {
          setAnalytics(analyticsResponse.data);
        }
      } catch (analyticsError) {
        console.warn("Failed to fetch analytics:", analyticsError);
        // Don't fail the entire component if analytics fail
      }
      
    } catch (error) {
      console.error("Failed to fetch KPI data:", error);
      setError("Failed to load KPI data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ON_TARGET":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "AT_RISK":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case "OFF_TARGET":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "UP":
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case "DOWN":
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      default:
        return <Minus className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "CRITICAL":
        return "bg-red-100 text-red-800 border-red-200";
      case "HIGH":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "LOW":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleAddEntrySuccess = () => {
    fetchKPIData(); // Refresh the data
    setShowAddEntry(false);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-64 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !kpi) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto text-center py-12">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "KPI Not Found"}
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "The requested KPI could not be found."}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Go Back
            </button>
            <button
              onClick={fetchKPIData}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const latestEntry = entries[0];
  const currentValue = latestEntry?.value;
  const targetAchievement =
    kpi.target && currentValue ? (currentValue / kpi.target) * 100 : null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to KPIs
          </button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {kpi.name}
              </h1>
              <p className="text-gray-600">{kpi.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(
                  kpi.priority
                )}`}
              >
                {kpi.priority}
              </span>
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">
                Current Value
              </h3>
              {latestEntry &&
                getTrendIcon(latestEntry.trendDirection || "STABLE")}
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {currentValue ? `${currentValue}${kpi.unit || ""}` : "No data"}
            </p>
            {latestEntry && (
              <div className="flex items-center mt-2">
                {getStatusIcon(latestEntry.status)}
                <span className="ml-2 text-sm text-gray-600">
                  {latestEntry.status.replace("_", " ").toLowerCase()}
                </span>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Target</h3>
            <p className="text-2xl font-bold text-gray-900">
              {kpi.target ? `${kpi.target}${kpi.unit || ""}` : "Not set"}
            </p>
            {targetAchievement && (
              <p className="text-sm text-gray-600 mt-2">
                {targetAchievement.toFixed(1)}% of target
              </p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Variance</h3>
            <p className="text-2xl font-bold text-gray-900">
              {latestEntry?.varianceFromTarget
                ? `${
                    latestEntry.varianceFromTarget > 0 ? "+" : ""
                  }${latestEntry.varianceFromTarget.toFixed(1)}%`
                : "N/A"}
            </p>
            <p className="text-sm text-gray-600 mt-2">From target</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Data Points
            </h3>
            <p className="text-2xl font-bold text-gray-900">{entries.length}</p>
            <p className="text-sm text-gray-600 mt-2">Total entries</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {["overview", "entries", "analytics", "settings"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    KPI Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Department:</span>
                      <span className="font-medium">{kpi.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Category:</span>
                      <span className="font-medium">{kpi.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Type:</span>
                      <span className="font-medium">{kpi.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Frequency:</span>
                      <span className="font-medium">{kpi.frequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Owner:</span>
                      <span className="font-medium">
                        {kpi.owner?.name || kpi.createdBy.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Created:</span>
                      <span className="font-medium">
                        {formatDate(kpi.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Thresholds
                  </h3>
                  <div className="space-y-4">
                    {kpi.minThreshold && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Min Threshold:</span>
                        <span className="font-medium">
                          {kpi.minThreshold}
                          {kpi.unit}
                        </span>
                      </div>
                    )}
                    {kpi.maxThreshold && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Max Threshold:</span>
                        <span className="font-medium">
                          {kpi.maxThreshold}
                          {kpi.unit}
                        </span>
                      </div>
                    )}
                    {kpi.baseline && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Baseline:</span>
                        <span className="font-medium">
                          {kpi.baseline}
                          {kpi.unit}
                        </span>
                      </div>
                    )}
                    {kpi.dataSource && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Data Source:</span>
                        <span className="font-medium">{kpi.dataSource}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Entries Tab */}
            {activeTab === "entries" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Data Entries
                  </h3>
                  <button
                    onClick={() => setShowAddEntry(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Entry
                  </button>
                </div>

                <div className="space-y-4">
                  {entries.length > 0 ? (
                    entries.map((entry) => (
                      <div key={entry.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {getStatusIcon(entry.status)}
                            <div>
                              <p className="font-medium text-gray-900">
                                {entry.value}
                                {kpi.unit} - {formatDate(entry.period)}
                              </p>
                              <p className="text-sm text-gray-600">
                                Entered by {entry.enteredBy?.name || 'Unknown'} •
                                {entry.isApproved
                                  ? " Approved"
                                  : " Pending approval"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getTrendIcon(entry.trendDirection || "STABLE")}
                            {entry.varianceFromTarget && (
                              <span
                                className={`text-sm font-medium ${
                                  entry.varianceFromTarget > 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {entry.varianceFromTarget > 0 ? "+" : ""}
                                {entry.varianceFromTarget.toFixed(1)}%
                              </span>
                            )}
                          </div>
                        </div>
                        {entry.notes && (
                          <p className="text-sm text-gray-600 mt-2">
                            {entry.notes}
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No entries found</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === "analytics" && analytics && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Performance Analytics
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-medium text-blue-900 mb-2">Average</h4>
                    <p className="text-2xl font-bold text-blue-600">
                      {analytics.analytics.average.toFixed(2)}
                      {kpi.unit}
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="font-medium text-green-900 mb-2">
                      Best Performance
                    </h4>
                    <p className="text-2xl font-bold text-green-600">
                      {analytics.analytics.max}
                      {kpi.unit}
                    </p>
                  </div>

                  <div className="bg-red-50 rounded-lg p-6">
                    <h4 className="font-medium text-red-900 mb-2">
                      Worst Performance
                    </h4>
                    <p className="text-2xl font-bold text-red-600">
                      {analytics.analytics.min}
                      {kpi.unit}
                    </p>
                  </div>
                </div>

                {analytics.analytics.targetAchievement && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">
                      Target Achievement
                    </h4>
                    <div className="flex items-center justify-between mb-2">
                      <span>
                        Achieved:{" "}
                        {analytics.analytics.targetAchievement.achieved} /{" "}
                        {analytics.analytics.targetAchievement.total}
                      </span>
                      <span className="font-medium">
                        {analytics.analytics.targetAchievement.percentage.toFixed(
                          1
                        )}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${Math.min(analytics.analytics.targetAchievement.percentage, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Analytics Tab - No Data State */}
            {activeTab === "analytics" && !analytics && (
              <div className="text-center py-8">
                <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No analytics data available</p>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  KPI Settings
                </h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800">
                    Settings panel coming soon...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Entry Modal */}
      {kpi && (
        <AddEntryModal
          isOpen={showAddEntry}
          onClose={() => setShowAddEntry(false)}
          onSuccess={handleAddEntrySuccess}
          kpi={kpi}
        />
      )}
    </div>
  );
};

export default KPIDetailPage;