import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface LoginResponse {
  username?: string;
  message?: string;
}

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // مهم!
        body: JSON.stringify({ email, password }),
      });
      const data: LoginResponse = await res.json();

      if (res.ok) {
        alert(`Welcome back, ${data.username || 'User'}!`);
        // به مسیری که می‌خوای هدایت کن
        navigate('/'); // یا مسیر دلخواهت
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center px-4">
      <div className="max-w-md w-full p-8 bg-[#181818] rounded-lg space-y-4">
        {/* لوگو یا عنوان */}
        <h2 className="text-3xl font-semibold text-white text-center mb-4">Sign In</h2>
        {/* ورودی ایمیل */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-[#333] text-white mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* ورودی پسورد */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-[#333] text-white mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* پیام خطا */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {/* دکمه سربرگ */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-500 py-3 rounded text-white font-semibold disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        {/* لینک ثبت‌نام */}
        <div className="text-center mt-4 text-gray-400 text-sm">
          Don't have an account? <a href="/register" className="text-white hover:underline">Register</a>
        </div>
      </div>
    </div>
  );
}

export default Login;