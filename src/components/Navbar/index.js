import React from "react";
import Nav from "./Nav";
import { fetchMenuPublished } from "@/lib/actions/menuPublished.action";

const Navbar = async () => {
  const menuPublishedData = await fetchMenuPublished();
  return <Nav menuPublishedData={menuPublishedData} />;
};

export default Navbar;
