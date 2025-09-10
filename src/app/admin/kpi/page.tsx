"use client";
import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  BarChart3,
} from "lucide-react";
import {
  kpiService,
  KPI,
  KPIFilters,
} from "@/services/key-performace.services";
import CreateKPIForm from "@/components/keyperformance/CreateKPIModal";
import Link from "next/link";

const KPIPage = () => {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0,
    limit: 10,
  });
  const [filters, setFilters] = useState<KPIFilters>({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchKPIs();
  }, [filters]);

  const fetchKPIs = async () => {
    try {
      setLoading(true);
      const response = await kpiService.getAllKPIs(filters);
      if (response?.data?.kpis) {
        setKpis(response.data.kpis);
        setPagination(response.data.pagination);
      } else {
        setKpis([]);
        setPagination({ current: 1, pages: 1, total: 0, limit: 10 });
      }
    } catch (error) {
      console.error("Failed to fetch KPIs:", error);
      setKpis([]);
      setPagination({ current: 1, pages: 1, total: 0, limit: 10 });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, search: searchTerm, page: 1 }));
  };

  const handleFilterChange = (key: keyof KPIFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleCreateSuccess = () => {
    fetchKPIs(); // Refresh the list
  };

  const handleDeleteKPI = async (kpiId: string) => {
    if (window.confirm("Are you sure you want to delete this KPI?")) {
      try {
        await kpiService.deleteKPI(kpiId);
        fetchKPIs(); // Refresh the list
      } catch (error) {
        console.error("Failed to delete KPI:", error);
        alert("Failed to delete KPI");
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ON_TARGET":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "AT_RISK":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "OFF_TARGET":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "UP":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "DOWN":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "CRITICAL":
        return "bg-red-100 text-red-800";
      case "HIGH":
        return "bg-orange-100 text-orange-800";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800";
      case "LOW":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading && kpis.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Key Performance Indicators
          </h1>
          <p className="mt-2 text-gray-600">
            Monitor and track your organization's performance metrics
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search KPIs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
            <Link href="/admin/kpi/analytics" passHref>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                Analytics
              </button>
            </Link>
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create KPI
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <select
                    value={filters.department || ""}
                    onChange={(e) =>
                      handleFilterChange(
                        "department",
                        e.target.value || undefined
                      )
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Departments</option>
                    <option value="HRGA">HR & GA</option>
                    <option value="ENGINEERING">Engineering</option>
                    <option value="PLAN">Planning</option>
                    <option value="FINANCE">Finance</option>
                    <option value="OPERATIONS">Operations</option>
                    <option value="SUPPORT">Support</option>
                    <option value="PURCHASING">Purchasing</option>
                    <option value="LOGISTICS">Logistics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category || ""}
                    onChange={(e) =>
                      handleFilterChange(
                        "category",
                        e.target.value || undefined
                      )
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    <option value="FINANCIAL">Financial</option>
                    <option value="CUSTOMER">Customer</option>
                    <option value="OPERATIONAL">Operational</option>
                    <option value="LEARNING_GROWTH">Learning & Growth</option>
                    <option value="QUALITY">Quality</option>
                    <option value="SAFETY">Safety</option>
                    <option value="SUSTAINABILITY">Sustainability</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={filters.priority || ""}
                    onChange={(e) =>
                      handleFilterChange(
                        "priority",
                        e.target.value || undefined
                      )
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Priorities</option>
                    <option value="CRITICAL">Critical</option>
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={filters.isActive?.toString() || ""}
                    onChange={(e) =>
                      handleFilterChange(
                        "isActive",
                        e.target.value === ""
                          ? undefined
                          : e.target.value === "true"
                      )
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Status</option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {kpis.map((kpi) => {
            const latestEntry = kpi.entries?.[0];
            return (
              <div
                key={kpi.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {kpi.name}
                      </h3>
                      <p className="text-sm text-gray-600">{kpi.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                          kpi.priority
                        )}`}
                      >
                        {kpi.priority}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Current Value
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg font-semibold text-gray-900">
                          {latestEntry
                            ? `${latestEntry.value}${kpi.unit || ""}`
                            : "No data"}
                        </span>
                        {latestEntry &&
                          getTrendIcon(latestEntry.trendDirection || "STABLE")}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Target
                      </p>
                      <p className="text-lg font-semibold text-gray-900 mt-1">
                        {kpi.target
                          ? `${kpi.target}${kpi.unit || ""}`
                          : "Not set"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {latestEntry && getStatusIcon(latestEntry.status)}
                      <span className="text-sm text-gray-600">
                        {latestEntry?.status.replace("_", " ").toLowerCase() ||
                          "No data"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{kpi._count?.entries || 0} entries</span>
                      {kpi._count?.alerts && kpi._count.alerts > 0 && (
                        <span className="text-red-500">
                          {kpi._count.alerts} alerts
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{kpi.department}</span>
                    <span>{kpi.frequency}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500">
                      Owner: {kpi.owner?.name || kpi.createdBy.name}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          (window.location.href = `/admin/kpi/${kpi.id}`)
                        }
                        className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          (window.location.href = `/admin/kpi/${kpi.id}?tab=analytics`)
                        }
                        className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                        title="View Analytics"
                      >
                        <BarChart3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => console.log("Edit KPI:", kpi.id)}
                        className="p-2 text-gray-400 hover:text-yellow-500 transition-colors"
                        title="Edit KPI"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteKPI(kpi.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete KPI"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {kpis.length === 0 && !loading && (
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No KPIs found
            </h3>
            <p className="text-gray-600 mb-6">
              Get started by creating your first KPI to track performance
              metrics.
            </p>
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
              onClick={() => setShowCreateForm(true)}
            >
              <Plus className="w-5 h-5" />
              Create Your First KPI
            </button>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-between bg-white px-6 py-4 rounded-lg shadow">
            <div className="text-sm text-gray-700">
              Showing {(pagination.current - 1) * pagination.limit + 1} to{" "}
              {Math.min(
                pagination.current * pagination.limit,
                pagination.total
              )}{" "}
              of {pagination.total} results
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(pagination.current - 1)}
                disabled={pagination.current === 1}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {[...Array(Math.min(5, pagination.pages))].map((_, i) => {
                const page = i + Math.max(1, pagination.current - 2);
                if (page > pagination.pages) return null;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 border rounded-lg ${
                      page === pagination.current
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => handlePageChange(pagination.current + 1)}
                disabled={pagination.current === pagination.pages}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create KPI Form Modal */}
      <CreateKPIForm
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
};

export default KPIPage;
