"use client";

import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FileUpload } from "./file-upload";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import TimePicker from "./TimePicker";
import {
  mySecoundsToTimeValues,
  padNumberToString,
  secoundsToTimeValues,
} from "@/utils/timeConverter";

export const LunchHours = ({ onSubmit }) => {
  const [isEditing, setEditing] = useState(false);

  const [mondayFromTime, setMondayFromTime] = useState(
    // data?.opening_hours?.monday.start || 0
    0
  );

  const [mondayToTime, setMondayToTime] = useState(
    // data?.opening_hours?.monday.end || 0
    0
  );

  const toggleEdit = () => setEditing((current) => !current);

  const session = useSession();
  const { status } = session;

  const handleSubmit = async () => {
    onSubmit(mondayFromTime, mondayToTime);

    /*
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mondayFromTime,
          mondayToTime,
          
          type: "opening",
        }),
      });
      console.log(res);
      if (res.ok) {
        toggleEdit();
      } else {
        console.log("User registration failed: ");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
    */
  };

  return (
    <div className="w-[80%] mt-6 border bg-slate-100 rounded-md p-4 ">
      <div className="text-xl font-extralight flex item-center justify-between border-b pb-2 mb-4">
        Lunchtider
        <button onClick={toggleEdit}>
          {isEditing && <>Cancel</>}

          {!isEditing && <Pencil />}
        </button>
      </div>
      {isEditing && (
        <div className="flex flex-col justify-center w-full items-center">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4  w-[400px] justify-center">
              <div className=" text-right  flex justify-center items-center">
                från:&nbsp;{" "}
              </div>
              <div className="flex">
                <TimePicker time={mondayFromTime} setTime={setMondayFromTime} />
              </div>
              <div className=" text-center flex justify-center items-center m-0 p-0">
                till
              </div>
              <div className="">
                <TimePicker time={mondayToTime} setTime={setMondayToTime} />
              </div>
            </div>

            <div className="flex justify-end">
              <button onClick={handleSubmit}>Spara</button>
            </div>
          </div>
        </div>
      )}

      {!isEditing && (
        <div className="flex flex-col justify-center w-full items-center">
          <div className="flex flex-col gap-4 ">
            <div className="flex  w-[400px] justify-center">
              <div className=" text-right  flex justify-center items-center">
                från:&nbsp;{" "}
              </div>
              <div className=" h-9 flex justify-center items-center">
                {padNumberToString(secoundsToTimeValues(mondayFromTime).hour)}{" "}
                :&nbsp;
                {padNumberToString(
                  secoundsToTimeValues(mondayFromTime).minutes
                )}
              </div>
              <div className=" flex justify-center items-center">
                &nbsp; till &nbsp;
              </div>
              <div className=" h-9 flex justify-center items-center">
                {padNumberToString(secoundsToTimeValues(mondayToTime).hour)}{" "}
                :&nbsp;
                {padNumberToString(secoundsToTimeValues(mondayToTime).minutes)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
