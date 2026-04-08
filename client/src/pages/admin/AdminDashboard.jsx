import { Link } from "react-router-dom";
export default function AdminDashboard(){
    return <h2>Admin Dashboard</h2>;
}


export default function AdminDashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <Link to="/admin/students">Manage Students</Link>
    </div>
  );
}