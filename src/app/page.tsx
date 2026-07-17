import type { Metadata } from "next";
import Image from "next/image";

import GoldenForgeMark from "@/assets/brand/goldenforge.gif";
import BoltIcon from "@/assets/icons/heroicons/bolt.svg";
import CodeIcon from "@/assets/icons/heroicons/code-bracket.svg";
import GlobeIcon from "@/assets/icons/heroicons/globe-americas.svg";
import LatestBuildCard from "@/components/data/LatestBuildCard";
import Button from "@/components/input/Button";
import { DEFAULT_VERSION, GITHUB_REPO_URL, VERSIONS, getLatestBuild } from "@/lib/service/builds";

export const metadata: Metadata = {
  title: "Home",
  description:
    "GoldenForge is a NeoForge fork that brings Paper and other fork performance patches to modded Minecraft servers.",
};

export default async function HomePage() {
  const latestBuild = await getLatestBuild(DEFAULT_VERSION).catch(() => null);

  return (
    <>
      <header className="max-w-6xl mx-auto px-4 pt-32 pb-16 lg:pt-44 lg:pb-24 flex flex-col-reverse lg:flex-row items-center gap-10">
        <div className="flex-1">
          <h1 className="font-semibold text-4xl lg:text-5xl leading-tight lg:leading-tight">
            Mods and performance, <br />
            <span className="text-gold-500 dark:text-gold-400">forged together.</span>
          </h1>
          <p className="text-lg lg:text-xl mt-5 text-gray-800 dark:text-gray-200">
            GoldenForge is a NeoForge fork that ports performance patches from Paper and other server forks to the
            modded ecosystem — so your modded server runs faster without giving up mods.
          </p>
          <div className="flex flex-row flex-wrap gap-3 mt-4">
            {VERSIONS.map((v) => (
              <span
                key={v.mc}
                className={
                  v.available
                    ? "rounded-full bg-gold-500/15 text-gold-700 dark:text-gold-300 text-sm font-medium px-3 py-1"
                    : "rounded-full bg-gray-500/15 text-gray-600 dark:text-gray-400 text-sm font-medium px-3 py-1"
                }
              >
                {v.mc}
                {!v.available && " — soon"}
              </span>
            ))}
          </div>
          <div className="flex flex-row gap-4 mt-8">
            <Button variant="filled" href="/downloads">
              Download
            </Button>
            <Button variant="outlined" href={GITHUB_REPO_URL} external>
              GitHub
            </Button>
          </div>
        </div>
        <div className="flex-none lg:flex-1 flex justify-center lg:justify-end">
          <Image
            src={GoldenForgeMark}
            alt=""
            unoptimized
            priority
            className="w-48 h-48 lg:w-72 lg:h-72 drop-shadow-[0_0_40px_rgba(212,155,28,0.35)]"
          />
        </div>
      </header>

      <section className="w-full py-12 bg-primary-200 dark:bg-background-dark-80">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-semibold text-2xl mb-8">
            Why <span className="text-gold-500 dark:text-gold-400">GoldenForge</span>?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl bg-background-light-0 dark:bg-background-dark-90 p-6">
              <BoltIcon className="w-8 h-8 fill-gold-500" />
              <h3 className="font-semibold text-lg mt-3">Paper performance patches</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                Optimizations battle-tested on the biggest vanilla servers — chunk handling, entity ticking, world
                generation — carefully ported to NeoForge.
              </p>
            </div>
            <div className="rounded-xl bg-background-light-0 dark:bg-background-dark-90 p-6">
              <CodeIcon className="w-8 h-8 fill-gold-500" />
              <h3 className="font-semibold text-lg mt-3">Built on NeoForge</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                A drop-in replacement for your NeoForge 1.21.1 server. Your mods keep working — the server just gets
                faster. Support for 26.1 is on the way.
              </p>
            </div>
            <div className="rounded-xl bg-background-light-0 dark:bg-background-dark-90 p-6">
              <GlobeIcon className="w-8 h-8 fill-gold-500" />
              <h3 className="font-semibold text-lg mt-3">Open source</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                Every patch is public on GitHub, built in the open by nightly CI. Read the code, report issues, or
                contribute your own optimizations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {latestBuild && (
        <section className="max-w-6xl mx-auto px-4 py-12 w-full">
          <LatestBuildCard version={DEFAULT_VERSION} build={latestBuild} />
        </section>
      )}
    </>
  );
}
