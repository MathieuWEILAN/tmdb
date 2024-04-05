import LoginIcon from "@/assets/icons/LoginIcon";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const Authentification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const userRef = useRef(null);
  const handleSignUp = async () => {
    signIn();
  };
  const handleSignOut = async () => {
    signOut();
  };
  const { data: session, status } = useSession();
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (userRef.current && !userRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userRef]);

  return (
    <button className="px-4 py-2.5" onClick={(e) => e.stopPropagation()}>
      {status === "authenticated" ? (
        <div className="relative" ref={userRef}>
          <Image
            src={session?.user?.image}
            alt=""
            width={50}
            height={50}
            className="rounded-full border-2 border-white"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />

          {isOpen && (
            <div className="border-2 bg-white rounded-xl top-[60px] absolute w-auto -left-1/2 h-auto p-2.5 flex flex-col">
              <span>{session?.user?.name}</span>
              <Link
                href={{
                  pathname: `/user/${session.user.name}-${session.user.id}`,
                }}
              >
                Favorites
              </Link>
              <button onClick={handleSignOut}>Log-out</button>{" "}
            </div>
          )}
        </div>
      ) : (
        <LoginIcon onClick={handleSignUp} />
      )}
    </button>
  );
};

export default Authentification;
