"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { driverService } from "@/services/driver.services";
import { useDriverUpdates } from "@/hooks/useDriver";
import { DriverUpdate } from "@/types/adminemploye";
import { 
  FileEdit, Trash2, Download, Plus, 
  Search, Filter, CheckCircle, AlertTriangle 
} from "lucide-react";

export default function DriverUpdatesAdminPage() {
  const { user, isLoading: authLoading } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const isAuthenticated = !!user;
  
  const router = useRouter();
  const { driverUpdates, loading, error } = useDriverUpdates(driverService);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRequired, setFilterRequired] = useState<boolean | null>(null);
  const [filteredUpdates, setFilteredUpdates] = useState<DriverUpdate[]>([]);
  
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Check if user is authenticated and is an admin
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/admin/login");
    } else if (!authLoading && !isAdmin) {
      router.push("/dashboard");
    }
  }, [authLoading, isAuthenticated, isAdmin, router]);
  
  // Filter driver updates based on search and filters
  useEffect(() => {
    if (!driverUpdates) return;
    
    let filtered = [...driverUpdates];
    
    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(update => 
        update.title.toLowerCase().includes(search) || 
        update.version.toLowerCase().includes(search) ||
        (update.description && update.description.toLowerCase().includes(search))
      );
    }
    
    // Apply required filter
    if (filterRequired !== null) {
      filtered = filtered.filter(update => update.isRequired === filterRequired);
    }
    
    setFilteredUpdates(filtered);
  }, [driverUpdates, searchTerm, filterRequired]);

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true);
      setDeleteError(null);
      setDeleteSuccess(null);
      
      await driverService.delete(id);
      
      // Update list after successful deletion
      setFilteredUpdates(prev => prev.filter(update => update.id !== id));
      setDeleteSuccess("Driver update deleted successfully");
      setDeleteConfirm(null);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setDeleteSuccess(null);
      }, 3000);
    } catch (err: any) {
      setDeleteError(err.response?.data?.message || "Failed to delete driver update");
    } finally {
      setIsDeleting(false);
    }
  };

  // Format version into semantic versioning style for comparison
  const formatVersion = (version: string) => {
    return version.split('.').map(num => num.padStart(10, '0')).join('.');
  };

  // Loading state
  if (authLoading || loading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-t-[#E85C23] border-[#E85C23]/30 animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading driver updates...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-8">
        <div className="rounded-lg bg-red-50 p-4 flex items-start border border-red-100">
          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-red-800">Error loading driver updates</h3>
            <p className="mt-1 text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Only render content if user is authenticated and admin
  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="h-full overflow-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Driver Updates Management</h1>
          <p className="text-gray-500">Manage application versions and updates</p>
        </div>
        <Link
          href="/admin/driver/createdriver"
          className="flex items-center px-4 py-2 bg-[#E85C23] text-white rounded-lg hover:bg-[#d14b17] transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Upload New Update
        </Link>
      </div>

      {deleteSuccess && (
        <div className="mb-6 rounded-lg bg-green-50 p-4 flex items-start border border-green-100">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-green-800">{deleteSuccess}</h3>
          </div>
        </div>
      )}

      {deleteError && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 flex items-start border border-red-100">
          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-red-800">{deleteError}</h3>
          </div>
        </div>
      )}

      {/* Search and filters */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search version or title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-[#E85C23] focus:border-[#E85C23]"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              value={filterRequired === null ? "" : filterRequired ? "required" : "optional"}
              onChange={(e) => {
                if (e.target.value === "") setFilterRequired(null);
                else setFilterRequired(e.target.value === "required");
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#E85C23] focus:border-[#E85C23]"
            >
              <option value="">All Updates</option>
              <option value="required">Required Updates</option>
              <option value="optional">Optional Updates</option>
            </select>
          </div>
        </div>
      </div>

      {/* Driver updates list */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        {filteredUpdates.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No driver updates found matching your criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Version
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Release Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUpdates
                  .sort((a, b) => formatVersion(b.version).localeCompare(formatVersion(a.version))) // Sort by version descending
                  .map((update) => (
                    <tr key={update.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          v{update.version}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="truncate max-w-md">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {update.title}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          update.isRequired 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {update.isRequired ? 'Required' : 'Optional'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(update.releaseDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {deleteConfirm === update.id ? (
                          <div className="flex justify-end items-center space-x-2">
                            <span className="text-sm text-red-600">Confirm?</span>
                            <button
                              onClick={() => handleDelete(update.id)}
                              disabled={isDeleting}
                              className="text-red-600 hover:text-red-900"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              disabled={isDeleting}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-end space-x-3">
                            {update.fileUrl && (
                              <a
                                href={update.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-600 hover:text-green-900"
                                title="Download"
                              >
                                <Download className="h-5 w-5" />
                              </a>
                            )}
                            <Link
                              href={`/admin/drivers/edit/${update.id}`}
                              className="text-blue-600 hover:text-blue-900"
                              title="Edit"
                            >
                              <FileEdit className="h-5 w-5" />
                            </Link>
                            <button
                              onClick={() => setDeleteConfirm(update.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}