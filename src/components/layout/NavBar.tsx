"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import GoldenForgeStatic from "@/assets/brand/goldenforge-static.png";
import IconButton from "@/components/input/IconButton";
import NavLink from "@/components/layout/NavLink";
import { GITHUB_REPO_URL } from "@/lib/service/builds";

const NavBar = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 32);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-shadow",
        scroll && "bg-background-light-10 dark:bg-background-dark-90 shadow-xl",
      )}
    >
      <div className="max-w-6xl flex flex-row items-center mx-auto px-4 py-3 gap-6">
        <Link href="/" className="flex items-center gap-2 leading-none">
          <Image src={GoldenForgeStatic} alt="" className="h-9 w-9" />
          <span className="font-semibold text-lg tracking-tight">
            Golden<span className="text-gold-500 dark:text-gold-400">Forge</span>
          </span>
        </Link>
        <NavLink href="/downloads">Downloads</NavLink>
        <div className="grow" />
        <IconButton iconId="github" label="GitHub" href={GITHUB_REPO_URL} external />
      </div>
    </nav>
  );
};

export default NavBar;
