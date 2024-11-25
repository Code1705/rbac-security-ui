import { useForm } from "react-hook-form";
import { Role, RoleFormProps } from "../../types/index";
import { useSelector } from "react-redux";
import { selectPermissions, selectRoles } from "../../hooks/useStore";

export default function RoleForm({ role, onSubmit, onCancel }: RoleFormProps) {
  const permissions = useSelector(selectPermissions);
  const roles = useSelector(selectRoles);
  // console.log(roles);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Role>({
    defaultValues: role || {
      id: roles.length + 1,
      name: "",
      color: "#000000",
      description: "",
      permissions: [],
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          {...register("name", { required: "Name is required" })}
          className="mt-2 block w-full shadow-sm text-gray-700 bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Enter role name"
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          {...register("description", { required: "Description is required" })}
          className="mt-2 block w-full shadow-sm text-gray-700 bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Describe the role"
          rows={4}
          disabled={isSubmitting}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="color"
          className="block text-sm font-medium text-gray-700">
          Role Color
        </label>
        <input
          id="color"
          type="color"
          {...register("color", { required: "Color is required" })}
          className="mt-1 w-16 h-6 border-none cursor-pointer rounded-md"
          defaultValue={role?.color || "#000000"}
          disabled={isSubmitting}
        />
        {errors.color && (
          <p className="mt-1 text-sm text-red-600">{errors.color.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="permissions"
          className="block text-sm font-medium text-gray-700 mb-2">
          Permissions
        </label>
        <div className="space-y-2 max-h-48 overflow-y-auto border rounded-md p-2 bg-gray-50">
          {permissions.map((permission) => (
            <label
              key={permission.id}
              className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                {...register("permissions")}
                value={permission.id}
                defaultChecked={role?.permissions.includes(permission.id)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                disabled={isSubmitting}
              />
              <span className="text-gray-700">{permission.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          disabled={isSubmitting}>
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : role ? "Update" : "Create"} Role
        </button>
      </div>
    </form>
  );
}
