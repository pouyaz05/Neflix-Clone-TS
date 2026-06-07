import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editableName, setEditableName] = useState<string>("");
  const [editableEmail, setEditableEmail] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // دریافت اطلاعات پروفایل
  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get("token");
      console.log("Token:", token); // این خط را حتما اضافه کنید
      if (!token) {
        console.log("توکن پیدا نشد، هدایت به صفحه ورود");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3001/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);

        const { id, name, email, avatar } = response.data;
        setProfile({
          id,
          name,
          email,
          avatarUrl: avatar || "/default-avatar.webp",
        });
        setEditableName(name);
        setEditableEmail(email);
      } catch (err) {
        console.error("Error fetching profile:", err);
        if (err.response) {
          console.log("Status:", err.response.status);
          console.log("Data:", err.response.data);
        }
        setError("Failed to load profile data");
        console.log("Token from cookies:", Cookies.get("token"));
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // ویرایش نام و ایمیل
const handleSaveProfile = async () => {
  if (!profile) return;
  setSaving(true);
  setError(null);
  try {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
      return;
    }

    await axios.put(
      "http://localhost:3001/api/user/update-profile",
      {
        name: editableName,
        email: editableEmail,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // بروزرسانی در حالت محلی
    setProfile({ ...profile, name: editableName, email: editableEmail });
    setIsEditing(false);
  } catch (err) {
    console.error("Error saving profile:", err);
    setError("Failed to save profile");
  } finally {
    setSaving(false);
  }
};
  // تغییر نام و ایمیل
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (profile) {
      setEditableName(profile.name);
      setEditableEmail(profile.email);
    }
  };

  // انتخاب فایل
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }
      setSelectedFile(file);
      setError(null);
    }
  };

  // آپلود عکس
  const handleUpload = async () => {
    if (!selectedFile || !profile) return;
    setUploading(true);
    setError(null);
    try {
      const token = Cookies.get("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const formData = new FormData();
      formData.append("avatar", selectedFile);

      const response = await axios.post(
        "http://localhost:3001/api/user/upload-avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfile({
        ...profile,
        avatarUrl: response.data.imageUrl,
      });
    } catch (err) {
      console.error("Upload error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to upload image. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3001/api/logout");
      navigate("/"); // یا هر صفحه‌ای که می‌خواهید بره
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white font-sans">
        در حال بارگذاری...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white font-sans">
        {error || "Failed to load profile data"}
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl h-130  w-full bg-gray-800 rounded-lg p-10 shadow-lg text-white relative ">
        {/* نمایش و ویرایش نام و ایمیل */}
        <div className="mb-4  items-center grid ">
          {/* نمایش تصویر پروفایل و امکانات آپلود */}
          <div className="flex items-center justify-around  mb-10 space-x-6" >
            <img
              src={profile.avatarUrl}
              alt="Profile Avatar"
              className="w-50 h-50 rounded-full border-4 border-red-600 object-cover"
            />
          </div>

          <div className=" ">
            {isEditing ? (
              <div className="flex justify-between">
               
                <div>
                  <label htmlFor="name" className="text-2xl" >name : </label>
                  <input
                  value={editableName}
                  onChange={(e) => setEditableName(e.target.value)}
                  className="bg-gray-700 px-4 w-50 h-10 rounded-lg focus:outline-none"
                  placeholder="new name"
                  id="name"
                />
                <br/>
                <label htmlFor="email" className="text-2xl" >email : </label>
                <input
                  value={editableEmail}
                  onChange={(e) => setEditableEmail(e.target.value)}
                  className="bg-gray-700 w-50 py-2 px-4  rounded-lg mt-2 focus:outline-none"
                  placeholder="new email"
                  id="email"
                /></div>
                 <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mb-4 block w-full text-gray-300"
                    disabled={uploading}
                    placeholder="newimg"
                  />
                  {error && <p className="text-red-500 mb-2">{error}</p>}
                  <button
                    onClick={handleUpload}
                    disabled={!selectedFile || uploading}
                    className={`bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded shadow-lg ${
                      !selectedFile || uploading
                        ? "opacity-50 cursor-not-allowed"
                        : "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    {uploading ? "در حال آپلود..." : "آپلود عکس"}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-around">
                  <h2 className="text-3xl font-bold mb-2 text-red-600">
                    {profile.name}
                  </h2>
                </div>
                <div className="flex justify-around">
                  <p className="text-gray-300">{profile.email}</p>
                </div>
              </>
            )}
          </div>
          <div className="flex justify-evenly mt-16">
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleLogout} // تابع خروج
            >
              خروج از حساب
            </button>
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveProfile}
                  className="bg-green-600 px-4 py-2 rounded-lg mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={saving}
                >
                  {saving ? "در حال ذخیره..." : "ذخیره"}
                </button>
                <button
                  onClick={handleEditToggle}
                  className="bg-gray-600 px-4 py-2 rounded-lg"
                >
                  انصراف
                </button>
              </>
            ) : (
              <button
                onClick={handleEditToggle}
                className="bg-blue-600 px-4 py-2 rounded-lg"
              >
                ویرایش
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
