import { existsSync } from "fs";
import {
  createRL,
  choose,
  confirm,
  readJSON,
  writeJSON,
  readText,
  writeText,
  run,
  detectPlatform,
  PATHS,
} from "./lib/utils.js";
import { vercelConfig, wranglerConfig, netlifyConfig } from "./lib/deploy-configs.js";

const PLATFORMS = ["vercel", "cloudflare", "netlify"];

const DEPLOY_COMMANDS = {
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

export async function deployFlow(rl) {
  const platformFlag = process.argv.find((a) => a.startsWith("--platform="));
  let platform = platformFlag ? platformFlag.split("=")[1] : detectPlatform();

  if (platformFlag && !PLATFORMS.includes(platform)) {
    console.log(`Unknown platform "${platform}". Options: ${PLATFORMS.join(", ")}`);
    return;
  }

  if (!platform) {
    platform = await choose(rl, "Deploy platform:", PLATFORMS);
    generateConfig(platform);
  } else {
    console.log(`Deploying to ${platform}...`);
    if (!existsSync(CONFIG_FILES[platform])) {
      generateConfig(platform);
    }
  }

  try {
    run(DEPLOY_COMMANDS[platform]);
    console.log("Deploy complete.");
  } catch {
    console.log("Deploy failed. Check the output above.");
  }
}

async function main() {
  const rl = createRL();

  const platform = detectPlatform();
  if (platform) {
    if (await confirm(rl, `Deploy to ${platform}?`)) {
      run("pnpm build");
      await deployFlow(rl);
    }
  } else {
    await deployFlow(rl);
  }

  rl.close();
}

const isMain = process.argv[1]?.endsWith("deploy.js");
if (isMain) main();
