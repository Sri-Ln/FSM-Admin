export type UserRole = 'admin' | 'contractor' | 'homeowner';

export type JobStatus =
  | 'draft'
  | 'pending'
  | 'quoted'
  | 'accepted'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type WorkOrderStatus =
  | 'pending'
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type ContractorStatus = 'pending' | 'approved' | 'suspended';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  fullName: string | null;
  avatarUrl: string | null;
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  status: JobStatus;
  homeownerId: string;
  contractorId: string | null;
  address: string;
  estimatedCost: number | null;
  finalCost: number | null;
  scheduledAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface WorkOrder {
  id: string;
  jobId: string;
  contractorId: string;
  status: WorkOrderStatus;
  description: string;
  estimatedHours: number | null;
  actualHours: number | null;
  scheduledAt: string | null;
  completedAt: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Contractor {
  id: string;
  userId: string;
  businessName: string;
  licenseNumber: string | null;
  phone: string | null;
  status: ContractorStatus;
  rating: number | null;
  totalJobs: number;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  error: null;
}

export interface ApiError {
  data: null;
  error: {
    message: string;
    code?: string;
  };
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
