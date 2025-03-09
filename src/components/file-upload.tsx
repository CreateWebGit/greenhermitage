"use client";
import { UploadDropzone } from "@uploadthing/react";

//import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "src/app/api/uploadthing/core";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { OurFileRouter } from "src/app/api/uploadthing/core";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone<OurFileRouter, "imageUploader">
      className="bg-slate-800 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300 ut-button:w-[400px] ut-button:ut-readying:bg-red-500/50"
      endpoint={endpoint}
      content={{
        label() {
          return <div>Upload stuff</div>;
        },

        allowedContent({ ready, fileTypes, isUploading }) {
          if (!ready) return "Checking what you allow";
          if (isUploading) return "Seems like stuff is uploading";
          return `Stuff you can upload: ${fileTypes.join(", ")}`;
        },
      }}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].ufsUrl);
      }}
      onUploadError={(error: Error) => {
        console.log(error.message);
        toast.error(error.message);
      }}
    />
  );
};
