"use client";
import Link from "next/link";

import { useSession, signOut } from "next-auth/react";

const LoginComponent = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center ml-2 text-gray-700">
        <span className="hidden sm:inline-block">
          Hello, {session.user.email}
        </span>
        <button
          onClick={() => {
            signOut({ callbackUrl: process.env.NEXTAUTH_URL });
          }}
          className="py-2 px-4 rounded ml-2 text-white bg-rose-100 hover:bg-rose-200"
        >
          로그아웃
        </button>
      </div>
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
