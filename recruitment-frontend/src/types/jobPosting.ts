export interface JobPosting {
  id: string;
  title: string;
  description: string;
  requirements: string;
  location: string;
  salaryRange: string | null;
  department: string | null;
  contractType: string | null;
  status: string;
  createdAt: string;
  expiresAt: string | null;
  candidateCount: number;
  tags: string[];
}

export interface CreateJobPostingRequest {
  title: string;
  description: string;
  requirements: string;
  location: string;
  salaryRange?: string;
  department?: string;
  contractType?: string;
  expiresAt?: string;
  tags: string[];
}

export interface UpdateJobPostingRequest {
  title?: string;
  description?: string;
  requirements?: string;
  location?: string;
  salaryRange?: string;
  department?: string;
  contractType?: string;
  status?: string;
  expiresAt?: string;
  tags?: string[];
}