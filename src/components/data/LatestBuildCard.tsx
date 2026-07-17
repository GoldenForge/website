import Link from "next/link";

import DownloadIcon from "@/assets/icons/heroicons/document-download.svg";
import type { GoldenBuild, GoldenVersion } from "@/lib/service/builds";
import { GITHUB_REPO_URL } from "@/lib/service/builds";
import { formatRelativeDate } from "@/lib/util/time";

export interface LatestBuildCardProps {
  version: GoldenVersion;
  build: GoldenBuild;
}

const LatestBuildCard = ({ version, build }: LatestBuildCardProps) => (
  <div className="rounded-xl border border-primary-600 dark:border-gold-700 bg-primary-100 dark:bg-background-dark-80 p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div className="min-w-0">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold uppercase tracking-wide text-gold-600 dark:text-gold-400">
          Latest build
        </span>
        <span className="rounded-full bg-gold-500/15 text-gold-700 dark:text-gold-300 text-xs font-medium px-2.5 py-0.5">
          {version.mc}
        </span>
      </div>
      <p className="font-semibold text-lg mt-1">Build #{build.number}</p>
      <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
        <Link
          href={`${GITHUB_REPO_URL}/commit/${build.commitSha}`}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-gold-600 dark:text-gold-400 hover:underline"
        >
          {build.commitSha.slice(0, 7)}
        </Link>
        &nbsp;{build.commitMessage}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatRelativeDate(new Date(build.date))}</p>
    </div>
    <a
      href={build.downloadUrl}
      rel="noreferrer"
      className="shrink-0 inline-flex items-center gap-2 rounded-md bg-gold-600 hover:bg-gold-500 text-white font-medium px-6 py-2.5 transition hover:shadow-md"
    >
      <DownloadIcon className="w-5 h-5 fill-current" />
      Download
    </a>
  </div>
);

export default LatestBuildCard;
