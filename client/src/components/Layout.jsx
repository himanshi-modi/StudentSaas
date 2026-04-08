import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout({ children }) {
  const { userData } = useAuth();

  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">StudentSaas</h2>

        {userData?.role === "admin" && (
          <>
            <Link to="/admin" className="block mb-2">Dashboard</Link>
            <Link to="/admin/students" className="block mb-2">Students</Link>
          </>
        )}

        {userData?.role === "teacher" && (
          <>
            <Link to="/teacher" className="block mb-2">Dashboard</Link>
            <Link to="/teacher/grades" className="block mb-2">Assign Grades</Link>
          </>
        )}

        {userData?.role === "student" && (
          <>
            <Link to="/student" className="block mb-2">Dashboard</Link>
            <Link to="/student/grades" className="block mb-2">My Grades</Link>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        {children}
      </div>
    </div>
  );
}