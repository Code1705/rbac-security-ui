import { useSelector } from "react-redux";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { User } from "../../types/index";
import {
  selectUsers,
  selectRoles,
  selectSearchTerm,
} from "../../hooks/useStore";

interface UserTableProps {
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
}

export default function UserTable({ onEdit, onDelete }: UserTableProps) {
  const users = useSelector(selectUsers);
  const roles = useSelector(selectRoles);
  const searchTerm = useSelector(selectSearchTerm);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      roles
        .find((role) => role.id === user.roleId)
        ?.name.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const getRoleName = (roleId: number) => {
    // console.log(roles, roleId);
    return roles.find((role) => role.id === Number(roleId))?.name || "Unknown";
  };

  function getBackgroundColorClass(roleId: number): string {
    // console.log(roleId, roles);
    const role = roles.find((role) => role.id == roleId);
    // console.log("found", role);
    if (!role) return "gray";
    return role.color;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Updated
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="text-sm font-medium text-gray-900">
                    {user.name}
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  style={{
                    backgroundColor: getBackgroundColorClass(user.roleId),
                  }}
                  className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white">
                  {getRoleName(user.roleId)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${
                    user.status === "active" ? "bg-green-800" : "bg-red-800"
                  }`}>
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(user.createdAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(user.updatedAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(user)}
                  className="text-indigo-600 hover:text-indigo-900 mr-4">
                  <FaRegEdit size={16} />
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="text-red-600 hover:text-red-900">
                  <FaTrash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
