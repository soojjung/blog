"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { FcUnlock } from "react-icons/fc";

const UnLock = ({ id }) => {
  const { data: session, status: sessionStatus } = useSession();
  const userRole = session?.user?.role;

  return (
    userRole === "admin" && (
      <Link href={"/edit/" + id}>
        <FcUnlock size={30} />
      </Link>
    )
  );
};

export default UnLock;
