import React, { useState, forwardRef, useImperativeHandle } from "react";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../cloudinaryConfig"; // Adjust the path to your firebaseConfig file

const ImageUploader = forwardRef((props, ref) => {
  const [image, setImage] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const uploadImage = async () => {
    if (!image) {
      alert("Please select a file first.");
      return;
    }
    const imageRef = ref(storage, `images/${image.name}`);
    try {
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      console.log("Uploaded image URL:", url);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const fetchImages = async () => {
    const imagesRef = ref(storage, "images/");
    try {
      const response = await listAll(imagesRef);
      const urls = await Promise.all(
        response.items.map((itemRef) => getDownloadURL(itemRef))
      );
      setImageUrls(urls);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    uploadImage,
    fetchImages,
  }));

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="hidden"
        id="imageInput"
      />
      <div>
        <h3>Fetched Images:</h3>
        <div className="grid grid-cols-3 gap-4">
          {imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Uploaded ${index}`}
              className="w-full h-auto"
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default ImageUploader;
