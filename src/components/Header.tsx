"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import ArrowLeftIcon from "@/public/svg/arrow-left.svg";
import GearIcon from "@/public/svg/gear.svg";
import SunIcon from "@/public/svg/sun.svg";

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="flex w-full justify-between py-5 px-7 h-20">
      {pathname === "/" ? (
        <Image
          src="/img/logo.png"
          alt="bear's head but it's half robotic"
          width="40"
          height="40"
        />
      ) : (
        <button onClick={() => router.back()}>
          <ArrowLeftIcon className="w-6" />
        </button>
      )}

      <div className="flex gap-6 items-center">
        <button>
          <SunIcon className="w-6" />
        </button>
        <Link href="/settings">
          <GearIcon className="w-6" />
        </Link>
      </div>
    </header>
  );
};
