import { useSelector } from "react-redux";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { Role } from "../../types/index";
import {
  selectRoles,
  selectPermissions,
  selectSearchTerm,
} from "../../hooks/useStore";

interface RoleTableProps {
  onEdit: (role: Role) => void;
  onDelete: (roleId: number) => void;
}

export default function RoleTable({ onEdit, onDelete }: RoleTableProps) {
  const roles = useSelector(selectRoles);
  const permissions = useSelector(selectPermissions);
  const searchTerm = useSelector(selectSearchTerm);

  // console.log(permissions);
  // console.log(roles);

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.permissions.some((permId) =>
        permissions
          .find((p) => p.id === permId)
          ?.name.toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
  );

  function getTextColorClass(color: string): string {
    // console.log(color);
    if (color.startsWith("#")) {
      return `text-[${color}]`;
    }
    return `text-${color}-800`;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Permissions
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredRoles.map((role) => (
            <tr key={role.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div
                  style={{
                    color: role.color.startsWith("#") ? role.color : undefined,
                  }}
                  className={`text-sm font-medium ${role.color.startsWith("#") ? "" : getTextColorClass(role.color)}`}>
                  {role.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{role.description}</div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permId) => {
                    const permission = permissions.find((p) => p.id === permId);
                    return (
                      <span
                        key={permId}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {permission?.name}
                      </span>
                    );
                  })}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(role)}
                  className="text-indigo-600 hover:text-indigo-900 mr-4">
                  <FaRegEdit size={16} />
                </button>
                <button
                  onClick={() => onDelete(role.id)}
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
