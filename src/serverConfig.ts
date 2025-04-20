type InitType = {
  tailwind: boolean;
};

export function CreateServerConfig({ tailwind }: InitType) {
  return `
import type { ServerConfig } from "bunext-js/internal/types.ts";
${tailwind ? `import TailwindPlugin from "tailwind-bunext-plugin";` : ""};
const Config: ServerConfig = {
  HTTPServer: {
    port: 3010,
    threads: 1,
  },
  Dev: {
    hotServerPort: 3005,
  },
  build: {
    plugins: [],
  },
  session: {
    timeout: 3600,
    type: "database:hard",
  },
  router: {
    dynamicPaths: [],
  },
  bunext_plugins: [${tailwind ? "TailwindPlugin" : ""}],
};

export default Config;
`;
}
