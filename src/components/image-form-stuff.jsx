"use client";
import { useSession } from "next-auth/react";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { PiImageThin } from "react-icons/pi";
import { useEffect, useState } from "react";
import { FileUpload } from "./file-upload";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";

const ImageFormStuff = () => {
  const [isEditing, setEditing] = useState(false);
  const [image, setImage] = useState(data.about?.img);
  const [error, setError] = useState("");

  const toggleEdit = () => setEditing((current) => !current);

  // console.log(data.about.img);
  console.log(image);
  const session = useSession();
  const { status } = session;

  /*
  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          console.log(data);
          setCompany(data.company);
          setDescription(data.desription);
          //setIsAdmin(data.admin);
          // setProfileFetched(true);
        });
      });
    }
  }, [session, status]);
  */

  const handleSubmit = async (url) => {
    console.log(url);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
          type: "image",
        }),
      });

      if (res.ok) {
        const form = e.target;
        toggleEdit();
      } else {
        console.log("User registration failed: ");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="w-[80%] border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex item-center justify-between border-b pb-2 mb-4">
        <div className="flex gap-2">
          <div className="flex justify-center items-center">
            <PiImageThin size={24} className=" font-bold" />
          </div>
          <div className="text-xl font-extralight">Bild på salong</div>
        </div>

        <button onClick={toggleEdit}>
          {isEditing && <>Cancel</>}

          {!isEditing && !data.img && <PlusCircle />}

          {!isEditing && data.img && <Pencil />}
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
        <div>
          <FileUpload
            endpoint="imageUploader"
            onChange={(url) => {
              if (url) {
                handleSubmit(url);

                console.log(url);

                setImage(url);
                setEditing(false);
                /*
                onSubmit((url) => {
                  setImage(url);
                  
                });
                */
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageFormStuff;
