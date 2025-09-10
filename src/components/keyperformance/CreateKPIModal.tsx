import React, { useState } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { kpiService, CreateKPIRequest } from '@/services/key-performace.services';

interface CreateKPIFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateKPIForm: React.FC<CreateKPIFormProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState<CreateKPIRequest>({
    name: '',
    description: '',
    department: 'OPERATIONS',
    type: 'NUMBER',
    frequency: 'MONTHLY',
    target: undefined,
    unit: '',
    category: 'OPERATIONAL',
    priority: 'MEDIUM',
    minThreshold: undefined,
    maxThreshold: undefined,
    baseline: undefined,
    formula: '',
    dataSource: '',
    isCalculated: false,
    parentKpiId: undefined,
    reviewFrequency: 'MONTHLY',
    ownerId: undefined
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.department) {
      newErrors.department = 'Department is required';
    }
    if (!formData.type) {
      newErrors.type = 'Type is required';
    }
    if (!formData.frequency) {
      newErrors.frequency = 'Frequency is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      await kpiService.createKPI(formData);
      onSuccess();
      onClose();
      setFormData({
        name: '',
        description: '',
        department: 'OPERATIONS',
        type: 'NUMBER',
        frequency: 'MONTHLY',
        target: undefined,
        unit: '',
        category: 'OPERATIONAL',
        priority: 'MEDIUM',
        minThreshold: undefined,
        maxThreshold: undefined,
        baseline: undefined,
        formula: '',
        dataSource: '',
        isCalculated: false,
        parentKpiId: undefined,
        reviewFrequency: 'MONTHLY',
        ownerId: undefined
      });
    } catch (error: any) {
      setErrors({ submit: error.message || 'Failed to create KPI' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof CreateKPIRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create New KPI</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Error Message */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700">{errors.submit}</span>
              </div>
            )}

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  KPI Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter KPI name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe what this KPI measures"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.department ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="HRGA">HR & GA</option>
                  <option value="ENGINEERING">Engineering</option>
                  <option value="PLAN">Planning</option>
                  <option value="FINANCE">Finance</option>
                  <option value="OPERATIONS">Operations</option>
                  <option value="SUPPORT">Support</option>
                  <option value="PURCHASING">Purchasing</option>
                  <option value="LOGISTICS">Logistics</option>
                </select>
                {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
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
                  Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.type ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="PERCENTAGE">Percentage</option>
                  <option value="NUMBER">Number</option>
                  <option value="CURRENCY">Currency</option>
                  <option value="RATIO">Ratio</option>
                  <option value="BOOLEAN">Boolean</option>
                </select>
                {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frequency <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.frequency}
                  onChange={(e) => handleChange('frequency', e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.frequency ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="DAILY">Daily</option>
                  <option value="WEEKLY">Weekly</option>
                  <option value="MONTHLY">Monthly</option>
                  <option value="QUARTERLY">Quarterly</option>
                  <option value="YEARLY">Yearly</option>
                </select>
                {errors.frequency && <p className="text-red-500 text-sm mt-1">{errors.frequency}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="CRITICAL">Critical</option>
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                <input
                  type="text"
                  value={formData.unit}
                  onChange={(e) => handleChange('unit', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., %, $, units"
                />
              </div>
            </div>

            {/* Targets & Thresholds */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Targets & Thresholds</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Value</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.target || ''}
                    onChange={(e) => handleChange('target', e.target.value ? parseFloat(e.target.value) : undefined)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Target value"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Threshold</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.minThreshold || ''}
                    onChange={(e) => handleChange('minThreshold', e.target.value ? parseFloat(e.target.value) : undefined)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Minimum acceptable"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Threshold</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.maxThreshold || ''}
                    onChange={(e) => handleChange('maxThreshold', e.target.value ? parseFloat(e.target.value) : undefined)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Maximum acceptable"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Baseline</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.baseline || ''}
                    onChange={(e) => handleChange('baseline', e.target.value ? parseFloat(e.target.value) : undefined)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Starting point"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Review Frequency</label>
                  <select
                    value={formData.reviewFrequency}
                    onChange={(e) => handleChange('reviewFrequency', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="DAILY">Daily</option>
                    <option value="WEEKLY">Weekly</option>
                    <option value="MONTHLY">Monthly</option>
                    <option value="QUARTERLY">Quarterly</option>
                    <option value="YEARLY">Yearly</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Calculation */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Calculation</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isCalculated"
                    checked={formData.isCalculated}
                    onChange={(e) => handleChange('isCalculated', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isCalculated" className="ml-2 text-sm text-gray-700">
                    This is a calculated KPI
                  </label>
                </div>

                {formData.isCalculated && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Formula</label>
                    <textarea
                      value={formData.formula}
                      onChange={(e) => handleChange('formula', e.target.value)}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe the calculation formula"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data Source</label>
                  <input
                    type="text"
                    value={formData.dataSource}
                    onChange={(e) => handleChange('dataSource', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Where does the data come from?"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Create KPI
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateKPIForm;