"use client";

import { useState } from "react";
import { UploadCloud } from "lucide-react";

export default function FileUpload() {
 const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    const fileArray = Array.from(selectedFiles);
    setFiles((prev) => [...prev, ...fileArray]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    // Here you can integrate Azure Blob Storage upload or API call
    console.log("Uploading files:", files);
    alert(`${files.length} file(s) ready to upload!`);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Upload Files</h2>

      {/* Drag and Drop Area */}
      <div
        className={`border-2 border-dashed p-10 rounded-lg text-center cursor-pointer transition ${
          dragOver ? "border-orange-500 bg-orange-50" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <UploadCloud className="w-12 h-12 mx-auto text-gray-400 mb-3" />
        <p className="text-gray-600">
          Drag & drop files here, or{" "}
          <span className="text-orange-500 font-semibold">browse</span>
        </p>
        <input
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
          id="fileInput"
        />
        <label htmlFor="fileInput" className="sr-only">
          Upload Files
        </label>
      </div>

      {/* Selected Files List */}
      {files.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Selected Files:</h3>
          <ul className="space-y-2">
            {files.map((file, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-gray-100 p-2 rounded"
              >
                <span>{file.name}</span>
                <button
                  onClick={() => removeFile(idx)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={files.length === 0}
        className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-semibold disabled:opacity-50"
      >
        Upload
      </button>
    </div>
  );
}
