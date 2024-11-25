import { ReactNode } from "react";

export type Permission = {
  id: number;
  name: string;
  description: string;
};

export type Role = {
  id: number;
  name: string;
  color: string;
  description: string;
  permissions: number[];
};

export type User = {
  id: number;
  name: string;
  email: string;
  roleId: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
};

export type Store = {
  users: User[];
  roles: Role[];
  permissions: Permission[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
  addRole: (role: Role) => void;
  updateRole: (role: Role) => void;
  deleteRole: (id: string) => void;
  addPermission: (permission: Permission) => void;
  updatePermission: (permission: Permission) => void;
  deletePermission: (id: string) => void;
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceTime?: number;
};

export type SidebarProps = {
  activeTab: Section;
  onTabChange: (tab: Section) => void;
};

export type PermissionFormProps = {
  permission?: Permission;
  onSubmit: (data: Permission) => void;
  onCancel: () => void;
};

export type RoleFormProps = {
  role?: Role;
  onSubmit: (data: Role) => void;
  onCancel: () => void;
};

export type UserFormProps = {
  user?: User;
  onSubmit: (data: User) => void;
  onCancel: () => void;
};

export type Section = "users" | "roles" | "permissions";
