import { useEffect, useState } from "react";
import { addStudent, getStudents, deleteStudent } from "../../services/studentService";
import { useAuth } from "../../context/AuthContext";
import Layout from "../../components/Layout";

export default function Students() {
  const { userData } = useAuth();
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("");

  const fetchStudents = async () => {
    const data = await getStudents(userData.schoolId);
    setStudents(data);
  };

  useEffect(() => {
    if (userData) fetchStudents();
  }, [userData]);

  const handleAdd = async () => {
    await addStudent({ name, class: studentClass }, userData.schoolId);
    setName("");
    setStudentClass("");
    fetchStudents();
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    fetchStudents();
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Students</h2>

      <div className="flex gap-2 mb-4">
        <input className="border p-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="border p-2" placeholder="Class" value={studentClass} onChange={(e) => setStudentClass(e.target.value)} />
        <button className="bg-blue-500 text-white px-4" onClick={handleAdd}>Add</button>
      </div>

      <div className="bg-white p-4 shadow">
        {students.map((s) => (
          <div key={s.id} className="flex justify-between border-b py-2">
            <span>{s.name} - {s.class}</span>
            <button className="text-red-500" onClick={() => handleDelete(s.id)}>Delete</button>
          </div>
        ))}
      </div>
    </Layout>
  );
}