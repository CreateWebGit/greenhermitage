import { OpenTimesForm } from "@/components/open-times-form";

async function getData() {
  let fetch_path = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/profile/";
  const res = await fetch(fetch_path, {
    cache: "no-store",
  });
  const data = res.json();
  console.log(data);
  return data;
}

export default async function Home() {
  const data = await getData();
  return (
    <div className="flex justify-center items-start h-[2000px]">
      <div className="w-[700px]">
        <OpenTimesForm data={data} />
      </div>
    </div>
  );
}
