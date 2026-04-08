import Layout from "../../components/Layout";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <Link to="/admin/students" className="text-blue-500">
        Manage Students
      </Link>
    </Layout>
  );
}