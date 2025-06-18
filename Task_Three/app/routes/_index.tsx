import { json } from "@remix-run/node";
import { Form, useLoaderData, useActionData } from "@remix-run/react";
import { useState } from "react";
import axios from "axios";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

type Role = {
  name: string;
  description: string;
  active: boolean;
};

const API_URL = "https://run.mocky.io/v3/9fd86dd4-3e9d-4f95-9f35-e5b5853a60be";

export const loader = async () => {
  try {
    const response = await axios.get<Role[]>(API_URL);
    return json({ roles: response.data });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return json({ roles: [] });
  }
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString() || "";
  const description = formData.get("description")?.toString() || "";
  const active = formData.get("active") === "on";

  const newRole: Role = { name, description, active };

  try {
    const existingRolesResponse = await axios.get<Role[]>(API_URL);
    const updatedRoles = [...existingRolesResponse.data, newRole];
    return json({ roles: updatedRoles });
  } catch (error) {
    console.error("Error submitting role:", error);
    return json({ roles: [] });
  }
};

export default function IndexPage() {
  const { roles: initialRoles } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [search, setSearch] = useState("");

  const rolesToShow = actionData?.roles || initialRoles;

  const filteredRoles = rolesToShow.filter((role) =>
    role.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-4 my-6">
      <Form method="post">
        <div className="flex gap-4 items-center mb-2 flex-wrap">
          <label>
            Role Name
            <input
              name="name"
              placeholder="Role Name"
              required
              className="border p-1 w-[300px] focus:outline-none hover:bg-green-100 focus:bg-green-100 block"
            />
          </label>

          <label>
            Role Description
            <input
              name="description"
              placeholder="Role Description"
              required
              className="border p-1 w-[400px] focus:outline-none hover:bg-green-100 focus:bg-green-100 block"
            />
          </label>

          <label className="flex items-center mt-6 gap-2">
            <input type="checkbox" name="active" className="h-5 w-5" />
            <span>Active</span>
          </label>
        </div>

        <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-1">
          Save
        </button>
        <button type="reset" className="bg-gray-300 rounded-md px-4 mx-1 py-1">
          Clear
        </button>
      </Form>

      <table className="table-fixed w-full border my-4">
        <thead>
          <tr className="bg-gray-100">
            <td className="text-left relative flex items-center w-full p-2">
              <input
                type="text"
                placeholder="Search Role"
                className="border w-full px-1 focus:outline-none hover:bg-green-100 focus:bg-green-100"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <MagnifyingGlassIcon className="h-5 absolute right-3 top-5 transform -translate-y-1/2 w-5 text-gray-400" />
            </td>
            <td className="text-left p-2 w-[50%] uppercase">Description</td>
            <td className="text-left p-2 w-[10%] uppercase">Active</td>
          </tr>
        </thead>
        <tbody>
          {filteredRoles.map((role, index) => (
            <tr key={index} className="border-t">
              <td className="p-2">{role.name}</td>
              <td className="p-2">{role.description}</td>
              <td className="p-2">{role.active ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
