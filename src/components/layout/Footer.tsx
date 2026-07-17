import Image from "next/image";
import Link from "next/link";

import GoldenForgeMark from "@/assets/brand/goldenforge.gif";
import { GITHUB_REPO_URL } from "@/lib/service/builds";

const Footer = () => (
  <footer className="bg-primary-200 dark:bg-background-dark-80 mt-16">
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <Image src={GoldenForgeMark} alt="" unoptimized className="h-10 w-10" />
        <div>
          <span className="font-semibold">
            Golden<span className="text-gold-500 dark:text-gold-400">Forge</span>
          </span>
          <p className="text-xs text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} GoldenForge</p>
        </div>
      </div>
      <div className="flex flex-col gap-1 text-sm md:text-right">
        <Link
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
        >
          GitHub
        </Link>
        <Link href="/downloads" className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
          Downloads
        </Link>
      </div>
    </div>
    <div className="max-w-6xl mx-auto px-4 pb-6 text-xs text-gray-600 dark:text-gray-400">
      GoldenForge is not an official Minecraft product. It is not approved by or associated with Mojang or Microsoft.
    </div>
  </footer>
);

export default Footer;
