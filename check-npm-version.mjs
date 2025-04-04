import { execSync } from "child_process";

const REQUIRED_NPM_VERSION = "10.0.0";
const REQUIRED_NODE_VERSION = "20.0.0";

const getVersion = (cmd) => execSync(cmd).toString().trim();
const compareVersions = (v1, v2) =>
  v1.localeCompare(v2, undefined, { numeric: true });

const currentNpmVersion = getVersion("npm -v");
const currentNodeVersion = process.version.replace(/^v/, ""); // Remove 'v'

if (compareVersions(currentNodeVersion, REQUIRED_NODE_VERSION) < 0) {
  console.error(
    `❌ ERROR: Node.js version must be >= ${REQUIRED_NODE_VERSION} (Found: ${currentNodeVersion})`
  );
  process.exit(1);
}

if (compareVersions(currentNpmVersion, REQUIRED_NPM_VERSION) < 0) {
  console.error(
    `❌ ERROR: npm version must be >= ${REQUIRED_NPM_VERSION} (Found: ${currentNpmVersion})`
  );
  process.exit(1);
}

console.log(
  `✅ Node.js: ${currentNodeVersion}, npm: ${currentNpmVersion} - Proceeding...`
);
