import { useState } from "react";
import api from "@/lib/api";
import {
  FileUp,
  File as FileIcon,
  Loader2,
  CheckCircle2,
  CloudUpload,
  ArrowLeft,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function FileUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filePath, setFilePath] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const selectedFile = e.target.files[0];

    setFile(selectedFile);
    setError("");
    setSuccess("");
    setFilePath("");
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || loading) {
      setError("Please select a file first");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/files/upload", formData, {
        headers: {
          // IMPORTANT: let browser set boundary automatically
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Upload successful!");
      setFilePath(response.data);
      setFile(null);

      // reset input
      const fileInput = document.getElementById(
        "file-upload"
      ) as HTMLInputElement;

      if (fileInput) fileInput.value = "";
    } catch (err: any) {
      setError(
        err.response?.data || "Upload failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-10">
      
      {/* Header */}
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-10">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-primary text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <div className="flex items-center gap-2 text-primary text-sm font-semibold">
          <CloudUpload className="w-5 h-5" />
          Cloud Sync Active
        </div>
      </div>

      {/* Upload Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto bg-card border border-border rounded-2xl p-8 shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6">Upload File</h2>

        <form onSubmit={handleUpload} className="space-y-6">

          {/* Error */}
          <AnimatePresence>
            {error && (
              <div className="p-3 bg-red-100 text-red-600 rounded-lg text-sm flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                {error}
              </div>
            )}
          </AnimatePresence>

          {/* Success */}
          {success && (
            <div className="p-4 bg-green-100 text-green-600 rounded-lg text-sm">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                {success}
              </div>
              <div className="mt-2 text-xs break-all">
                {filePath}
              </div>
            </div>
          )}

          {/* Upload Area */}
          <div className="border-2 border-dashed border-border rounded-xl p-10 text-center">
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />

            <label htmlFor="file-upload" className="cursor-pointer">
              <FileUp className="mx-auto w-10 h-10 mb-3 text-primary" />
              <p className="font-semibold">Click to upload</p>
              <p className="text-sm text-muted-foreground">
                Supports all file types
              </p>
            </label>
          </div>

          {/* File Preview */}
          {file && (
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="font-semibold truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              <button type="button" onClick={() => setFile(null)}>
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!file || loading}
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <CloudUpload className="w-5 h-5" />
                Upload File
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}