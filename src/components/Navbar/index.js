import React from "react";
import Nav from "./Nav";
import { fetchMenuPublished } from "@/lib/actions/menuPublished.action";

const Navbar = async ({ white }) => {
  const menuPublishedData = await fetchMenuPublished();
  return <Nav menuPublishedData={menuPublishedData} white={white} />;
};

export default Navbar;
