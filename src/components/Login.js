"use client";
import Link from "next/link";

import { useSession, signOut } from "next-auth/react";

const LoginComponent = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <span className="flex items-center ml-2 text-gray-700">
        Hello, {session.user.email}
        <button
          onClick={() => {
            signOut({ callbackUrl: "http://localhost:3000/" });
          }}
          className="py-2 px-4 rounded ml-2 text-white bg-rose-100 hover:bg-rose-200"
        >
          로그아웃
        </button>
      </span>
    );
  }

  return (
    <Link href={"/login"}>
      <span className="py-2 px-4 rounded ml-2 text-white bg-rose-100 hover:bg-rose-200">
        로그인
      </span>
    </Link>
  );
};

export default LoginComponent;
