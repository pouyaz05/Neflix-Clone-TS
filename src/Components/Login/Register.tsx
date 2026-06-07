import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface RegisterResponse {
  message?: string;
}

function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    // بررسی اینکه ایمیل و پسورد وارد شده باشد
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    setError("");
    try {
      // ارسال درخواست POST به سرور
      const res = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // ساختن JSON صحیح
      });

      // گرفتن پاسخ
      const data = await res.json();
      console.log("Response data:", data);
      if (res.ok) {
        alert("Account created successfully! You can now log in.");
        navigate("/login");
      } else {
        setError(data.message || data.error || "Registration error");
      }
    } catch (err) {
      // مدیریت خطای اتصال به سرور
      setError("Problem connecting to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center px-4">
      <div className="max-w-md w-full p-8 bg-[#181818] rounded-lg space-y-4">
        <h2 className="text-3xl font-semibold text-white text-center mb-4">
          Create an Account
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-[#333] text-white mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-[#333] text-white mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-500 py-3 rounded text-white font-semibold disabled:opacity-50"
        >
          {loading ? "Registering..." : "Create Account"}
        </button>
        <div className="text-center mt-4 text-gray-400 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-white hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
