import { useSelector } from "react-redux";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { Permission } from "../../types/index";
import { selectPermissions, selectSearchTerm } from "../../hooks/useStore";

interface PermissionTableProps {
  onEdit: (permission: Permission) => void;
  onDelete: (permissionId: number) => void;
}

export default function PermissionTable({
  onEdit,
  onDelete,
}: PermissionTableProps) {
  const permissions = useSelector(selectPermissions);
  const searchTerm = useSelector(selectSearchTerm);

  const filteredPermissions = permissions.filter(
    (permission) =>
      permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.id.toString().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Permission
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredPermissions.map((permission) => (
            <tr key={permission.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {permission.id}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {permission.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {permission.description}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(permission)}
                  className="text-indigo-600 hover:text-indigo-900 mr-4">
                  <FaRegEdit size={16} />
                </button>
                <button
                  onClick={() => onDelete(permission.id)}
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
