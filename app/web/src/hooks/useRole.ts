import { UserRole } from '@repo/types';
import { useAuth } from './useAuth';

export function useRole() {
  const { role } = useAuth();

  return {
    role,
    isAdmin: role === 'admin',
    isContractor: role === 'contractor',
    isHomeowner: role === 'homeowner',
    hasRole: (r: UserRole) => role === r,
    hasAnyRole: (...roles: UserRole[]) => role !== null && roles.includes(role),
  };
}
