import { useState } from "react";
import Cropper from "react-easy-crop";

export const ImageCropper = ({ file, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
  });

  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

 const handleSave = async () => {
  try {
    const imageUrl = URL.createObjectURL(file);

    const croppedBlob = await getCroppedImg(
      imageUrl,
      croppedAreaPixels
    );

    const croppedFile = new File(
      [croppedBlob],
      "profile.jpg",
      {
        type: "image/jpeg",
      }
    );

    onCropComplete(croppedFile);
  } catch (error) {
    console.log(error);
  }
};
  const imageUrl = URL.createObjectURL(file);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      
      <div className="bg-white rounded-2xl p-6 w-[500px]">

        <h2 className="text-xl font-bold mb-4">
          Crop Profile Photo
        </h2>

        {/* Cropper */}
        <div className="relative w-full h-[400px] bg-black">
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>

        {/* Zoom */}
        <div className="mt-5">
          <label className="block mb-2">
            Zoom
          </label>

          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#5c00e6] text-white rounded-lg"
          >
            Crop
          </button>

        </div>

      </div>
    </div>
  );
};

