"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminFloatingButton() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userDataStr = localStorage.getItem("userData");
    if (userDataStr) {
      setUser(JSON.parse(userDataStr));
    }
  }, []);

  if (user?.userType !== "admin") return null; // Only show for admins

  return (
    <Link
      href="/admin"
      className="hover:scale-105 fixed right-4 bottom-4 z-50 px-4 py-2 bg-black text-white rounded-full shadow-lg  hover:shadow-[0_0_20px_black] transition duration-300"
    >
      Admin Dashboard
    </Link>
  );
}
