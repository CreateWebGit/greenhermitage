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

export const OpenTimesForm = ({ data }) => {
  console.log("haha", data);
  const [isEditing, setEditing] = useState(false);

  const [mondayFromTime, setMondayFromTime] = useState(
    data?.opening_hours?.monday.start || 0
  );

  const [mondayToTime, setMondayToTime] = useState(
    data?.opening_hours?.monday.end || 0
  );

  const [tuesdayFromTime, setTuesdayFromTime] = useState(
    data?.opening_hours?.tuesday.start || 0
  );
  const [tuesdayToTime, setTuesdayToTime] = useState(
    data?.opening_hours?.tuesday.start || 0
  );

  const [wednesdayFromTime, setWednesdayFromTime] = useState(
    data?.opening_hours?.wednesday.start || 0
  );
  const [wednesdayToTime, setWednesdayToTime] = useState(
    data?.opening_hours?.wednesday.end || 0
  );

  const [thursdayFromTime, setThursdayFromTime] = useState(
    data?.opening_hours?.thursday.start || 0
  );
  const [thursdayToTime, setThursdayToTime] = useState(
    data?.opening_hours?.thursday.end || 0
  );

  const [fridayFromTime, setFridayFromTime] = useState(
    data?.opening_hours?.friday.start || 0
  );
  const [fridayToTime, setFridayToTime] = useState(
    data?.opening_hours?.friday.end || 0
  );

  const [saturdayFromTime, setSaturdayFromTime] = useState(
    data?.opening_hours?.saturday.start || 0
  );
  const [saturdayToTime, setSaturdayToTime] = useState(
    data?.opening_hours?.saturday.end || 0
  );

  const [sundayFromTime, setSundayFromTime] = useState(
    data?.opening_hours?.sunday.start || 0
  );
  const [sundayToTime, setSundayToTime] = useState(
    data?.opening_hours?.sunday.end || 0
  );

  const toggleEdit = () => setEditing((current) => !current);

  const session = useSession();
  const { status } = session;

  useEffect(() => {});

  //console.log(time);
  const handleSubmit = async () => {
    console.log();

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mondayFromTime,
          mondayToTime,
          tuesdayFromTime,
          tuesdayToTime,
          wednesdayFromTime,
          wednesdayToTime,
          thursdayFromTime,
          thursdayToTime,
          fridayFromTime,
          fridayToTime,
          saturdayFromTime,
          saturdayToTime,
          sundayFromTime,
          sundayToTime,
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
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 ">
      <div className="font-medium flex item-center justify-between border-b pb-2 mb-4">
        Öppettider
        <button onClick={toggleEdit}>
          {isEditing && <>Cancel</>}

          {!isEditing && <Pencil />}
        </button>
      </div>
      {isEditing && (
        <div className="flex flex-col justify-center w-full items-center">
          <div className="flex flex-col gap-4">
            <div className="flex  w-[400px]">
              <div className="w-[130px] text-right  flex justify-center items-center">
                Måndagar från:&nbsp;{" "}
              </div>
              <div className="w-[69px] flex">
                <TimePicker time={mondayFromTime} setTime={setMondayFromTime} />
              </div>
              <div className="w-[50px] text-center flex justify-center items-center m-0 p-0">
                till
              </div>
              <div className="w-[60px]">
                <TimePicker time={mondayToTime} setTime={setMondayToTime} />
              </div>
            </div>

            <div className="flex  w-[400px]">
              <div className="w-[130px] text-right  flex justify-center items-center">
                Tisdagar från:&nbsp;
              </div>
              <div className="w-[69px] flex">
                <TimePicker
                  time={tuesdayFromTime}
                  setTime={setTuesdayFromTime}
                />
              </div>
              <div className="w-[50px] flex justify-center items-center">
                &nbsp; till &nbsp;
              </div>
              <div className="w-[60px] flex">
                <TimePicker time={tuesdayToTime} setTime={setTuesdayToTime} />
              </div>
            </div>

            <div className="flex  w-[400px]">
              <div className="w-[130px] text-right  flex justify-center items-center">
                Onsdagar från:&nbsp;
              </div>
              <div className="w-[69px] flex">
                <TimePicker
                  time={wednesdayFromTime}
                  setTime={setWednesdayFromTime}
                />
              </div>
              <div className="w-[50px] flex justify-center items-center">
                &nbsp; till &nbsp;
              </div>
              <div className="w-[60px] flex">
                <TimePicker
                  time={wednesdayToTime}
                  setTime={setWednesdayToTime}
                />
              </div>
            </div>

            <div className="flex  w-[400px]">
              <div className="w-[130px] text-right  flex justify-center items-center">
                Torsdagar från:&nbsp;
              </div>
              <div className="w-[69px] flex">
                <TimePicker
                  time={thursdayFromTime}
                  setTime={setThursdayFromTime}
                />
              </div>
              <div className="w-[50px] flex justify-center items-center">
                &nbsp; till &nbsp;
              </div>
              <div className="w-[60px] flex">
                <TimePicker time={thursdayToTime} setTime={setThursdayToTime} />
              </div>
            </div>

            <div className="flex  w-[400px]">
              <div className="w-[130px] text-right  flex justify-center items-center">
                Fredagar från:&nbsp;
              </div>
              <div className="w-[69px] flex">
                <TimePicker time={fridayFromTime} setTime={setFridayFromTime} />
              </div>
              <div className="w-[50px] flex justify-center items-center">
                &nbsp; till &nbsp;
              </div>
              <div className="w-[60px] flex">
                <TimePicker time={fridayToTime} setTime={setFridayToTime} />
              </div>
            </div>

            <div className="flex  w-[400px]">
              <div className="w-[130px] text-right  flex justify-center items-center">
                Lördagar från:&nbsp;
              </div>
              <div className="w-[69px] flex">
                <TimePicker
                  time={saturdayFromTime}
                  setTime={setSaturdayFromTime}
                />
              </div>
              <div className="w-[50px] flex justify-center items-center">
                &nbsp; till &nbsp;
              </div>
              <div className="w-[60px] flex">
                <TimePicker time={saturdayToTime} setTime={setSaturdayToTime} />
              </div>
            </div>

            <div className="flex  w-[400px]">
              <div className="w-[130px] text-right  flex justify-center items-center">
                Söndagar från:&nbsp;
              </div>
              <div className="w-[69px] flex">
                <TimePicker time={sundayFromTime} setTime={setSundayFromTime} />
              </div>
              <div className="w-[50px] flex justify-center items-center">
                &nbsp; till &nbsp;
              </div>
              <div className="w-[60px] flex">
                <TimePicker time={sundayToTime} setTime={setSundayToTime} />
              </div>
            </div>
            <div>
              <button onClick={handleSubmit}>Spara</button>
            </div>
          </div>
        </div>
      )}

      {!isEditing && (
        <div className="flex flex-col justify-center w-full items-center">
          <div className="flex flex-col gap-4">
            <div className="flex  w-[400px]">
              <div className="w-[130px] text-right  flex justify-center items-center">
                Måndagar från:&nbsp;{" "}
              </div>
              <div className="w-[69px] h-9 flex justify-center items-center">
                {padNumberToString(secoundsToTimeValues(mondayFromTime).hour)}{" "}
                :&nbsp;
                {padNumberToString(
                  secoundsToTimeValues(mondayFromTime).minutes
                )}
              </div>
              <div className="w-[50px] flex justify-center items-center">
                &nbsp; till &nbsp;
              </div>
              <div className="w-[60px] h-9 flex justify-center items-center">
                {padNumberToString(secoundsToTimeValues(mondayToTime).hour)}{" "}
                :&nbsp;
                {padNumberToString(secoundsToTimeValues(mondayToTime).minutes)}
              </div>
            </div>

            <div className="flex  w-[400px]">
              <div className="w-[130px] text-right  flex justify-center items-center">
                Tisdagar från:&nbsp;{" "}
              </div>
              <div className="w-[69px] h-9 flex justify-center items-center">
                {padNumberToString(secoundsToTimeValues(tuesdayFromTime).hour)}{" "}
                :&nbsp;
                {padNumberToString(
                  secoundsToTimeValues(tuesdayFromTime).minutes
                )}
              </div>
              <div className="w-[50px] flex justify-center items-center">
                &nbsp; till &nbsp;
              </div>
              <div className="w-[60px] h-9 flex justify-center items-center">
                {padNumberToString(secoundsToTimeValues(tuesdayToTime).hour)}{" "}
                :&nbsp;
                {padNumberToString(secoundsToTimeValues(tuesdayToTime).minutes)}
              </div>
            </div>

            <div className="flex  w-[400px]">
              <div className="w-[130px] text-right  flex justify-center items-center">
                Onsdagar från:&nbsp;{" "}
              </div>
              <div className="w-[69px] h-9 flex justify-center items-center">
                {padNumberToString(
                  secoundsToTimeValues(wednesdayFromTime).hour
                ) == 0
                  ? "-- "
                  : padNumberToString(
                      secoundsToTimeValues(wednesdayFromTime).hour
                    )}
                :&nbsp;
                {padNumberToString(
                  secoundsToTimeValues(wednesdayFromTime).hour
                ) == 0
                  ? "-- "
                  : padNumberToString(
                      secoundsToTimeValues(wednesdayFromTime).minutes
                    )}
              </div>
              <div className="w-[50px] flex justify-center items-center">
                &nbsp; till &nbsp;
              </div>
              <div className="w-[60px] h-9 flex justify-center items-center">
                {padNumberToString(secoundsToTimeValues(wednesdayToTime).hour)}{" "}
                :&nbsp;
                {padNumberToString(
                  secoundsToTimeValues(wednesdayToTime).minutes
                )}
              </div>
            </div>

            <div className="flex  w-[400px]">
              <div className="w-[130px] text-right  flex justify-center items-center">
                Torsdagar från:&nbsp;{" "}
              </div>
              <div className="w-[69px] h-9 flex justify-center items-center">
                {padNumberToString(secoundsToTimeValues(thursdayFromTime).hour)}{" "}
                :&nbsp;
                {padNumberToString(
                  secoundsToTimeValues(thursdayFromTime).minutes
                )}
              </div>
              <div className="w-[50px] flex justify-center items-center">
                &nbsp; till &nbsp;
              </div>
              <div className="w-[60px] h-9 flex justify-center items-center">
                {padNumberToString(secoundsToTimeValues(thursdayToTime).hour)}{" "}
                :&nbsp;
                {padNumberToString(
                  secoundsToTimeValues(thursdayToTime).minutes
                )}
              </div>
            </div>

            <div className="flex  w-[400px]">
              <div className="w-[130px] text-right  flex justify-center items-center">
                Fredagar från:&nbsp;{" "}
              </div>
              <div className="w-[69px] h-9 flex justify-center items-center">
                {padNumberToString(secoundsToTimeValues(fridayFromTime).hour)}{" "}
                :&nbsp;
                {padNumberToString(
                  secoundsToTimeValues(fridayFromTime).minutes
                )}
              </div>
              <div className="w-[50px] flex justify-center items-center">
                &nbsp; till &nbsp;
              </div>
              <div className="w-[60px] h-9 flex justify-center items-center">
                {padNumberToString(secoundsToTimeValues(fridayToTime).hour)}{" "}
                :&nbsp;
                {padNumberToString(secoundsToTimeValues(fridayToTime).minutes)}
              </div>
            </div>

            <div className="flex  w-[400px]">
              <div className="w-[130px] text-right  flex justify-center items-center">
                Lördagar från:&nbsp;{" "}
              </div>
              <div className="w-[69px] h-9 flex justify-center items-center">
                {padNumberToString(secoundsToTimeValues(saturdayFromTime).hour)}{" "}
                :&nbsp;
                {padNumberToString(
                  secoundsToTimeValues(saturdayFromTime).minutes
                )}
              </div>
              <div className="w-[50px] flex justify-center items-center">
                &nbsp; till &nbsp;
              </div>
              <div className="w-[60px] h-9 flex justify-center items-center">
                {padNumberToString(secoundsToTimeValues(saturdayToTime).hour)}{" "}
                :&nbsp;
                {padNumberToString(
                  secoundsToTimeValues(saturdayToTime).minutes
                )}
              </div>
            </div>

            <div className="flex  w-[400px]">
              <div className="w-[130px] text-right  flex justify-center items-center">
                Söndagar från:&nbsp;{" "}
              </div>
              <div className="w-[69px] h-9 flex justify-center items-center">
                {padNumberToString(secoundsToTimeValues(sundayFromTime).hour)}{" "}
                :&nbsp;
                {padNumberToString(
                  secoundsToTimeValues(sundayFromTime).minutes
                )}
              </div>
              <div className="w-[50px] flex justify-center items-center">
                &nbsp; till &nbsp;
              </div>
              <div className="w-[60px] h-9 flex justify-center items-center">
                {padNumberToString(secoundsToTimeValues(sundayToTime).hour)}{" "}
                :&nbsp;
                {padNumberToString(secoundsToTimeValues(sundayToTime).minutes)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
