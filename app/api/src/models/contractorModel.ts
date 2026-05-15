import { db } from '../db.js';
import { httpError } from '../utils/response.js';
import type { Contractor } from '@repo/types';

export async function listContractors(): Promise<Contractor[]> {
  const { data, error } = await db.from('contractors').select('*').order('created_at', { ascending: false });
  if (error) throw httpError(error.message, 500);
  return data as Contractor[];
}

export async function getContractor(id: string): Promise<Contractor> {
  const { data, error } = await db.from('contractors').select('*').eq('id', id).single();
  if (error) throw httpError('Contractor not found', 404);
  return data as Contractor;
}

export async function updateContractorStatus(id: string, status: string): Promise<Contractor> {
  const { data, error } = await db
    .from('contractors')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  if (error) throw httpError(error.message, 500);
  return data as Contractor;
}
