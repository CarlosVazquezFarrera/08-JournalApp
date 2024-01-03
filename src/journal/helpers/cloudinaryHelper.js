export const uploadFile = async (file) => {
  if (!file) throw new Error("File is required");

  const urlCloudy = "https://api.cloudinary.com/v1_1/dwigzmt2h/image/upload";

  const formData = new FormData();
  formData.append("upload_preset", "journal");
  formData.append("file", file);

  const res = await fetch(urlCloudy, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Uplod failed");
  const cloudResp = await res.json();
  return cloudResp.secure_url;
};
