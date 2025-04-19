import { input, confirm } from "@inquirer/prompts";
import { mkdirSync } from "node:fs";
import { CreateServerConfig } from "./serverConfig";

type Options = {
  name: string;
  tailwind: boolean;
};

function execute(cmd: string, cwd: string) {
  return Bun.$`bun ${cmd}`.cwd(cwd);
}

function createInstallList(options: Options) {
  const { tailwind } = options;
  const list = ["@bunpmjs/bunext", "@bunpmjs/bunext/bin/index.ts"];
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

async function InstallBunext(options: Options) {
  const executeList = [
    "init -y",
    `install ${createInstallList(options).join(" ")}`,
    "@bunpmjs/bunext/bin/index.ts init",
  ];
  const { name } = options;

  for await (const cmd of executeList) {
    await execute(cmd, name);
  }
}

async function Main() {
  const options = await GetOptionsFromUser();
  mkdirSync(options.name, { recursive: true });
  console.log(`Creating project ${options.name}...`);

  await InstallBunext(options);

  if (options.tailwind) {
    await Bun.file(`${options.name}/config/server.ts`).write(
      CreateServerConfig({ tailwind: options.tailwind })
    );
  }
}

await Main();
