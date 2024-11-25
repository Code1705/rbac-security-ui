import { useForm } from "react-hook-form";
import { User, UserFormProps } from "../../types/index";
import { useSelector } from "react-redux";
import { selectRoles } from "../../hooks/useStore";

export default function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  const roles = useSelector(selectRoles);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    defaultValues: user || {
      id: crypto.getRandomValues(new Uint32Array(1))[0],
      name: "",
      email: "",
      roleId: roles[0]?.id || 1,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    },
  });

  const onFormSubmit = (data: User) => {
    const now = new Date();
    const nowInIndia = new Date(now.getTime()).toISOString();
    // console.log(nowInIndia);

    const formattedData: User = {
      ...data,
      id: user?.id || crypto.getRandomValues(new Uint32Array(1))[0],
      createdAt: user?.createdAt || new Date().toISOString().split("T")[0],
      updatedAt: nowInIndia,
    };
    onSubmit(formattedData);
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
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
          placeholder="Enter user's name"
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          className="mt-2 block w-full shadow-sm text-gray-700 bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Enter user's email"
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="roleId"
          className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <select
          id="roleId"
          {...register("roleId", { required: "Role is required" })}
          className="mt-2 block w-full shadow-sm text-gray-700 bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          disabled={isSubmitting}>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
        {errors.roleId && (
          <p className="mt-1 text-sm text-red-600">{errors.roleId.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          {...register("status")}
          className="mt-2 block w-full shadow-sm text-gray-700 bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          disabled={isSubmitting}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
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
          {isSubmitting ? "Processing..." : user ? "Update" : "Create"} User
        </button>
      </div>
    </form>
  );
}
