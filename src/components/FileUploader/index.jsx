"use client";
import React, { useState } from "react";
import { FileUpload } from "./file-upload";
import Image from "next/image";

import { cn } from "@/utils/utils";
import Spinner from "../Spinner";

import { PiImageThin } from "react-icons/pi";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";

const FileUploader = ({
  data = "",
  imageUrl,
  width = "w-full",
  height = "h-full",
  aspect,
  setResetImage,
  isResetImage,
  image,
  setImage,
  isEditing,
  setEditing,
}) => {
  const [isImageLoading, setImageLoading] = useState(false);

  const toggleEdit = () => setEditing((current) => !current);

  console.log(image);

  function handleLoadStart() {
    setImageLoading(true);
  }

  function handleSubmit(url) {
    imageUrl(url);
    console.log(url);

    setEditing(false);
  }
  return (
    <>
      <div className={`w-full h-[380px] pb-[100px]  rounded-md p-4`}>
        <div className="font-medium flex item-center justify-between border-b pb-2 mb-4">
          <div className="flex gap-2">
            <div className="flex justify-center items-center">
              <PiImageThin size={24} className=" font-bold" />
            </div>
            <div className="text-xl font-extralight">Bild på personal</div>
          </div>

          <button onClick={toggleEdit}>
            {isEditing && <>Avbryt</>}

            {!isEditing && !image && ""}

            {!isEditing && image && <Pencil />}
          </button>
        </div>
        <div
          className={`${width}  m-auto flex ${height} justify-center items-center relative ${aspect}`}
        >
          {isEditing ? (
            <div className={`${width} ${height}`}>
              <FileUpload
                endpoint="imageUploader"
                onChange={(url) => {
                  if (url) {
                    setImage(url);
                    handleSubmit(url);
                    console.log(url);
                    handleLoadStart();
                    setEditing(fasle);
                  }
                }}
              />
            </div>
          ) : (
            <>
              <div className={cn(isImageLoading ? "block" : " hidden")}>
                <Spinner />
              </div>
              <Image
                onLoadingComplete={() => setImageLoading(false)}
                alt="upload"
                layout="fill"
                className="object-cover rounded-md"
                src={image}
              />
            </>
          )}

          {isEditing ||
            (isResetImage && (
              <div className={`${width} ${height}`}>
                <FileUpload
                  endpoint="imageUploader"
                  onChange={(url) => {
                    if (url) {
                      setImage(url);
                      handleSubmit(url);
                      console.log(url);
                      handleLoadStart();
                      setEditing(fasle);
                    }
                  }}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default FileUploader;
