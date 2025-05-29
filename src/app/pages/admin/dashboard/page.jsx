"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNav from '@/app/Component/adminNav';
import { useRouter, } from "next/navigation";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
 const router = useRouter();
  useEffect(() => {
    // Fetch users client-side
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/api/auth/admin`, {
          validateStatus: (status) => status >= 200 && status < 300,
        });
        if (!Array.isArray(response.data)) {
          throw new Error('Invalid users data');
        }
        setUsers(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err);
        setIsLoading(false);
        // Handle 401/403 errors client-side
        if (err.response?.status === 401 || err.response?.status === 403) {
          setError('Unauthorized');
        }
      }
    };

    fetchUsers();
  }, []);

  // Redirect to login if unauthorized
  if (error?.response?.status === 401 || error?.response?.status === 403) {
         router.push("/pages/users/login");
         return;
  }

  
if (isLoading ) {
    return (
       <div className="mx-auto  w-full  sec3 h-full overflow-hidden ">

      <div className="flex  p-8 justify-center items-center min-h-screen">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 border-4 border-t-blue-500 border-gray-700 rounded-full animate-spin mx-auto" />
          <div className="text-blue-500 font-semibold text-4xl opacity-90 animate-fadeIn">
            Almost There...
          </div>
          <div className="text-gray-700 text-sm opacity-80 animate-fadeIn">
            <p>We're getting everything ready for you...</p>
            <p>Sit tight for just a moment.</p>
          </div>
        </div>
      </div>
     
    </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200">
        <div className="text-center">
          <p className="text-lg text-red-500 font-medium">{error}</p>
          <button
            onClick={() => {
              setLoading(true);
              setError(null);
              setPage(1);
            }}
            className="mt-4 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
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
  } 

  export default  AdminDashboard;