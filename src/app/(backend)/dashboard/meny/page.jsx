"use server";
import MenuList from "@/components/MenuList";
import { fetchMenuPublished } from "@/lib/actions/menuPublished.action";
import { fetchProducts } from "@/lib/actions/products.actions";
import React from "react";

export default async function Home() {
  const data = await fetchProducts();
  const dataPublished = await fetchMenuPublished();

  return (
    <div className=" min-h-screen">
      <MenuList data={data} dataPublished={dataPublished} />
    </div>
  );
}
