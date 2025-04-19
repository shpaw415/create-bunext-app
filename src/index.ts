import { input, confirm } from "@inquirer/prompts";
import { mkdirSync } from "node:fs";
import { CreateServerConfig } from "./serverConfig";

const name = await input({
  message: "Project Name?",
});

const tailwind = await confirm({
  message: "Do you want to use Tailwindcss?",
});

mkdirSync(name, { recursive: true });
console.log(`Creating project ${name}...`);

await Bun.$`bun init -y`.cwd(name);
await Bun.$`bun i @bunpmjs/bunext`.cwd(name);
await Bun.$`bun @bunpmjs/bunext/bin/index.ts init`.cwd(name);

if (tailwind) {
  await Bun.$`bun i tailwindcss @tailwindcss/cli`.cwd(name);
  await Bun.file(`${name}/config/server.ts`).write(
    CreateServerConfig({ tailwind })
  );
}
