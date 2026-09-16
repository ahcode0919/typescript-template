import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, unlinkSync } from "node:fs";

import assert from "node:assert";

const readline = createInterface({ input, output });
const projectName = await readline.question("Enter project name (kebab-case): ");
const description = await readline.question("Enter project description: ");
readline.close();

const gitUrl = await execSync("git remote get-url origin").toString().trim();
assert(gitUrl.length > 0, "No origin url for git repository found");

const githubUrl = gitUrl
  .replace(/^git@github\.com:/, "https://github.com/")
  .replace(/\.git$/, "");

console.log("Project name: ", projectName);
console.log("Description: ", description);
console.log("Git URL: ", gitUrl);
console.log("Github URL: ", githubUrl);


// set package name, description, and version
await execSync(`npm pkg set name="${projectName}"`);
await execSync(`npm pkg set description="${description}"`);
await execSync(`npm pkg set version="0.0.1"`);

// update repository fields
await execSync(`npm pkg set repository.url="git+${gitUrl}"`);
await execSync(`npm pkg set bugs.url="${githubUrl}/issues"`);
await execSync(`npm pkg set homepage="${githubUrl}"`);

// uninstall @types/node
await execSync(`npm uninstall @types/node`);

// update tsconfig to remove migrate.ts
const path = "tsconfig.json";
const text = readFileSync(path, "utf-8");
const updated = text.replace(/,\s*"migrate\.ts"/, "");

writeFileSync(path, updated);

// Update Justfile
const justfile = "justfile";
const justfileText = readFileSync(justfile, "utf-8");
const updatedJustfile = justfileText
    .replace(/migrate:\n/, "")
    .replace(/\s+node migrate.ts\n/, "");

writeFileSync(justfile, updatedJustfile);

// Update README
const readme = "README.md";
const readmeText = readFileSync(readme, "utf-8").split("\n");
const title = projectName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
readmeText[0] = `# ${title}`;
readmeText[3] = description;

writeFileSync(readme, readmeText.join("\n"));

// Remove this file
unlinkSync("migrate.ts");