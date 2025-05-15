import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";

const UploadImageModal = ({ isOpen, onClose }) => {
  const [file, setFile] = useState(null);
  // const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreviewImage(previewUrl);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }
  
    try {
      setIsUploading(true);
      const storageRef = ref(storage, `uploads/${file.name}`);
  
      // Create a Promise for the upload task
      const uploadPromise = new Promise((resolve, reject) => {
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error("Upload error:", error);
            reject("Failed to upload file.");
          },
          async () => {
            // When the upload completes, resolve the promise
            // const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            // console.log("Uploaded file URL:", downloadURL);
            resolve("File uploaded successfully!");
          }
        );
      });
  
      // Wait for the upload to finish
      const message = await uploadPromise;
      alert(message);
    } catch (error) {
      alert(error);
    } finally {
      setIsUploading(false);
      handleClose();
    }
  };
  

  const handleClose = () => {
    setFile(null);
    setPreviewImage(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Upload Image</h2>

        {previewImage ? (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Selected Image Preview:</p>
            <img
              src={previewImage}
              alt="Selected Preview"
              className="w-full h-auto max-h-48 object-cover rounded-lg"
            />
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4 text-center">
            <p className="text-gray-500">Image preview...</p>
          </div>
        )}

        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {/* {uploadedImageUrl && (
          <div className="mt-4">
            <p>Uploaded Image:</p>
            <img src={uploadedImageUrl} alt="Uploaded" className="w-full max-w-sm" />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default UploadImageModal;
