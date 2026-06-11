import { Camera, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { userLoggedIn } from "../redux/authSlice";

const EditProfileModal = ({ onClose }) => {
  const { user } = useSelector((store) => store.auth);

  const [photoFile, setPhotoFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState(user?.photoUrl || null);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    description: user?.description || "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...formData, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    setPreviewPhoto(URL.createObjectURL(file)); //show preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      if (photoFile) form.append("photo", photoFile);

      console.log("form", form);

      const response = await fetch(
        "http://localhost:3000/api/user/profile-update",
        {
          method: "PATCH",
          credentials: "include",
          body: form,
        },
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Update failed");
        return;
      }

      dispatch(userLoggedIn(data.user));
      toast.success("Profile updated!");
      onClose();
    } catch (error) {
      toast.error("Something went wrong.");
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      {/* Modal box — stop click from bubbling to backdrop */}
      <div
        className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* close button  */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl text-center font-bold text-gray-900 mb-6">Edit Profile</h2>

        {/* edit form  */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* photo upload */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <img
                src={previewPhoto}
                alt="preview"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
              />
              <label
                htmlFor="photo"
                className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer transition"
              >
                <Camera className="w-4 h-4" />
              </label>
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>
            <p className="text-gray-500 text-xs">
              Click the camera camera icon to change photo
            </p>
          </div>

          {/* name  */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Bio  */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Bio
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              placeholder="Add about yourself..."
              rows={3}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          {/* actions  */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-3 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
            >
              {isLoading ? "Saving.." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
