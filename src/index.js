"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var prompts_1 = require("@inquirer/prompts");
var node_fs_1 = require("node:fs");
var serverConfig_1 = require("./serverConfig");
var name = await (0, prompts_1.input)({
    message: "Project Name?",
});
var tailwind = await (0, prompts_1.confirm)({
    message: "Do you want to use Tailwindcss?",
});
(0, node_fs_1.mkdirSync)(name, { recursive: true });
console.log("Creating project ".concat(name, "..."));
await Bun.$(templateObject_1 || (templateObject_1 = __makeTemplateObject(["bun init -y"], ["bun init -y"]))).cwd(name);
await Bun.$(templateObject_2 || (templateObject_2 = __makeTemplateObject(["bun i @bunpmjs/bunext"], ["bun i @bunpmjs/bunext"]))).cwd(name);
await Bun.$(templateObject_3 || (templateObject_3 = __makeTemplateObject(["bun @bunpmjs/bunext/bin/index.ts init"], ["bun @bunpmjs/bunext/bin/index.ts init"]))).cwd(name);
if (tailwind) {
    await Bun.$(templateObject_4 || (templateObject_4 = __makeTemplateObject(["bun i tailwindcss @tailwindcss/cli"], ["bun i tailwindcss @tailwindcss/cli"]))).cwd(name);
    await Bun.file("".concat(name, "/config/server.ts")).write((0, serverConfig_1.CreateServerConfig)({ tailwind: tailwind }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
