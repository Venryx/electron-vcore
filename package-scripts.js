function TSScript(scriptPath) {
	const envPart = `TS_NODE_SKIP_IGNORE=true TS_NODE_PROJECT=Scripts/tsconfig.json TS_NODE_TRANSPILE_ONLY=true`;
	const nodeFlags = `--loader ts-node/esm.mjs --experimental-specifier-resolution=node`;
	return `cross-env ${envPart} node ${nodeFlags} ${scriptPath}`;
}

//const memLimit = 4096;
const memLimit = 8192; // in megabytes

module.exports = {
	scripts: {
	},
};