import React, { useState, useEffect } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import Cookies from "js-cookie";
import { storage } from "../firebaseConfig";

const FetchImage = ({ isOpen, onClose, onProceed }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const storageRef = ref(storage, "uploads/");
        const result = await listAll(storageRef);

        const imageUrls = await Promise.all(
          result.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return {
              name: itemRef.name,
              url,
            };
          })
        );

        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchImages();
    }
  }, [isOpen]);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleProceed = () => {
    if (selectedImage) {
      Cookies.set("selectedImage", selectedImage.url);
      // alert("Image selected and saved!");
      onProceed(selectedImage);
      onClose();
    } else {
      alert("Please select an image before proceeding.");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredImages = images.filter((image) =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-2/3 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Add Media</h2>

        {/* Search bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search images..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        {/* Display images or loading */}
        <div className="grid grid-cols-3 gap-4 max-h-80 overflow-y-auto">
          {loading ? (
            <p className="text-center col-span-3">Loading images...</p>
          ) : filteredImages.length > 0 ? (
            filteredImages.map((image) => (
              <div
                key={image.name}
                className={`border rounded-lg p-2 cursor-pointer ${
                  selectedImage?.name === image.name
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => handleImageSelect(image)}
              >
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-32 object-cover rounded"
                />
                <p className="text-sm text-center mt-2">{image.name}</p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3">No images found.</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleProceed}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default FetchImage;
