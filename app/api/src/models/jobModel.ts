import { db } from '../db.js';
import { httpError } from '../utils/response.js';
import type { Job } from '@repo/types';

export async function listJobs(): Promise<Job[]> {
  const { data, error } = await db.from('jobs').select('*').order('created_at', { ascending: false });
  if (error) throw httpError(error.message, 500);
  return data as Job[];
}

export async function getJob(id: string): Promise<Job> {
  const { data, error } = await db.from('jobs').select('*').eq('id', id).single();
  if (error) throw httpError('Job not found', 404);
  return data as Job;
}

export async function updateJobStatus(id: string, status: string): Promise<Job> {
  const { data, error } = await db
    .from('jobs')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw httpError(error.message, 500);
  return data as Job;
}
