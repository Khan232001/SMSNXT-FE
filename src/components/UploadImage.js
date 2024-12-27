import React, { useState } from "react";

const UploadImageModal = ({ isOpen, onClose }) => {
  const [file, setFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
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

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Default"); 

    try {
      setIsUploading(true);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dnufoyhon/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (data.secure_url) {
        console.log("Uploaded file URL:", data.secure_url);
        setUploadedImageUrl(data.secure_url);
        alert("File uploaded successfully!");
      } else {
        throw new Error("Upload failed. Please check the response.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
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

            
        {/* Image Preview */}
        {previewImage ? (
            <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Selected Image Preview:</p>
                <img
                src={previewImage}
                alt="Selected Preview"
                className="w-full h-auto max-h-48 object-cover rounded-lg"
                />
            </div>
            ) : 
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4 text-center">
                <p className="text-gray-500">Image preview. . .</p>
            </div>
        }

        {/* File Input */}
        <div className="mb-4">
            <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg"
            />
        </div>

        {/* Buttons */}
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

        {/* Display the uploaded image */}
        {uploadedImageUrl && (
            <div className="mt-4">
            <p>Uploaded Image:</p>
            <img src={uploadedImageUrl} alt="Uploaded" className="w-full max-w-sm" />
            </div>
        )}
        </div>
    </div>
  );
};

export default UploadImageModal;
