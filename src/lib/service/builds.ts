export const GITHUB_OWNER = "GoldenForge";
export const GITHUB_REPO = "GoldenForge";
export const GITHUB_REPO_URL = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`;
export const WORKFLOW_FILE = "build.yml";

// Artifacts are deleted by GitHub ~90 days after the run.
const ARTIFACT_RETENTION_MS = 90 * 24 * 60 * 60 * 1000;

export interface GoldenVersion {
  mc: string;
  branch: string;
  artifact: string;
  available: boolean;
}

export const VERSIONS: GoldenVersion[] = [
  { mc: "1.21.1", branch: "1.21.1", artifact: "goldenforge-1.21.1", available: true },
  { mc: "26.1", branch: "26.1", artifact: "goldenforge-26.1", available: false },
];

export const DEFAULT_VERSION = VERSIONS.find((v) => v.available)!;

export interface GoldenBuild {
  number: number;
  runId: number;
  runUrl: string;
  commitSha: string;
  commitMessage: string;
  date: string;
  downloadUrl: string;
  expired: boolean;
}

export const latestDownloadUrl = (version: GoldenVersion): string =>
  `https://nightly.link/${GITHUB_OWNER}/${GITHUB_REPO}/workflows/${WORKFLOW_FILE.replace(/\.ya?ml$/, "")}/${version.branch}/${version.artifact}.zip`;

const runDownloadUrl = (runId: number, version: GoldenVersion): string =>
  `https://nightly.link/${GITHUB_OWNER}/${GITHUB_REPO}/actions/runs/${runId}/${version.artifact}.zip`;

interface WorkflowRun {
  id: number;
  run_number: number;
  head_sha: string;
  head_commit: { message: string } | null;
  created_at: string;
  html_url: string;
}

export const getBuilds = async (version: GoldenVersion, limit = 30): Promise<GoldenBuild[]> => {
  if (!version.available) return [];

  const url =
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/actions/workflows/${WORKFLOW_FILE}/runs` +
    `?branch=${encodeURIComponent(version.branch)}&status=success&per_page=${limit}`;

  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) return [];

  const data: { workflow_runs: WorkflowRun[] } = await res.json();
  const now = Date.now();

  return data.workflow_runs.map((run) => ({
    number: run.run_number,
    runId: run.id,
    runUrl: run.html_url,
    commitSha: run.head_sha,
    commitMessage: run.head_commit?.message.split("\n")[0] ?? "",
    date: run.created_at,
    downloadUrl: runDownloadUrl(run.id, version),
    expired: now - new Date(run.created_at).getTime() > ARTIFACT_RETENTION_MS,
  }));
};

export const getLatestBuild = async (version: GoldenVersion): Promise<GoldenBuild | null> => {
  const builds = await getBuilds(version, 1);
  return builds[0] ?? null;
};
