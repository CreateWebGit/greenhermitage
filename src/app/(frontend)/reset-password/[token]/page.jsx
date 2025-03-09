"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ResetPassword = ({ params }) => {
  console.log(params.token);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState(null);

  const { data: session, status: sessionState } = useSession();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch("/api/verify-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: params.token,
          }),
        });

        if (res.status === 400) {
          setError("Invalid token or has expired");
          setVerified(true);
        }

        if (res.status === 200) {
          setError("");
          setVerified(true);
          const userData = await res.json();
          setUser(userData);
        }
      } catch (error) {
        console.log("Error during registration: ", error);
      }
    };
    verifyToken();
  }, [params.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = e.target[0].value;

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          email: user?.email,
        }),
      });
      console.log(user);

      if (res.status === 400) {
        setError("Användare med denna epost är inte registrerad.");
      }

      if (res.status === 200) {
        setError("");
        router.push("/login");
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
          <input type="password" placeholder="Nytt lösenord" required />
          <button
            type="submit"
            // disabled={error.length > 0}
            className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2"
          >
            Registrera
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
