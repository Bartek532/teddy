"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { SETTINGS_ROUTES } from "@/src/utils/constants";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <>
      <nav className="w-full px-7 pb-6 pt-2">
        <ul className="w-full flex justify-stretch items-center gap-2 bg-gray-100 py-1 px-1 rounded-xl">
          {SETTINGS_ROUTES.map(({ route, label }) => (
            <li
              key={route}
              className={twMerge(
                "flex justify-center font-bold rounded-xl py-2 text-[0.9rem] w-full",
                pathname.startsWith(route) && "bg-white-100",
              )}
            >
              <Link
                href={route}
                prefetch={false}
                className="w-full flex justify-center"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {children}
    </>
  );
};

export default SettingsLayout;
