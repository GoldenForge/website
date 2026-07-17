import type { Metadata } from "next";
import Link from "next/link";

import ExternalIcon from "@/assets/icons/heroicons/arrow-top-right-on-square.svg";
import DownloadIcon from "@/assets/icons/heroicons/document-download.svg";
import LatestBuildCard from "@/components/data/LatestBuildCard";
import { DEFAULT_VERSION, GITHUB_REPO_URL, VERSIONS, getBuilds } from "@/lib/service/builds";
import { formatISODateTime } from "@/lib/util/time";

export const metadata: Metadata = {
  title: "Downloads",
  description: "Download the latest GoldenForge builds, fresh from GitHub Actions.",
};

export default async function DownloadsPage() {
  const version = DEFAULT_VERSION;
  const builds = await getBuilds(version).catch(() => []);
  const [latest, ...older] = builds;

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 lg:pt-36 w-full">
      <h1 className="font-semibold text-3xl lg:text-4xl">
        Get <span className="text-gold-500 dark:text-gold-400">GoldenForge</span>
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mt-2">
        Builds are compiled automatically from every commit by GitHub Actions.
      </p>

      <div className="flex flex-row flex-wrap gap-2 mt-6">
        {VERSIONS.map((v) =>
          v.available ? (
            <span
              key={v.mc}
              className="rounded-lg bg-gold-500/15 text-gold-700 dark:text-gold-300 border border-gold-500/40 font-medium px-4 py-1.5"
            >
              {v.mc}
            </span>
          ) : (
            <span
              key={v.mc}
              title="Coming soon"
              className="rounded-lg bg-gray-500/10 text-gray-500 dark:text-gray-400 border border-gray-500/30 font-medium px-4 py-1.5 cursor-not-allowed"
            >
              {v.mc} — coming soon
            </span>
          ),
        )}
      </div>

      <div className="mt-8">
        {latest ? (
          <LatestBuildCard version={version} build={latest} />
        ) : (
          <div className="rounded-xl border border-gray-300 dark:border-gray-700 p-6 text-gray-600 dark:text-gray-400">
            Could not load builds right now — you can still grab them directly from the{" "}
            <Link href={`${GITHUB_REPO_URL}/actions`} target="_blank" rel="noreferrer" className="underline">
              GitHub Actions page
            </Link>
            .
          </div>
        )}
      </div>

      {older.length > 0 && (
        <div className="mt-10">
          <h2 className="font-semibold text-xl mb-4">Older builds</h2>
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-primary-200 dark:bg-background-dark-80 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold">Build</th>
                  <th className="px-4 py-3 font-semibold">Changes</th>
                  <th className="px-4 py-3 font-semibold hidden md:table-cell">Date</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {older.map((build) => (
                  <tr
                    key={build.runId}
                    className="border-t border-gray-200 dark:border-gray-800 hover:bg-primary-100 dark:hover:bg-background-dark-80/60"
                  >
                    <td className="px-4 py-3 font-mono">#{build.number}</td>
                    <td className="px-4 py-3 max-w-0 w-full">
                      <span className="block truncate">
                        <Link
                          href={`${GITHUB_REPO_URL}/commit/${build.commitSha}`}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-gold-600 dark:text-gold-400 hover:underline"
                        >
                          {build.commitSha.slice(0, 7)}
                        </Link>
                        &nbsp;{build.commitMessage}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap hidden md:table-cell text-gray-600 dark:text-gray-400">
                      {formatISODateTime(new Date(build.date))}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {build.expired ? (
                        <a
                          href={build.runUrl}
                          rel="noreferrer"
                          target="_blank"
                          title="Artifact expired — view the workflow run instead"
                          className="inline-flex items-center gap-1 text-gray-400 dark:text-gray-500 hover:underline"
                        >
                          Expired
                          <ExternalIcon className="w-4 h-4 fill-current" />
                        </a>
                      ) : (
                        <a
                          href={build.downloadUrl}
                          rel="noreferrer"
                          title={`Download build #${build.number}`}
                          className="inline-flex items-center gap-1 text-gold-600 dark:text-gold-400 hover:underline"
                        >
                          <DownloadIcon className="w-5 h-5 fill-current" />
                          zip
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            Downloads are GitHub Actions artifacts served through{" "}
            <a href="https://nightly.link" rel="noreferrer" target="_blank" className="underline">
              nightly.link
            </a>
            . GitHub deletes artifacts about 90 days after a build — expired builds link to their workflow run.
          </p>
        </div>
      )}
    </div>
  );
}
