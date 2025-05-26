// app/admin/dashboard/page.jsx
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import axios from 'axios'; // Import Axios
import AdminNav from '@/app/Component/adminNav';
import Link from "next/link";

export default async function AdminDashboard() {
  try {
    // Extract the token from cookies
    const cookieStore = await cookies(); // No need to await here
    const token = cookieStore.get('token')?.value;
    console.log('Token:', token); // Log the token for debugging  

    if (!token) {
      console.error('No token found in cookies');
      redirect('/pages/admin/login'); // Redirect to login page if no token is found
    }

    // Fetch users from the API using Axios
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Ensure the response contains valid data
    const users = response.data; // Use response.data for Axios
    if (!Array.isArray(users)) {
      throw new Error('Invalid users data');
    }


  


    return (
      <div className="min-h-screen sec3">
        <AdminNav />
        <div className="p-8 ">
          <h1 className="text-3xl font-bold text-gray-800 mt-26 mb-6">Admin Dashboard</h1>

          {/* Table */}
          <div className="sec4 p-6 rounded-lg shadow-md overflow-x-auto">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">All Users</h2>

            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.isAdmin ? 'Admin' : 'User'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">

                      <button
                        className="ml-4 text-green-600 hover:text-red-900"
                      >
                        {user._id}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* No Users Found */}
            {users.length === 0 && (
              <p className="text-gray-600 mt-4">No users found.</p>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching users:', error);

    // Redirect to login page on error
    redirect('/pages/admin/login');
  }
}