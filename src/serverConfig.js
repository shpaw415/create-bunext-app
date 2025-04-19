"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateServerConfig = CreateServerConfig;
function CreateServerConfig(_a) {
    var tailwind = _a.tailwind;
    return "\nimport type { ServerConfig } from \"@bunpmjs/bunext/internal/types.ts\";\n".concat(tailwind
        ? "import Tailwind from \"@bunpmjs/bunext/external-plugins/tailwind.ts\""
        : "", ";\nconst Config: ServerConfig = {\n  HTTPServer: {\n    port: 3010,\n    threads: 1,\n  },\n  Dev: {\n    hotServerPort: 3005,\n  },\n  build: {\n    plugins: [],\n  },\n  session: {\n    timeout: 3600,\n    type: \"database:hard\",\n  },\n  router: {\n    dynamicPaths: [],\n  },\n  bunext_plugins: [").concat(tailwind ? "Tailwind" : "", "],\n};\n\nexport default Config;\n");
}
