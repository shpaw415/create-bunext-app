import { input, confirm } from "@inquirer/prompts";
import { CreateServerConfig } from "./serverConfig";

type Options = {
  name: string;
  tailwind: boolean;
};

function execute(cmd: string) {
  return Bun.$`bun ${cmd}`;
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

async function InstallBunext(options: Options) {
  const executeList = [`i ${createInstallList(options).join(" ")}`, "run init"];
  for (const cmd of executeList) await execute(cmd);
}

async function Main() {
  const options = await GetOptionsFromUser();
  console.log(`Creating project ${options.name}...`);

  await InstallBunext(options);

  if (options.tailwind) {
    await Bun.file(`${options.name}/config/server.ts`).write(
      CreateServerConfig({ tailwind: options.tailwind })
    );
  }
}

await Main();
