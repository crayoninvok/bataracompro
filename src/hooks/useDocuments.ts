import { useState, useEffect } from 'react';
import { Document } from '../types/adminemploye';

// Define the structure of the document service for DI
export interface DocumentService {
  upload: (formData: FormData) => Promise<Document>;
  getUserDocuments: (userId: string) => Promise<Document[]>;
  getDocument: (id: string) => Promise<Document>;
  delete: (id: string) => Promise<any>;
}

export const useUserDocuments = (documentService: DocumentService, userId: string) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!userId) return;
      
      try {
        setLoading(true);
        const data = await documentService.getUserDocuments(userId);
        setDocuments(data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch documents');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [documentService, userId]);

  return { documents, loading, error };
};

export const useDocument = (documentService: DocumentService, id: string) => {
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await documentService.getDocument(id);
        setDocument(data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch document');
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [documentService, id]);

  return { document, loading, error };
};

export const useDocumentUpload = (documentService: DocumentService) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const uploadDocument = async (formData: FormData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      await documentService.upload(formData);
      setSuccess(true);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to upload document');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      await documentService.delete(id);
      setSuccess(true);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete document');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { uploadDocument, deleteDocument, loading, error, success };
};