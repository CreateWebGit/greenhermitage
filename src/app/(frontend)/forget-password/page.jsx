"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const showSuccesToastMessage = async () => {
    toast.success(
      "Ett mail är skickat till dig med en länk till att återställa ditt lösenord",
      {
        position: "top-center",
        onClose: () => router.push("/admin"),
      }
    );
  };

  const showNoEmailToastMessage = async () => {
    toast.warn("Användare med denna epost är inte registrerad.", {
      position: "top-center",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const res = await fetch("api/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      if (res.status === 400) {
        setError("Användare med denna epost är inte registrerad.");
        showNoEmailToastMessage();
      }

      if (res.status === 200) {
        setError("");
        showSuccesToastMessage();
        // router.push("/login");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Återställ lösenord</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Din epost"
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Skicka
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/admin"}>
            Har redan ett konto? <span className="underline">Logga in</span>
          </Link>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Page;
