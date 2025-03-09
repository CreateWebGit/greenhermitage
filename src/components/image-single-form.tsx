"use client";
import { useSession } from "next-auth/react";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { PiImageThin } from "react-icons/pi";
import { useEffect, useState } from "react";
import { FileUpload } from "./file-upload";

import Image from "next/image";

export const ImageSingleForm = ({ data, title, onSubmit }) => {
  console.log("ggggggggggggggggggggggggttttttttt", data);
  const [isEditing, setEditing] = useState(false);
  const [image, setImage] = useState(data?.img);
  const [error, setError] = useState("");

  const toggleEdit = () => setEditing((current) => !current);

  const session = useSession();
  const { status } = session;

  return (
    <div className="w-[80%] border bg-slate-100 rounded-md p-4 flex flex-col justify-center">
      <div className="font-medium flex item-center justify-between border-b pb-2 mb-4">
        <div className="flex gap-2">
          <div className="flex justify-center items-center">
            <PiImageThin size={24} className=" font-bold" />
          </div>
          <div className="text-xl font-extralight">Bild på salong</div>
        </div>

        <button onClick={toggleEdit}>
          {isEditing && <>Cancel</>}

          {!isEditing && !data?.img && <PlusCircle />}

          {!isEditing && data?.img && <Pencil />}
        </button>
      </div>
      {!isEditing &&
        (!image ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="w-full flex justify-center items-center  relative aspect-video mt-2 h-60">
            <Image
              alt="upload"
              layout="fill"
              className="object-cover rounded-md"
              src={image}
            />
          </div>
        ))}
      {isEditing && (
        <div className=" flex justify-center border">
          <FileUpload
            endpoint="imageUploader"
            onChange={(url) => {
              if (url) {
                onSubmit(url);

                setImage(url);
                setEditing(false);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};
