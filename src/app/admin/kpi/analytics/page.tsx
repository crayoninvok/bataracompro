"use client";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Target,
  BarChart3,
  PieChart as PieChartIcon,
  Filter,
  Calendar,
  Award,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Users,
  Activity,
} from "lucide-react";
import {
  kpiService,
  KPIOverview,
  DepartmentPerformance,
  TopPerformer,
} from "@/services/key-performace.services";

const COLORS = ["#10b981", "#f59e0b", "#ef4444", "#6b7280"];

const AnalyticsPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [timeRange, setTimeRange] = useState("6");
  const [isLoading, setIsLoading] = useState(false);
  const [overview, setOverview] = useState<KPIOverview | null>(null);
  const [departmentPerformance, setDepartmentPerformance] = useState<
    DepartmentPerformance[]
  >([]);
  const [topPerformers, setTopPerformers] = useState<TopPerformer[]>([]);
  const [error, setError] = useState<string | null>(null);

  const refreshData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch all analytics data
      const [overviewResponse, deptResponse, topResponse] = await Promise.all([
        kpiService.getKPIOverview(selectedDepartment || undefined),
        kpiService.getDepartmentPerformance(),
        kpiService.getTopPerformingKPIs(10, selectedDepartment || undefined),
      ]);

      if (overviewResponse.success) {
        setOverview(overviewResponse.data);
      }

      if (deptResponse.success) {
        setDepartmentPerformance(deptResponse.data);
      }

      if (topResponse.success) {
        setTopPerformers(topResponse.data);
      }
    } catch (err) {
      console.error("Failed to fetch analytics data:", err);
      setError("Failed to load analytics data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [selectedDepartment, timeRange]);

  // Prepare pie chart data
  const pieData = overview
    ? [
        {
          name: "On Target",
          value: overview.overview.onTarget,
          color: COLORS[0],
        },
        {
          name: "Off Target",
          value: overview.overview.offTarget,
          color: COLORS[2],
        },
        { name: "No Data", value: overview.overview.noData, color: COLORS[3] },
      ]
    : [];

  interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ComponentType<any>;
    color: string;
    subtitle?: string;
    trend?: number;
  }

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
    subtitle,
    trend,
  }: StatCardProps) => (
    <div
      className="bg-white rounded-lg shadow-md p-6 border-l-4"
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        <div
          className="p-3 rounded-full"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="h-6 w-6" style={{ color }} />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          {trend > 0 ? (
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span
            className={`text-sm font-medium ${
              trend > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {Math.abs(trend)}% from last month
          </span>
        </div>
      )}
    </div>
  );

  interface KPICardProps {
    kpi: {
      id: string;
      name: string;
      department: string;
      currentValue: number;
      target: number;
      unit?: string;
      status: string;
      lastUpdated?: string;
    };
  }

  const KPICard = ({ kpi }: KPICardProps) => (
    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-900 truncate">{kpi.name}</h4>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            kpi.status === "ON_TARGET"
              ? "bg-green-100 text-green-800"
              : kpi.status === "OFF_TARGET"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {kpi.status.replace("_", " ")}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-bold text-gray-900">
            {kpi.currentValue} {kpi.unit}
          </p>
          <p className="text-sm text-gray-500">
            Target: {kpi.target} {kpi.unit}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">{kpi.department}</p>
          <p className="text-xs text-gray-400">
            {kpi.lastUpdated
              ? new Date(kpi.lastUpdated).toLocaleDateString()
              : "No data"}
          </p>
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-red-800 mb-2">
              Error Loading Analytics
            </h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={refreshData}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                KPI Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Monitor and analyze key performance indicators across
                departments
              </p>
            </div>
            <button
              onClick={refreshData}
              disabled={isLoading}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Filters:
              </span>
            </div>

            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Departments</option>
              <option value="FINANCE">Finance</option>
              <option value="ENGINEERING">Engineering</option>
              <option value="OPERATIONS">Operations</option>
              <option value="SUPPORT">Support</option>
              <option value="HRGA">HR & GA</option>
              <option value="PLAN">Planning</option>
              <option value="PURCHASING">Purchasing</option>
              <option value="LOGISTICS">Logistics</option>
            </select>

            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="3">Last 3 months</option>
                <option value="6">Last 6 months</option>
                <option value="12">Last 12 months</option>
              </select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">Loading analytics data...</p>
          </div>
        ) : (
          <>
            {/* Overview Stats */}
            {overview && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  title="Total KPIs"
                  value={overview.overview.totalKPIs}
                  icon={BarChart3}
                  color="#3b82f6"
                  subtitle={`${selectedDepartment || "All departments"}`}
                />
                <StatCard
                  title="On Target"
                  value={overview.overview.onTarget}
                  icon={CheckCircle}
                  color="#10b981"
                  subtitle={`${(
                    (overview.overview.onTarget / overview.overview.totalKPIs) *
                    100
                  ).toFixed(1)}% of total`}
                />
                <StatCard
                  title="Off Target"
                  value={overview.overview.offTarget}
                  icon={XCircle}
                  color="#ef4444"
                  subtitle={`${(
                    (overview.overview.offTarget /
                      overview.overview.totalKPIs) *
                    100
                  ).toFixed(1)}% of total`}
                />
                <StatCard
                  title="Performance Rate"
                  value={`${overview.overview.performanceRate.toFixed(1)}%`}
                  icon={Target}
                  color="#f59e0b"
                  subtitle="Overall achievement"
                />
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* KPI Status Distribution */}
              {overview && pieData.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <PieChartIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      KPI Status Distribution
                    </h3>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name}: ${
                            percent ? (percent * 100).toFixed(0) : 0
                          }%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Department Performance */}
              {departmentPerformance.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <Users className="h-5 w-5 text-gray-500 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Department Performance
                    </h3>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={departmentPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="department"
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="performanceRate"
                        fill="#3b82f6"
                        name="Performance Rate %"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Top Performers */}
            {topPerformers.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-gray-500 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Top Performing KPIs
                    </h3>
                  </div>
                  <span className="text-sm text-gray-500">
                    Achievement Rate
                  </span>
                </div>
                <div className="space-y-4">
                  {topPerformers.slice(0, 5).map((kpi, index) => (
                    <div
                      key={kpi.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                              index === 0
                                ? "bg-yellow-500"
                                : index === 1
                                ? "bg-gray-400"
                                : index === 2
                                ? "bg-orange-500"
                                : "bg-blue-500"
                            }`}
                          >
                            {index + 1}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {kpi.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {kpi.department}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {kpi.achievementRate.toFixed(1)}%
                        </p>
                        <p className="text-sm text-gray-500">
                          {kpi.currentValue} / {kpi.target} {kpi.unit}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent KPIs */}
            {overview && overview.kpis.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-6">
                  <Activity className="h-5 w-5 text-gray-500 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Recent KPI Updates
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {overview.kpis.slice(0, 6).map((kpi) => (
                    <KPICard key={kpi.id} kpi={kpi} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;
