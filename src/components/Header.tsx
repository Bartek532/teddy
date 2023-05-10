"use client";
import Image from "next/image";
import Link from "next/link";

import SettingsIcon from "@/public/svg/settings.svg";
import SunIcon from "@/public/svg/sun.svg";

export const Header = () => {
  return (
    <header className="flex w-full justify-between items-center py-5 px-7 h-20">
      <Link
        href="/"
        className="flex gap-3 items-center justify-start"
        prefetch={false}
      >
        <Image
          src="/img/logo.png"
          alt="bear's head but it's half robotic"
          width="44"
          height="44"
        />
        <div className="flex flex-col pt-0.5">
          <span className="text-sm opacity-50">AI Assistant</span>
          <h1 className="leading-tight">B.E.A.R.</h1>
        </div>
      </Link>

      <nav className="flex gap-5 items-center">
        <button>
          <SunIcon className="w-6" />
        </button>
        <Link href="/settings" prefetch={false}>
          <SettingsIcon className="w-5" />
        </Link>
      </nav>
    </header>
  );
};
