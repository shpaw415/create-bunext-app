#!/usr/bin/env bun
import { input, confirm } from "@inquirer/prompts";
import { CreateServerConfig } from "./serverConfig";
import { mkdirSync } from "node:fs";
import { join, normalize } from "node:path";

type Options = {
  name: string;
  tailwind: boolean;
};

function execute(cmd: string, name: string) {
  Bun.spawnSync({
    cmd: ["bun", ...cmd.split(" ")],
    stdout: "inherit",
    stderr: "inherit",
    cwd: normalize(join(process.cwd(), name)),
  });
}

function createInstallList(options: Options) {
  const { tailwind } = options;
  const list = ["bunext-js"];
  if (tailwind) {
    list.push("tailwind-bunext-plugin");
  }
  return list;
}

async function GetOptionsFromUser(): Promise<Options> {
  const name = await input({
    message: "Project Name?",
  });
  const tailwind = await confirm({
    message: "Do you want to use Tailwindcss?",
  });
  return {
    name,
    tailwind,
  };
}

async function InstallBunext(options: Options) {
  const executeList = [
    `install ${createInstallList(options).join(" ")}`,
    "init -y",
    "node_modules/bunext-js/bin/index.ts init",
  ];
  for (const cmd of executeList) execute(cmd, options.name);
}

async function Main() {
  const options = await GetOptionsFromUser();
  console.log(`Creating project ${options.name}...`);
  mkdirSync(options.name, { recursive: true });
  await InstallBunext(options);

  if (options.tailwind) {
    await Bun.file(`${options.name}/config/server.ts`).write(
      CreateServerConfig({ tailwind: options.tailwind })
    );
  }
}

Main();
