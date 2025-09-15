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

  const getStudentById = async (id: number) => {
    try {
      const response = await axios.get<Student>(`http://localhost:3000/student/${id}`);
      if (response.data) {
        console.log("Chi tiết sinh viên:", response.data);
      } else {
        console.log("Không tìm thấy bản ghi");
      }
    } catch {
      console.error("Không tìm thấy bản ghi");
    }
  };

  const createStudent = async () => {
    const newStudent: Omit<Student, "id"> = {
      student_name: "Nguyen Van F",
      email: "vanf@example.com",
      address: "Quảng Ninh",
      phone: "0906789123",
      status: true,
      created_at: new Date().toISOString()
    };

    try {
      const response = await axios.post<Student>("http://localhost:3000/student", newStudent);
      console.log("Sinh viên mới được thêm:", response.data);
    } catch (error) {
      console.error("Lỗi khi thêm sinh viên:", error);
    }
  };

  useEffect(() => {
    getAllStudent();
    getStudentById(3);
    getStudentById(99);
    createStudent();
  }, []);

  return (
    <div>
      <h2>Danh sách sinh viên</h2>
      <p>Kiểm tra console để xem dữ liệu sinh viên</p>
    </div>
  );
}

export default StudentList;
