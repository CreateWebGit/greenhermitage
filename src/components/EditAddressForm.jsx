"use client";
import { Pencil } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FileUpload } from "./file-upload";
import { UploadButton } from "@/utils/uploadthing";
import Input from "./Input";

const EditAddressForm = ({
  icon,
  data,
  title,
  dataName,
  textarea = false,
  textshort = false,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [dataItem, setDataItem] = useState(data);
  const [error, setError] = useState("");

  const toggleEdit = () => setEditing((current) => !current);

  console.log(data);
  console.log(dataItem);

  const session = useSession();
  const { status } = session;

  useEffect(() => {
    // setDataItem(data);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("hej");
    console.log(dataName);

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
            type: "address",
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

  const handleInputChanges = (e) => {
    e.preventDefault();
    console.log(e.target.name);
    if (e.target.name === "streetAddress") {
      setDataItem({ ...dataItem, streetAddress: e.target.value });
    }

    if (e.target.name === "streetNumber") {
      setDataItem({ ...dataItem, streetNumber: e.target.value });
    }

    if (e.target.name === "zipCode") {
      setDataItem({ ...dataItem, zipCode: e.target.value });
    }

    if (e.target.name === "postalAddress") {
      setDataItem({ ...dataItem, postalAddress: e.target.value });
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
        <div className="flex flex-col gap-3">
          <div className="flex gap-4 w-full justify-between">
            <div className="flex flex-col w-full">
              <div className="ml-8 mr-[300px]">
                <div className="flex gap-4">
                  <div className="grow">
                    <div className="">Gatuadress</div>
                    <div className="font-extralight">
                      {dataItem?.streetAddress}
                    </div>
                  </div>
                  <div className="w-[100px] border">
                    <div className="">Gatunummer</div>
                    <div className="font-extralight">
                      {dataItem?.streetNumber}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className=" w-[100px]">
                    <div>Postnummer</div>
                    <div className="font-extralight">{dataItem?.zipCode}</div>
                  </div>
                  <div className="grow">
                    <div>Postort</div>
                    <div className="font-extralight">
                      {dataItem?.postalAddress}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex gap-4 w-full justify-between">
            <div className="flex flex-col w-full">
              <div className="ml-8 mr-64">
                <div className="flex gap-4">
                  <div className=" grow">
                    <Input
                      value={dataItem?.streetAddress}
                      name="streetAddress"
                      label="Gatuadress"
                      placeholder=""
                      type="text"
                      onChange={(e) => handleInputChanges(e)}
                    />
                  </div>
                  <div className="w-[100px]">
                    <Input
                      value={dataItem?.streetNumber}
                      name="streetNumber"
                      label="Portnummer"
                      placeholder=""
                      type="text"
                      onChange={(e) => handleInputChanges(e)}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-[100px]">
                    <Input
                      value={dataItem?.zipCode}
                      name="zipCode"
                      label="Postnummer"
                      placeholder=""
                      type="text"
                      onChange={(e) => handleInputChanges(e)}
                    />
                  </div>
                  <div className="grow">
                    <Input
                      value={dataItem?.postalAddress}
                      name="postalAddress"
                      label="Postort"
                      placeholder=""
                      type="text"
                      onChange={(e) => handleInputChanges(e)}
                    />
                  </div>
                </div>
              </div>
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

export default EditAddressForm;
