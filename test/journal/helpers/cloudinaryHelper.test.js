import { uploadFile } from "../../../src/journal/helpers/cloudinaryHelper";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dwigzmt2h",
  api_key: "487985573451223",
  api_secret: "R1aSYdH2aPHQkDLtKX7ocO4sfyg",
  secure: true,
});
describe("cloudinaryHelper", () => {
  test("should  upload file", async () => {
    const imageUrl = "https://cdn.forbes.com.mx/2017/08/GOT-ep64-640x360.jpg";
    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], "foto-test.jpg");

    const secureUrl = await uploadFile(file);
    expect(typeof secureUrl).toEqual("string");
    expect(secureUrl).toContain("res.cloudinary.com");

    const segments = secureUrl.split("/");
    const extention = secureUrl.split('.').pop();

    const idImg = segments[segments.length - 1].replace(`.${extention}`, '');
    const publicId =`journal-images/${idImg}`;
    
    await cloudinary.api.delete_resources([publicId],{
      resource_type: 'image'
    });
  });
});
