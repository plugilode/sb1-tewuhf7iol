import { useState } from 'react';
import { UserService } from '../db/services/UserService';
import { User, UserRole, UserPermissions } from '../types';

const getRolePermissions = (role: UserRole): UserPermissions => {
  switch (role) {
    case 'OWNER':
      return {
        canVerify: true,
        canEdit: true,
        canDelete: true,
        canAddUsers: true,
        canModifyRoles: true,
        canExportData: true,
        canAccessAI: true,
        canManageSystem: true
      };
    case 'ADMIN':
      return {
        canVerify: true,
        canEdit: true,
        canDelete: true,
        canAddUsers: true,
        canModifyRoles: false,
        canExportData: true,
        canAccessAI: true,
        canManageSystem: true
      };
    case 'MOD':
      return {
        canVerify: true,
        canEdit: true,
        canDelete: false,
        canAddUsers: false,
        canModifyRoles: false,
        canExportData: true,
        canAccessAI: true,
        canManageSystem: false
      };
    case 'USER':
      return {
        canVerify: true,
        canEdit: false,
        canDelete: false,
        canAddUsers: false,
        canModifyRoles: false,
        canExportData: true,
        canAccessAI: true,
        canManageSystem: false
      };
  }
};

export const useAuth = () => {
  const [auth, setAuth] = useState<{
    user: User | null;
    isAuthenticated: boolean;
    permissions: UserPermissions;
  }>({
    user: null,
    isAuthenticated: false,
    permissions: getRolePermissions('USER')
  });

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const user = await UserService.authenticate(username, password);
      if (user) {
        const permissions = getRolePermissions(user.role);
        setAuth({
          user,
          isAuthenticated: true,
          permissions
        });
        return true;
      }
    } catch (error) {
      console.error('Login error:', error);
    }
    return false;
  };

  const logout = () => {
    setAuth({
      user: null,
      isAuthenticated: false,
      permissions: getRolePermissions('USER')
    });
  };

  return { ...auth, login, logout };
};