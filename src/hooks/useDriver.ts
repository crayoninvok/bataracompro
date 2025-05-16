import { useState, useEffect } from 'react';
import { DriverUpdate } from '../types/adminemploye';

// Define the structure of the driver service for DI
export interface DriverService {
  getAll: () => Promise<DriverUpdate[]>;
  getLatest: () => Promise<DriverUpdate>;
  create: (formData: FormData) => Promise<DriverUpdate>;
  update: (id: string, formData: FormData) => Promise<DriverUpdate>;
  delete: (id: string) => Promise<any>;
}

export const useDriverUpdates = (driverService: DriverService) => {
  const [driverUpdates, setDriverUpdates] = useState<DriverUpdate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDriverUpdates = async () => {
      try {
        setLoading(true);
        const data = await driverService.getAll();
        setDriverUpdates(data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch driver updates');
      } finally {
        setLoading(false);
      }
    };

    fetchDriverUpdates();
  }, [driverService]);

  return { driverUpdates, loading, error };
};

export const useLatestDriverUpdate = (driverService: DriverService) => {
  const [latestUpdate, setLatestUpdate] = useState<DriverUpdate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestUpdate = async () => {
      try {
        setLoading(true);
        const data = await driverService.getLatest();
        setLatestUpdate(data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch latest driver update');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestUpdate();
  }, [driverService]);

  return { latestUpdate, loading, error };
};

export const useDriverUpdateSubmit = (driverService: DriverService) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const createDriverUpdate = async (formData: FormData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      await driverService.create(formData);
      setSuccess(true);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create driver update');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateDriverUpdate = async (id: string, formData: FormData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      await driverService.update(id, formData);
      setSuccess(true);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update driver update');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createDriverUpdate, updateDriverUpdate, loading, error, success };
};