"use client";
import React, { useState } from "react";
import { X, Save, AlertCircle } from "lucide-react";
import { kpiService, CreateKPIEntryRequest, KPI } from "@/services/key-performace.services";

interface AddEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  kpi: KPI;
}

const AddEntryModal: React.FC<AddEntryModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  kpi,
}) => {
  const [formData, setFormData] = useState<CreateKPIEntryRequest>({
    value: 0,
    period: new Date().toISOString().split('T')[0], // Today's date
    notes: "",
    dataQuality: "GOOD",
    isEstimated: false,
    confidenceLevel: 100,
    changeReason: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (type === "number") {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.value || !formData.period) {
      setError("Value and period are required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await kpiService.addKPIEntry(kpi.id, formData);
      onSuccess();
      onClose();
      // Reset form
      setFormData({
        value: 0,
        period: new Date().toISOString().split('T')[0],
        notes: "",
        dataQuality: "GOOD",
        isEstimated: false,
        confidenceLevel: 100,
        changeReason: "",
      });
    } catch (error) {
      console.error("Failed to add entry:", error);
      setError("Failed to add entry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateVariance = () => {
    if (kpi.target && formData.value) {
      return ((formData.value - kpi.target) / kpi.target * 100).toFixed(1);
    }
    return null;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Add Entry for {kpi.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Value */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Value <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="value"
                  value={formData.value}
                  onChange={handleInputChange}
                  step="0.01"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter value"
                />
                {kpi.unit && (
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    {kpi.unit}
                  </span>
                )}
              </div>
              {kpi.target && formData.value && (
                <p className="text-xs text-gray-500 mt-1">
                  Target: {kpi.target}{kpi.unit} • Variance: {calculateVariance()}%
                </p>
              )}
            </div>

            {/* Period */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Period <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="period"
                value={formData.period}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Data Quality */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Quality
              </label>
              <select
                name="dataQuality"
                value={formData.dataQuality}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="EXCELLENT">Excellent</option>
                <option value="GOOD">Good</option>
                <option value="FAIR">Fair</option>
                <option value="POOR">Poor</option>
              </select>
            </div>

            {/* Confidence Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confidence Level (%)
              </label>
              <input
                type="number"
                name="confidenceLevel"
                value={formData.confidenceLevel}
                onChange={handleInputChange}
                min="0"
                max="100"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Is Estimated */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isEstimated"
              id="isEstimated"
              checked={formData.isEstimated}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="isEstimated" className="text-sm font-medium text-gray-700">
              This is an estimated value
            </label>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Any additional notes or context..."
            />
          </div>

          {/* Change Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Change Reason
            </label>
            <input
              type="text"
              name="changeReason"
              value={formData.changeReason}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Reason for any significant change..."
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Add Entry
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEntryModal;