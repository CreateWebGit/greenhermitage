"use client";
import React, { useState } from "react";
import EditForm from "./EditForm";
import EditFormNew from "./EditFormNew";
import { LunchHours } from "./LunchHours";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  getTitle,
  setDescription,
  setImage,
  setOpen,
  setTitle,
} from "@/lib/actions/menyLunch.action";
import { ImageSingleForm } from "./image-single-form";
import { FileUpload } from "./file-upload";
import FileUploader from "./FileUploader";

import { ImageForm } from "./image-form";

const LunchMenu = ({ data }) => {
  console.log(data?.title);
  const [isMenuTitle, setMenuTitle] = useState(data?.title);
  const [isMenuDescription, setMenuDescription] = useState(data?.description);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Lunch data:", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitTitle = (e) => {
    e.preventDefault();
    console.log("haha", isMenuTitle);
    setTitle(isMenuTitle);
  };

  const handleSubmitDescription = (e) => {
    e.preventDefault();
    setDescription(isMenuDescription);
  };

  const handleSubmitImage = (url) => {
    setImage(url);
  };

  const handleSubmitOpening = (start, end) => {
    console.log("start", start);
    console.log("end", end);
    setOpen(start, end);
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1 className=" text-2xl my-4">Dagens lunchmeny</h1>

      <ImageSingleForm
        data={data}
        title="Bild på vår lunchmeny"
        onSubmit={(url) => handleSubmitImage(url)}
      />

      <EditFormNew
        title="Titel"
        placeholder="Passande titel till dagans lunch"
        handleSubmit={(e) => handleSubmitTitle(e)}
        isData={isMenuTitle}
        setData={setMenuTitle}
      />
      <EditFormNew
        title="Meny beskrivning"
        placeholder="Passande titel till dagans lunch"
        handleSubmit={(e) => handleSubmitDescription(e)}
        textarea={true}
        isData={isMenuDescription}
        setData={setMenuDescription}
      />
      <LunchHours onSubmit={(start, end) => handleSubmitOpening(start, end)} />
    </div>
  );
};

export default LunchMenu;
