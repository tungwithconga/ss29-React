import { useEffect, useState } from "react";
import axios from "axios";

interface Student {
  id: number;
  student_name: string;
  email: string;
  address: string;
  phone: string;
  status: boolean;
  created_at: string;
}

function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);

  const getAllStudent = async () => {
    try {
      const response = await axios.get<Student[]>("http://localhost:3000/student");
      console.log("Danh sách sinh viên:", response.data);
      setStudents(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sinh viên:", error);
    }
  };

  useEffect(() => {
    getAllStudent();
  }, []);

  return (
    <div>
      <h2>Danh sách sinh viên</h2>
      <p>Kiểm tra console để xem dữ liệu sinh viên</p>
    </div>
  );
}

export default StudentList;
