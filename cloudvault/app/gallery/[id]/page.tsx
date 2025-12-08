"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface FileItem {
  id: string;
  name: string;
  url: string;
}

export default function UserGalleryPage() {
  const params = useParams(); // dynamic params
  const userId = params.id; // e.g., gallery/123 → id = 123
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      if (!userId) return;

      try {
        const res = await fetch(`/api/file?id=${userId}`);
        const data = await res.json();
        setFiles(data.files || []);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [userId]);

  if (loading) return <p className="text-center mt-10">Loading files...</p>;
  if (files.length === 0) return <p className="text-center mt-10">No files found for this user.</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {files.map((file) => (
          <div key={file.id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <img
              src={file.url}
              alt={file.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-2 text-center font-medium">{file.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
