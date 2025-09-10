// src/services/key-performance.service.ts
import { fetchApi, getAuthHeader } from "@/services/api-services";

// Types
export interface KPI {
  id: string;
  name: string;
  description?: string;
  department: string;
  type: string;
  frequency: string;
  target?: number;
  unit?: string;
  category: string;
  priority: string;
  minThreshold?: number;
  maxThreshold?: number;
  baseline?: number;
  formula?: string;
  dataSource?: string;
  isCalculated: boolean;
  parentKpiId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
  owner?: {
    id: string;
    name: string;
    email: string;
  };
  entries?: KPIEntry[];
  _count?: {
    entries: number;
    alerts: number;
    comments: number;
  };
}

export interface KPIEntry {
  id: string;
  kpiId: string;
  value: number;
  period: string;
  notes?: string;
  status: string;
  trendDirection?: string;
  varianceFromTarget?: number;
  dataQuality: string;
  isEstimated: boolean;
  confidenceLevel?: number;
  isApproved: boolean;
  approvedById?: string;
  approvedBy?: {
    id: string;
    name: string;
    email: string;
  };
  approvedAt?: string;
  previousValue?: number;
  changeReason?: string;
  createdAt: string;
  enteredBy?: {
    id: string;
    name: string;
    email: string;
  };
  kpi?: {
    id: string;
    name: string;
    unit?: string;
    target?: number;
  };
}

export interface KPIAnalytics {
  kpi: {
    id: string;
    name: string;
    unit?: string;
    target?: number;
    frequency: string;
  };
  analytics: {
    totalEntries: number;
    currentValue?: number;
    average: number;
    min?: number;
    max?: number;
    trend: string;
    targetAchievement?: {
      achieved: number;
      total: number;
      percentage: number;
    };
  };
  entries: KPIEntry[];
  targets: Array<{
    id: string;
    period: string;
    targetValue: number;
    stretchTarget?: number;
    minAcceptable?: number;
  }>;
}

export interface DepartmentSummary {
  department: string;
  stats: {
    totalKPIs: number;
    kpisWithData: number;
    onTarget: number;
    atRisk: number;
    offTarget: number;
    activeAlerts: number;
  };
  kpis: KPI[];
}

// Simple Analytics Types
export interface KPIStats {
  kpi: {
    id: string;
    name: string;
    unit?: string;
  };
  stats: {
    current: number;
    previous: number;
    change: number;
    changePercent: number;
    average: number;
    highest: number;
    lowest: number;
    target: number;
    targetAchieved: boolean;
    totalEntries: number;
  };
  chartData: Array<{
    date: string;
    value: number;
    target?: number;
  }>;
}

export interface KPIOverview {
  overview: {
    totalKPIs: number;
    onTarget: number;
    offTarget: number;
    noData: number;
    performanceRate: number;
  };
  kpis: Array<{
    id: string;
    name: string;
    department: string;
    currentValue: number;
    target: number;
    unit?: string;
    status: string;
    lastUpdated?: string;
  }>;
}

export interface DepartmentPerformance {
  department: string;
  totalKPIs: number;
  withData: number;
  onTarget: number;
  performanceRate: number;
}

export interface KPITrend {
  month: string;
  average: number;
  count: number;
  target?: number;
}

export interface KPITrends {
  kpi: {
    name: string;
    unit?: string;
  };
  trends: KPITrend[];
}

export interface TopPerformer {
  id: string;
  name: string;
  department: string;
  currentValue: number;
  target: number;
  unit?: string;
  achievementRate: number;
  lastUpdated: string;
}

export interface CreateKPIRequest {
  name: string;
  description?: string;
  department: string;
  type: string;
  frequency: string;
  target?: number;
  unit?: string;
  category?: string;
  priority?: string;
  minThreshold?: number;
  maxThreshold?: number;
  baseline?: number;
  formula?: string;
  dataSource?: string;
  isCalculated?: boolean;
  parentKpiId?: string;
  reviewFrequency?: string;
  ownerId?: string;
}

export interface CreateKPIEntryRequest {
  value: number;
  period: string;
  notes?: string;
  dataQuality?: string;
  isEstimated?: boolean;
  confidenceLevel?: number;
  changeReason?: string;
}

export interface KPIFilters {
  page?: number;
  limit?: number;
  department?: string;
  category?: string;
  priority?: string;
  isActive?: boolean;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface EntryFilters {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  status?: string;
  isApproved?: boolean;
}

// KPI Service Class
export class KeyPerformanceService {
  private baseUrl = "/kpis";

  // KPI Management
  async getAllKPIs(filters: KPIFilters = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    return fetchApi<{
      success: boolean;
      data: {
        kpis: KPI[];
        pagination: {
          current: number;
          pages: number;
          total: number;
          limit: number;
        };
      };
    }>(`${this.baseUrl}?${params.toString()}`, {
      headers: getAuthHeader(),
    });
  }

  async getKPIById(id: string, includeEntries = false, entriesLimit = 10) {
    const params = new URLSearchParams({
      includeEntries: includeEntries.toString(),
      entriesLimit: entriesLimit.toString(),
    });

    return fetchApi<{
      success: boolean;
      data: KPI;
    }>(`${this.baseUrl}/${id}?${params.toString()}`, {
      headers: getAuthHeader(),
    });
  }

  async createKPI(data: CreateKPIRequest) {
    return fetchApi<{
      success: boolean;
      message: string;
      data: KPI;
    }>(`${this.baseUrl}`, {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify(data),
    });
  }

  async updateKPI(id: string, data: Partial<CreateKPIRequest>) {
    return fetchApi<{
      success: boolean;
      message: string;
      data: KPI;
    }>(`${this.baseUrl}/${id}`, {
      method: "PUT",
      headers: getAuthHeader(),
      body: JSON.stringify(data),
    });
  }

  async deleteKPI(id: string) {
    return fetchApi<{
      success: boolean;
      message: string;
    }>(`${this.baseUrl}/${id}`, {
      method: "DELETE",
      headers: getAuthHeader(),
    });
  }

  // KPI Entries Management
  async getKPIEntries(kpiId: string, filters: EntryFilters = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    return fetchApi<{
      success: boolean;
      data: {
        entries: KPIEntry[];
        pagination: {
          current: number;
          pages: number;
          total: number;
          limit: number;
        };
      };
    }>(`${this.baseUrl}/${kpiId}/entries?${params.toString()}`, {
      headers: getAuthHeader(),
    });
  }

  async addKPIEntry(kpiId: string, data: CreateKPIEntryRequest) {
    return fetchApi<{
      success: boolean;
      message: string;
      data: KPIEntry;
    }>(`${this.baseUrl}/${kpiId}/entries`, {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify(data),
    });
  }

  async getKPIEntryById(entryId: string) {
    return fetchApi<{
      success: boolean;
      data: KPIEntry;
    }>(`${this.baseUrl}/entries/${entryId}`, {
      headers: getAuthHeader(),
    });
  }

  async updateKPIEntry(entryId: string, data: Partial<CreateKPIEntryRequest>) {
    return fetchApi<{
      success: boolean;
      message: string;
      data: KPIEntry;
    }>(`${this.baseUrl}/entries/${entryId}`, {
      method: "PUT",
      headers: getAuthHeader(),
      body: JSON.stringify(data),
    });
  }

  async approveKPIEntry(entryId: string) {
    return fetchApi<{
      success: boolean;
      message: string;
      data: KPIEntry;
    }>(`${this.baseUrl}/entries/${entryId}/approve`, {
      method: "PATCH",
      headers: getAuthHeader(),
    });
  }

  async deleteKPIEntry(entryId: string) {
    return fetchApi<{
      success: boolean;
      message: string;
    }>(`${this.baseUrl}/entries/${entryId}`, {
      method: "DELETE",
      headers: getAuthHeader(),
    });
  }

  // Original Analytics
  async getKPIAnalytics(
    id: string, 
    startDate?: string, 
    endDate?: string, 
    groupBy = 'month'
  ) {
    const params = new URLSearchParams({ groupBy });
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    return fetchApi<{
      success: boolean;
      data: KPIAnalytics;
    }>(`${this.baseUrl}/${id}/analytics?${params.toString()}`, {
      headers: getAuthHeader(),
    });
  }

  async getDepartmentSummary(department: string) {
    return fetchApi<{
      success: boolean;
      data: DepartmentSummary;
    }>(`${this.baseUrl}/department/${department}/summary`, {
      headers: getAuthHeader(),
    });
  }

  // ========== SIMPLE ANALYTICS METHODS ==========

  // Get basic KPI statistics
  async getKPIStats(id: string, months = 6) {
    const params = new URLSearchParams({ months: months.toString() });

    return fetchApi<{
      success: boolean;
      data: KPIStats;
    }>(`${this.baseUrl}/${id}/stats?${params.toString()}`, {
      headers: getAuthHeader(),
    });
  }

  // Get overview of all KPIs
  async getKPIOverview(department?: string) {
    const params = new URLSearchParams();
    if (department) params.append('department', department);

    return fetchApi<{
      success: boolean;
      data: KPIOverview;
    }>(`${this.baseUrl}/analytics/overview?${params.toString()}`, {
      headers: getAuthHeader(),
    });
  }

  // Get department performance comparison
  async getDepartmentPerformance() {
    return fetchApi<{
      success: boolean;
      data: DepartmentPerformance[];
    }>(`${this.baseUrl}/analytics/departments`, {
      headers: getAuthHeader(),
    });
  }

  // Get monthly trends for a KPI
  async getKPITrends(id: string, months = 12) {
    const params = new URLSearchParams({ months: months.toString() });

    return fetchApi<{
      success: boolean;
      data: KPITrends;
    }>(`${this.baseUrl}/${id}/trends?${params.toString()}`, {
      headers: getAuthHeader(),
    });
  }

  // Get top performing KPIs
  async getTopPerformingKPIs(limit = 10, department?: string) {
    const params = new URLSearchParams({ limit: limit.toString() });
    if (department) params.append('department', department);

    return fetchApi<{
      success: boolean;
      data: TopPerformer[];
    }>(`${this.baseUrl}/analytics/top-performers?${params.toString()}`, {
      headers: getAuthHeader(),
    });
  }
}

// Export singleton instance
export const kpiService = new KeyPerformanceService();