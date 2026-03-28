import { readdirSync, unlinkSync, existsSync } from "fs";
import { resolve } from "path";
import {
  createRL,
  prompt,
  choose,
  confirm,
  readJSON,
  writeJSON,
  readText,
  writeText,
  run,
  runCapture,
  isDefaultConfig,
  PATHS,
} from "./lib/utils.js";
import { switchScheme } from "./theme.js";
import { deployFlow } from "./deploy.js";

function updateConfig(name, title, description, url) {
  let content = readText(PATHS.config);
  content = content.replace(/name:\s*"[^"]*"/, `name: "${name}"`);
  content = content.replace(/title:\s*"[^"]*"/, `title: "${title}"`);
  content = content.replace(
    /description:\s*"[^"]*"/,
    `description: "${description}"`,
  );
  content = content.replace(/url:\s*"[^"]*"/, `url: "${url}"`);
  writeText(PATHS.config, content);
}

function removeDemoContent() {
  let removed = 0;

  // Remove demo posts
  if (existsSync(PATHS.posts)) {
    const posts = readdirSync(PATHS.posts, { recursive: true });
    for (const file of posts) {
      const filePath = resolve(PATHS.posts, file);
      try {
        unlinkSync(filePath);
        removed++;
      } catch {
        // skip directories
      }
    }
  }

  // Remove demo images
  if (existsSync(PATHS.images)) {
    const images = readdirSync(PATHS.images);
    for (const file of images) {
      unlinkSync(resolve(PATHS.images, file));
      removed++;
    }
  }

  console.log(`Removed ${removed} demo files.`);
}

function createPost(title, description) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const date = new Date().toISOString().slice(0, 10);
  const content = `---
title: ${title}
date: ${date}
description: ${description}
---

Start writing here.
`;
  const filePath = resolve(PATHS.posts, `${slug}.md`);
  writeText(filePath, content);
  console.log(`Created: src/content/posts/${slug}.md`);
}

async function main() {
  const rl = createRL();

  console.log("\ninkwell setup\n");

  // Warn if already configured
  if (!isDefaultConfig()) {
    console.log("This site appears to already be configured.");
    if (!(await confirm(rl, "Continue and overwrite?"))) {
      rl.close();
      return;
    }
  }

  // Site identity
  const name = await prompt(rl, "Site name: ");
  const title = (await prompt(rl, `Site title (${name}): `)) || name;
  const description = await prompt(rl, "Description: ");
  const url = await prompt(rl, "Site URL (leave blank to set later): ");

  updateConfig(name, title, description, url);
  console.log("Updated site config.");

  // Color scheme
  const tokens = readJSON(PATHS.tokenJson);
  const schemes = Object.keys(tokens.color);
  const scheme = await choose(rl, "Color scheme:", schemes);
  switchScheme(scheme);

  // Font stack
  const fontStack = await choose(rl, "Font stack:", ["serif", "sans"]);
  tokens.typography = { ...readJSON(PATHS.tokenJson).typography, fontStack };
  const updatedTokens = readJSON(PATHS.tokenJson);
  updatedTokens.typography.fontStack = fontStack;
  writeJSON(PATHS.tokenJson, updatedTokens);
  console.log(`Set font stack to ${fontStack}.`);

  // Git remote
  if (await confirm(rl, "Set up a git remote?")) {
    const remoteUrl = await prompt(rl, "Remote URL: ");
    try {
      runCapture("git remote get-url origin");
      run(`git remote set-url origin ${remoteUrl}`);
      console.log("Updated origin remote.");
    } catch {
      run(`git remote add origin ${remoteUrl}`);
      console.log("Added origin remote.");
    }
  }

  // Demo content
  if (await confirm(rl, "Remove demo posts and images?")) {
    removeDemoContent();
  }

  // First post
  if (await confirm(rl, "Create your first post?")) {
    const postTitle = await prompt(rl, "Post title: ");
    const postDesc = await prompt(rl, "Post description: ");
    createPost(postTitle, postDesc);
  }

  // Deploy
  if (await confirm(rl, "Deploy now?")) {
    try {
      run("pnpm build");
      await deployFlow(rl);
    } catch {
      console.log("Deploy failed. You can run `pnpm ik:deploy` later.");
    }
  }

  console.log("\nSetup complete. Run `pnpm dev` to start writing.");
  rl.close();
}

main();
