/// <reference types="node" />
import vm = require("vm");
/** mtime based scriptlet file cache policy */
export declare const MTIME = "mtime";
/** error code - dependency loop detected */
export declare const ERR_DEPENDENCY_LOOP = "ERR_DEPENDENCY_LOOP";
/** error code - missing dependency */
export declare const ERR_DEPENDENCY_MISSING = "ERR_DEPENDENCY_MISSING";
/** all cached scripts */
export declare const cachedScriptlets: Map<string, ICachedScriptlet>;
/** cached script */
export interface ICachedScriptlet {
    /** full path for scriptlet */
    fullPath: string;
    /** mtime in milisecond of scriptlet file */
    mtimeMs: number;
    /** compiled vm.Script */
    script: vm.Script;
}
/** scriptlet execution option */
export interface IScriptletOption {
    /**
     * extra dependencies for script, key prefixed with '$' is strongly suggested
     */
    extra?: Map<string, any>;
    /**
     * cache policy, true for full cache, false for none cache, 'mtime' for
     * mtime based file cache, default to 'false'
     */
    cache?: boolean | string;
    /**
     * internal tracker for dependency loop detection
     */
    _loopTracker?: Set<string>;
}
export declare class ScriptletError extends Error {
    code: string;
    constructor(code: string, message: string);
}
/**
 * run a scriptlet
 * @param id scriptlet file to run
 * @param option scriptlet execution option
 */
export declare function run(file: string, option?: IScriptletOption): Promise<any>;
