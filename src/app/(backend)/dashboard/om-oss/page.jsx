"use server";
import EditForm from "@/components/EditForm";
import { ImageForm } from "@/components/image-form";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { PiInfoThin } from "react-icons/pi";

async function getData() {
  let fetch_path = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/profile/";
  const res = await fetch(fetch_path, {
    method: "GET",
    cache: "no-store",
  });
  const data = res.json();
  return data;
}

export default async function Home() {
  const data = await getData();
  console.log(data);

  return (
    <div className="flex flex-col items-center gap-4 my-12">
      <ImageForm data={data} />
      <EditForm
        icon={<HiOutlineHomeModern size={20} />}
        data={data?.about?.company}
        title="Företagsnamn"
        dataName="company"
      />

      <EditForm
        icon={<PiInfoThin size={20} />}
        data={data?.about?.shortDescription}
        title="Kort beskrivning"
        dataName="shortDescription"
        textarea={true}
        textshort={true}
      />
      <EditForm
        icon={<PiInfoThin size={20} />}
        data={data?.about?.longDescription}
        title="Längre beskrivning"
        dataName="longDescription"
        textarea={true}
      />
    </div>
  );
}
