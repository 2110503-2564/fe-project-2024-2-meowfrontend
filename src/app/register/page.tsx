"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import userRegister from "@/libs/userRegister"; // หรือที่อยู่ที่คุณเก็บฟังก์ชันนี้

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephonenumber, setTelephonenumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // กำหนด role เป็น "user" เสมอ ก่อนที่จะส่งข้อมูลไปยัง backend
      const role = "user"; // กำหนด role เป็น "user" เสมอ

      // ใช้ฟังก์ชัน userRegister ส่งข้อมูลไปยัง backend
      const result = await userRegister(name, email, password, telephonenumber, role);

      if (result.success) {
        // ถ้าการลงทะเบียนสำเร็จ
        alert("Registration successful!");
        router.push("/api/auth/signin");
      } else {
        // ถ้ามีข้อผิดพลาด
        setErrorMessage(result.error || "Registration failed");
      }
    } catch (error) {
      // ถ้ามีข้อผิดพลาดในการเชื่อมต่อกับ API
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Telephone Number:</label>
            <input
              type="text"
              placeholder="Enter your phone number"
              value={telephonenumber}
              onChange={(e) => setTelephonenumber(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-sm font-medium text-black bg-[#93ADDA] rounded-md hover:bg-[#7A9BC7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#93ADDA] transition-colors duration-200"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Register;
