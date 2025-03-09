"use server";
import Contact from "@/components/Contact";
import React from "react";

async function getData() {
  let fetch_path = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/profile/";
  const res = await fetch(fetch_path, {
    cache: "no-store",
  });
  const data = res.json();
  return data;
}

export default async function Home() {
  const data = await getData();

  return <Contact data={data} />;
}
