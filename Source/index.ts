//import {CE, E} from "js-vextensions";

// import own exports; thus we gain access to the exports object, letting us modify it
import * as frameworkExportsObject from ".";

//type __ = typeof import("../node_modules/js-vextensions/Helpers/@ApplyCETypes");
/*type __ = typeof import("js-vextensions/Helpers/@ApplyCETypes");
import "js-vextensions/Helpers/@ApplyCECode.js"; // eslint-disable-line*/

// disabled atm; causes error when imported with webpack (as in dtd)
//export * from "./@EnableExportOverwrites";
// special key, marking this module's exports object, which allows the patch in ExportOverwriteEnabler.ts to make the remaining exports overwriteable
//export const __EnableExportOverwrites__ = true;

export * from "./@Shared/Paths";

//export * from "./__DisableExportOverwrites__";
export const __DisableExportOverwrites__ = true;

// override system
// ==========

/*export const EVC_exports_orig = E(frameworkExportsInterface);
export const EVC_exports_final = frameworkExportsInterface;
export function EVC_OverrideExport(newValue_withNameProp: any);
export function EVC_OverrideExport(exportName: string, newValue: any);
export function EVC_OverrideExport(...args) {
	let exportName: string, newValue: any;
	if (args.length == 1) [exportName, newValue] = [args[0].name, args[0]];
	else [exportName, newValue] = args;
	EVC_exports_final[exportName] = newValue;
}*/

//export const EVC_exports_orig = E(CE(frameworkExportsObject).Excluding("EVC_exports_orig", "EVC_exports_final", "EVC_OverrideExport"));
// var required -- at least when imported with webpack (as in dtd)
export var EVC_exports_orig = {...frameworkExportsObject};
for (const key of ["EVC_exports_orig", "EVC_exports_final", "EVC_OverrideExport"]) {
	delete EVC_exports_orig[key];
}

export var EVC_exports_final = frameworkExportsObject;
export function EVC_OverrideExport(newValue_withNameProp: any);
export function EVC_OverrideExport(exportName: string, newValue: any);
export function EVC_OverrideExport(...args) {
	let exportName: string, newValue: any;
	if (args.length == 1) [exportName, newValue] = [args[0].name, args[0]];
	else [exportName, newValue] = args;
	delete EVC_exports_final[exportName]; // delete getter-setter
	EVC_exports_final[exportName] = newValue;
}