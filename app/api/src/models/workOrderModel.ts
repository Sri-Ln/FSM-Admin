import { db } from '../db.js';
import { httpError } from '../utils/response.js';
import type { WorkOrder } from '@repo/types';

export async function listWorkOrders(): Promise<WorkOrder[]> {
  const { data, error } = await db.from('work_orders').select('*').order('created_at', { ascending: false });
  if (error) throw httpError(error.message, 500);
  return data as WorkOrder[];
}

export async function getWorkOrder(id: string): Promise<WorkOrder> {
  const { data, error } = await db.from('work_orders').select('*').eq('id', id).single();
  if (error) throw httpError('Work order not found', 404);
  return data as WorkOrder;
}

export async function updateWorkOrderStatus(id: string, status: string): Promise<WorkOrder> {
  const { data, error } = await db
    .from('work_orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw httpError(error.message, 500);
  return data as WorkOrder;
}
