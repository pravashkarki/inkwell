import { existsSync } from "fs";
import {
  createRL,
  choose,
  confirm,
  prompt,
  readJSON,
  writeJSON,
  readText,
  writeText,
  run,
  runCapture,
  detectPlatform,
  PATHS,
} from "./lib/utils.js";
import { vercelConfig, wranglerConfig, netlifyConfig } from "./lib/deploy-configs.js";

const PLATFORMS = ["git", "vercel", "cloudflare", "netlify"];

const CLI_DEPLOY_COMMANDS = {
  vercel: "npx vercel --prod",
  cloudflare: "npx wrangler pages deploy dist",
  netlify: "npx netlify-cli deploy --prod --dir=dist",
};

const CONFIG_FILES = {
  vercel: PATHS.vercelJson,
  cloudflare: PATHS.wranglerToml,
  netlify: PATHS.netlifyToml,
};

export function generateConfig(platform) {
  if (platform === "git") return;
  if (platform === "vercel") {
    writeJSON(PATHS.vercelJson, vercelConfig());
  } else if (platform === "cloudflare") {
    const pkg = readJSON(PATHS.packageJson);
    writeText(PATHS.wranglerToml, wranglerConfig(pkg.name || "inkwell"));
  } else if (platform === "netlify") {
    writeText(PATHS.netlifyToml, netlifyConfig());
  }
  console.log(`Generated ${platform} config.`);
}

function gitDeploy() {
  try {
    runCapture("git remote get-url origin");
  } catch {
    console.log("No git remote found. Set one up with `git remote add origin <url>`.");
    return;
  }

  const status = runCapture("git status --porcelain");
  if (status) {
    run("git add -A");
    run('git commit -m "[build] Deploy"');
  }

  const branch = runCapture("git rev-parse --abbrev-ref HEAD");
  run(`git push origin ${branch}`);
  console.log("Pushed to remote. Your hosting platform will build and deploy.");
}

export async function deployFlow(rl) {
  const platformFlag = process.argv.find((a) => a.startsWith("--platform="));
  let platform = platformFlag ? platformFlag.split("=")[1] : null;

  if (platformFlag && !PLATFORMS.includes(platform)) {
    console.log(`Unknown platform "${platform}". Options: ${PLATFORMS.join(", ")}`);
    return;
  }

  if (!platform) {
    const detected = detectPlatform();
    if (detected) {
      const method = await choose(rl, `Detected ${detected}. Deploy via:`, [
        "git push (recommended)",
        `${detected} CLI`,
      ]);
      platform = method.startsWith("git") ? "git" : detected;
    } else {
      platform = await choose(rl, "Deploy method:", PLATFORMS);
      if (platform !== "git") generateConfig(platform);
    }
  }

  if (platform === "git") {
    gitDeploy();
    return;
  }

  if (!existsSync(CONFIG_FILES[platform])) {
    generateConfig(platform);
  }

  try {
    run(CLI_DEPLOY_COMMANDS[platform]);
    console.log("Deploy complete.");
  } catch {
    console.log("Deploy failed. Check the output above.");
  }
}

async function main() {
  const rl = createRL();

  run("pnpm build");
  await deployFlow(rl);

  rl.close();
}

const isMain = process.argv[1]?.endsWith("deploy.js");
if (isMain) main();
