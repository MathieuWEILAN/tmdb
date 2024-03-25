"use client";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
const LogoutButton = () => {
  const [labelButton, setLabelButton] = useState("Sign In");

  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    signOut();
  };

  return (
    <div className="flex w-full">
      <div className="flex items-center justify-between">
        <span className="ml-4">{session?.user?.name}</span>
      </div>
      <button
        onClick={handleSignOut}
        className="border-2 border-white px-4 py-2.5 rounded-xl my-4 mx-4"
      >
        Log Out
      </button>
    </div>
  );
};

export default LogoutButton;
