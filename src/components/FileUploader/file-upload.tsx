"use client";
import { UploadDropzone } from "./lib/uploadthing";
import { ourFileRouter } from "src/app/api/uploadthing/core";
//import { ourFileRouter } from "@/src/app/api/uploadthing/core";
import { toast } from "react-toastify";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      appearance={{
        container: "uploadDropzoneContainer",
      }}
      endpoint={endpoint}
      /*
      content={{
        label() {
          return <div>Upload stuff</div>;
        },
        button({ ready }) {
          if (ready) return <div>Upload stuff</div>;

          return "Getting ready...";
        },

        allowedContent({ ready, fileTypes, isUploading }) {
          if (!ready) return "Checking what you allow";
          if (isUploading) return "Seems like stuff is uploading";
          return `Stuff you can upload: ${fileTypes.join(", ")}`;
        },
      }}
      */
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
