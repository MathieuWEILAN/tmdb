"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const LoginButton = () => {
  const [labelButton, setLabelButton] = useState("Sign In");
  const handleSignUp = async () => {
    signIn();
  };
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setLabelButton(`Welcome M. ${session?.user?.name}`);
    } else {
      setLabelButton("Sign In");
    }
  }, [status, session]);

  return (
    <button
      onClick={handleSignUp}
      className="border-2 rounded-full px-4 py-2.5"
    >
      {labelButton}
    </button>
  );
};

export default LoginButton;
