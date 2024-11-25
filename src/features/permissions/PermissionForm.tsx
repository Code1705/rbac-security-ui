import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Permission, PermissionFormProps } from "../../types/index";
import { selectPermissions } from "../../hooks/useStore";

export default function PermissionForm({
  permission,
  onSubmit,
  onCancel,
}: PermissionFormProps) {
  const permissions = useSelector(selectPermissions);
  const existingPermissionIds = permissions.map((permission) =>
    Number(permission.id)
  );
  // console.log(existingPermissionIds);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Permission>({
    defaultValues: permission || {
      id: permissions.length + 1,
      name: "",
      description: "",
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
          placeholder="Enter permission name"
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="id" className="block text-sm font-medium text-gray-700">
          ID
        </label>
        <input
          id="id"
          type="number"
          {...register("id", {
            required: "ID is required",
            pattern: {
              value: /^[1-9][0-9]*$/,
              message:
                "ID must be a valid positive number without leading zeros",
            },
            validate: {
              unique: (value) =>
                !existingPermissionIds.includes(Number(value)) ||
                "ID must be unique",
            },
          })}
          className="mt-2 block w-full shadow-sm text-gray-700 bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Enter a unique role ID"
          disabled={isSubmitting}
        />
        {errors.id && (
          <p className="mt-1 text-sm text-red-600">{errors.id.message}</p>
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
          {...register("description", {
            required: "Description is required",
          })}
          className="mt-2 block w-full shadow-sm text-gray-700 bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Describe the permission"
          rows={4}
          disabled={isSubmitting}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
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
          {isSubmitting ? "Processing..." : permission ? "Update" : "Create"}{" "}
          Permission
        </button>
      </div>
    </form>
  );
}
