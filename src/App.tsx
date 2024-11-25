import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Section, User, Role, Permission } from "./types";
import {
  selectSearchTerm,
  setSearchTerm,
  addUser,
  updateUser,
  deleteUser,
  addRole,
  updateRole,
  deleteRole,
  addPermission,
  updatePermission,
  deletePermission,
} from "./hooks/useStore";
import Sidebar from "./components/Sidebar";
import UserTable from "./components/tables/UserTable";
import RoleTable from "./components/tables/RoleTable";
import PermissionTable from "./components/tables/PermissionTable";
import Modal from "./components/Modal";
import SearchBar from "./components/SearchBar";
import UserForm from "./features/users/UserForm";
import RoleForm from "./features/roles/RoleForm";
import PermissionForm from "./features/permissions/PermissionForm";
import { IoMdAdd } from "react-icons/io";

export default function App() {
  const [activeTab, setActiveTab] = useState<Section>("users");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<User | Role | Permission | null>(
    null
  );

  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);

  const handleAdd = () => {
    setEditItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: User | Role | Permission) => {
    setEditItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    switch (activeTab) {
      case "users":
        dispatch(deleteUser(id));
        break;
      case "roles":
        dispatch(deleteRole(id));
        break;
      case "permissions":
        dispatch(deletePermission(id));
        break;
    }
  };

  const handleSubmit = (data: User | Role | Permission) => {
    switch (activeTab) {
      case "users":
        if (editItem) {
          dispatch(updateUser(data as User));
        } else {
          dispatch(addUser(data as User));
        }
        break;
      case "roles":
        if (editItem) {
          dispatch(updateRole(data as Role));
        } else {
          dispatch(addRole(data as Role));
        }
        break;
      case "permissions":
        if (editItem) {
          dispatch(updatePermission(data as Permission));
        } else {
          dispatch(addPermission(data as Permission));
        }
        break;
    }
    setIsModalOpen(false);
  };

  const renderForm = () => {
    switch (activeTab) {
      case "users":
        return (
          <UserForm
            user={editItem as User}
            onSubmit={handleSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        );
      case "roles":
        return (
          <RoleForm
            role={editItem as Role}
            onSubmit={handleSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        );
      case "permissions":
        return (
          <PermissionForm
            permission={editItem as Permission}
            onSubmit={handleSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        );
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UserTable onEdit={handleEdit} onDelete={handleDelete} />;
      case "roles":
        return <RoleTable onEdit={handleEdit} onDelete={handleDelete} />;
      case "permissions":
        return <PermissionTable onEdit={handleEdit} onDelete={handleDelete} />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:justify-between sm:items-center mb-8">
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="w-full sm:w-64">
                <SearchBar
                  value={searchTerm}
                  onChange={(term) => dispatch(setSearchTerm(term))}
                  placeholder={`Search ${activeTab}...`}
                />
              </div>
              <div className="flex float-right items-center space-x-4">
                <button
                  onClick={handleAdd}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:shadow-lg transition-transform transform hover:scale-105">
                  <IoMdAdd size={20} />
                  Add {activeTab.slice(0, -1)}
                </button>
              </div>
            </div>
          </div>
          {renderContent()}
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${editItem ? "Edit" : "Add"} ${activeTab.slice(0, -1)}`}>
        {renderForm()}
      </Modal>
    </div>
  );
}
