"use client";
import { Pencil } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FileUpload } from "./file-upload";
import { UploadButton } from "@/utils/uploadthing";

const EditForm = ({
  icon,
  data,
  title,
  dataName,
  placeholder,
  textarea = false,
  textshort = false,
  register,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [dataItem, setDataItem] = useState(data);
  const [error, setError] = useState("");

  const toggleEdit = () => setEditing((current) => !current);

  const session = useSession();
  const { status } = session;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dataItem) {
      setError("Alla fält är nödvändiga!");
    } else {
      setError("");
    }
    const id = 123;
    try {
      if (dataItem !== undefined) {
        const res = await fetch("/api/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dataItem,
            type: dataName,
          }),
        });

        if (res.ok) {
          const form = e.target;

          toggleEdit();
        } else {
          console.log("User registration failed: ");
        }
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="w-[80%] border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex item-center justify-between border-b pb-2 mb-4">
        <div className="flex gap-2">
          <div className="flex justify-center items-center font-extralight">
            {icon}
          </div>
          <div className="text-xl font-extralight">{title}</div>
        </div>
        <button onClick={toggleEdit}>
          {isEditing ? (
            <>Avbryt</>
          ) : (
            <>
              <Pencil />
            </>
          )}
        </button>
      </div>
      {!isEditing ? (
        <div className="ml-8 font-extralight">
          {dataItem ? (
            dataItem
          ) : (
            <div className=" text-red-500">Inga uppgifter registrerade!</div>
          )}
        </div>
      ) : (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex gap-4 w-full justify-between">
            <div className="flex flex-col w-full">
              {textshort ? (
                <div className=" font-thin ml-8 text-right">
                  Antal tecken: {dataItem?.length}
                </div>
              ) : (
                ""
              )}

              {textarea ? (
                <textarea
                  {...register}
                  value={dataItem}
                  onChange={(e) => setDataItem(e.target.value)}
                  placeholder={placeholder}
                  rows={8}
                  className="border ml-6 py-2 px-2"
                />
              ) : (
                <input
                  {...register}
                  type="text"
                  value={dataItem}
                  placeholder={placeholder}
                  onChange={(e) => setDataItem(e.target.value)}
                  className="border ml-6 py-2 px-2"
                />
              )}
            </div>

            <div className=" flex w-16 items-end justify-end">
              <input type="submit" className="" />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditForm;
