"use client";
import { Pencil } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const EditFormNew = ({
  icon,
  data,
  title,
  dataName,
  placeholder,
  textarea = false,
  textshort = false,
  handleSubmit,
  register,
  isData,
  setData,
  action,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [dataItem, setDataItem] = useState(data);

  const toggleEdit = () => setEditing((current) => !current);

  const theSubmit = (e) => {
    e.preventDefault();

    handleSubmit(e);
    setEditing(false);
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
          {isData ? (
            isData
          ) : (
            <div className=" text-red-500">Inga uppgifter registrerade!</div>
          )}
        </div>
      ) : (
        <form className="flex flex-col gap-3" onSubmit={(e) => theSubmit(e)}>
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
                  value={isData}
                  onChange={(e) => setData(e.target.value)}
                  placeholder={placeholder}
                  rows={8}
                  className="border ml-6 py-2 px-2"
                />
              ) : (
                <input
                  type="text"
                  value={isData}
                  onChange={(e) => setData(e.target.value)}
                  placeholder={placeholder}
                  className="border ml-6 py-2 px-2"
                />
              )}
            </div>

            <div className=" flex w-16 items-end justify-end">
              <input type="submit" />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditFormNew;
