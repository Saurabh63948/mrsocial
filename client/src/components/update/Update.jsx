import { useState } from "react";
import { makeRequest } from "../Axios";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    city: user.city,
    website: user.website,
  });

  // ✅ File Upload Function
  const upload = async (file) => {
    if (!file) return "";
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.error("File Upload Error: ", err);
      return "";
    }
  };

  // ✅ Handle Text Change (Bug Fix)
  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const queryClient = useQueryClient();

  // ✅ Update Mutation
  const mutation = useMutation(
    (updatedUser) => makeRequest.put("/users", updatedUser),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
        alert("Profile updated successfully! ✅");
      },
      onError: (err) => {
        alert(`Failed to update profile: ${err.message}`);
      },
    }
  );

  // ✅ Handle Form Submit
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const coverUrl = cover ? await upload(cover) : user.coverPic;
      const profileUrl = profile ? await upload(profile) : user.profilePic;

      mutation.mutate({
        ...texts,
        coverPic: coverUrl,
        profilePic: profileUrl,
      });

      setCover(null);
      setProfile(null);
      setOpenUpdate(false);
    } catch (err) {
      console.error("Update Error: ", err);
    }
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form onSubmit={handleClick}>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : `/upload/${user.coverPic}`
                  }
                  alt="cover"
                  onLoad={(e) => URL.revokeObjectURL(e.target.src)} // ✅ Memory Cleanup
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => setCover(e.target.files[0])}
            />

            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : `/upload/${user.profilePic}`
                  }
                  alt="profile"
                  onLoad={(e) => URL.revokeObjectURL(e.target.src)} // ✅ Memory Cleanup
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>

          <label>Email</label>
          <input
            type="email"
            value={texts.email}
            name="email"
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={texts.password}
            name="password"
            onChange={handleChange}
            required
          />

          <label>Name</label>
          <input
            type="text"
            value={texts.name}
            name="name"
            onChange={handleChange}
            required
          />

          <label>Country / City</label>
          <input
            type="text"
            name="city"
            value={texts.city}
            onChange={handleChange}
          />

          <label>Website</label>
          <input
            type="url"
            name="website"
            value={texts.website}
            onChange={handleChange}
          />

          <button type="submit">Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Update;
