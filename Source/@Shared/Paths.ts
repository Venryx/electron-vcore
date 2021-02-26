import {app, remote, ipcRenderer, shell, contextBridge} from "electron";
//import {Assert} from "js-vextensions";
import paths from "path";

// temp
function Assert(condition: any, message: string = null) {
	if (condition) return;
	debugger;
	throw new Error(`Assert failed) ${message}`);
}

const electronApp = app ? app : remote.app;

// app-path is to the folder/asar-file containing the "Dist" folder (repo-root when in dev, AppData/Local/Programs/REPO_NAME/resources/[app/app.asar] when installed)
const appPath = paths.dirname(__dirname);
//const appPath = electronApp.getAppPath(); // same as __dirname
//const appPath = process.resourcesPath; // supposed to be equivalent, but not (points to ./node_modules/electron/something...)
const isPackaged = electronApp.isPackaged;

export const customResourcesPath = paths.join(isPackaged ? paths.dirname(appPath) : appPath, "Resources");
console.log("Custom resources path:", customResourcesPath);

export const userDataPath = electronApp.getPath("userData");
export const mainDataPath = paths.join(userDataPath, "MainData");
console.log("Main-data path:", mainDataPath);

export function ResolvePathMarkers(path: string) {
	return path.replace(/\*MainData\*/g, mainDataPath);
}
export function IsPathAUnderPathB(pathA: string, pathB: string) {
	const relativePath = paths.relative(pathB, pathA);
	return relativePath && !relativePath.startsWith("..") && !paths.isAbsolute(relativePath);
}

//const rootFolderPath = paths.resolve(".");
// defensive function, for if frontend is somehow compromised, and tries to send data that results in a path-segment with ".." in it
// usage rule-of-thumb: wrap any [path/path-segment]-constructing template-literal/concatenation with this
export function PathSeg(pathSegment: string, allowUp = false) {
	Assert(typeof pathSegment == "string");
	if (!allowUp) Assert(!pathSegment.includes("..")); // defensive
	return pathSegment;
}