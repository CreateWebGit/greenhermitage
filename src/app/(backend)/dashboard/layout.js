"use client";
import Dashboard from "@/components/Dashboard";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Layout({ children }) {
  const session = useSession();
  const { status } = session;
  if (status === "unauthenticated") {
    console.log("hahah");
    redirect("/login");
  }
  console.log(status);
  return <Dashboard>{children}</Dashboard>;
}
