import { UploadDropzone } from "@uploadthing/react";

import { OurFileRouter } from "src/app/api/uploadthing/core";

export const OurUploadDropzone = () => (
  <UploadDropzone endpoint="withoutMdwr" />
);
