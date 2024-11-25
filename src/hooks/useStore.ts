import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, Role, Permission } from "../types/index";
import { users as initialUsers } from "../features/users/UserList";
import { roles as initialRoles } from "../features/roles/RoleList";
import { permissions as initialPermissions } from "../features/permissions/PermissionList";

const usersSlice = createSlice({
  name: "users",
  initialState: initialUsers,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.push({
        ...action.payload,
        id: crypto.getRandomValues(new Uint32Array(1))[0],
      });
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.findIndex((u) => u.id === action.payload.id);
      if (index >= 0) {
        state[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      return state.filter((u) => u.id !== action.payload);
    },
  },
});

const rolesSlice = createSlice({
  name: "roles",
  initialState: initialRoles,
  reducers: {
    addRole: (state, action: PayloadAction<Role>) => {
      // console.log(action.payload);
      action.payload.permissions = action.payload.permissions.map((p) =>
        Number(p)
      );
      state.push(action.payload);
    },
    updateRole: (state, action: PayloadAction<Role>) => {
      const index = state.findIndex((r) => r.id === action.payload.id);
      if (index >= 0) {
        state[index] = action.payload;
      }
      action.payload.permissions = action.payload.permissions.map((p) =>
        Number(p)
      );
    },
    deleteRole: (state, action: PayloadAction<number>) => {
      return state.filter((r) => r.id !== action.payload);
    },
  },
});

const permissionsSlice = createSlice({
  name: "permissions",
  initialState: initialPermissions,
  reducers: {
    addPermission: (state, action: PayloadAction<Permission>) => {
      action.payload.id = Number(action.payload.id);
      state.push(action.payload);
    },
    updatePermission: (state, action: PayloadAction<Permission>) => {
      const index = state.findIndex((p) => p.id === action.payload.id);
      if (index >= 0) {
        state[index] = action.payload;
      }
    },
    deletePermission: (state, action: PayloadAction<number>) => {
      return state.filter((p) => p.id !== action.payload);
    },
  },
});

const searchSlice = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    roles: rolesSlice.reducer,
    permissions: permissionsSlice.reducer,
    search: searchSlice.reducer,
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;
export const { addRole, updateRole, deleteRole } = rolesSlice.actions;
export const { addPermission, updatePermission, deletePermission } =
  permissionsSlice.actions;
export const { setSearchTerm } = searchSlice.actions;

export const selectUsers = (state: ReturnType<typeof store.getState>) =>
  state.users;
export const selectRoles = (state: ReturnType<typeof store.getState>) =>
  state.roles;
export const selectPermissions = (state: ReturnType<typeof store.getState>) =>
  state.permissions;
export const selectSearchTerm = (state: ReturnType<typeof store.getState>) =>
  state.search;

export default store;
