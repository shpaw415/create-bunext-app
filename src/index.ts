import { input, confirm } from "@inquirer/prompts";
import { mkdirSync } from "node:fs";
import { CreateServerConfig } from "./serverConfig";

type Options = {
  name: string;
  tailwind: boolean;
};

function execute(cmd: string) {
  return Bun.spawnSync({
    cmd: ["bun", ...cmd.split(" ")],
    stdout: "inherit",
    stderr: "inherit",
  });
}

function createInstallList(options: Options) {
  const { tailwind } = options;
  const list = ["@bunpmjs/bunext"];
  if (tailwind) {
    list.push("tailwindcss", "@tailwindcss/cli");
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

function InstallBunext(options: Options) {
  const executeList = [
    `install ${createInstallList(options).join(" ")}`,
    "@bunpmjs/bunext/bin/index.ts init",
  ];
  for (const cmd of executeList) execute(cmd);
}

async function Main() {
  const options = await GetOptionsFromUser();
  console.log(`Creating project ${options.name}...`);

  InstallBunext(options);

  if (options.tailwind) {
    await Bun.file(`${options.name}/config/server.ts`).write(
      CreateServerConfig({ tailwind: options.tailwind })
    );
  }
}

await Main();
