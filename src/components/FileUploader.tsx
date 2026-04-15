"use client";

import { useState, useRef } from "react";

interface FileUploaderProps {
  accept: string;
  onFileSelect: (file: File) => void;
  label: string;
  currentFileName?: string;
}

export default function FileUploader({
  accept,
  onFileSelect,
  label,
  currentFileName,
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      onFileSelect(file);
    }
  }

  function handleClick() {
    inputRef.current?.click();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  }

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
        isDragging
          ? "border-[#c96442] bg-[#c96442]/5"
          : "border-[#e8e6dc] hover:border-[#d1cfc5]"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
      <div className="text-[#5e5d59]">
        <svg
          className="mx-auto mb-3 h-10 w-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p className="text-[17px] font-medium">{label}</p>
        <p className="mt-1 text-sm text-[#87867f]">
          Drag and drop or click to browse
        </p>
        {currentFileName && (
          <p className="mt-3 text-sm font-medium text-[#c96442]">
            Current: {currentFileName}
          </p>
        )}
      </div>
    </div>
  );
}
