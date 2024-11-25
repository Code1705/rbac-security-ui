import { Role } from "../../types";

export const roles: Role[] = [
  {
    id: 1,
    name: "Admin",
    color: "red",
    description: "Full access to all resources",
    permissions: [1, 2, 3, 4],
  },
  {
    id: 2,
    name: "Editor",
    color: "green",
    description: "Edit content and manage users",
    permissions: [2, 3],
  },
  {
    id: 3,
    name: "Viewer",
    color: "blue",
    description: "View content and user profiles",
    permissions: [3],
  },
  {
    id: 4,
    name: "test",
    color: "#0ff0b8",
    description: "testing",
    permissions: [1, 3],
  },
];
