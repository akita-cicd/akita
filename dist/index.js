require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 350:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(37));
const utils_1 = __nccwpck_require__(369);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 24:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(350);
const file_command_1 = __nccwpck_require__(466);
const utils_1 = __nccwpck_require__(369);
const os = __importStar(__nccwpck_require__(37));
const path = __importStar(__nccwpck_require__(17));
const oidc_utils_1 = __nccwpck_require__(557);
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    return inputs;
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function error(message, properties = {}) {
    command_1.issueCommand('error', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function warning(message, properties = {}) {
    command_1.issueCommand('warning', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function notice(message, properties = {}) {
    command_1.issueCommand('notice', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.notice = notice;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
function getIDToken(aud) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
    });
}
exports.getIDToken = getIDToken;
/**
 * Summary exports
 */
var summary_1 = __nccwpck_require__(29);
Object.defineProperty(exports, "summary", ({ enumerable: true, get: function () { return summary_1.summary; } }));
/**
 * @deprecated use core.summary
 */
var summary_2 = __nccwpck_require__(29);
Object.defineProperty(exports, "markdownSummary", ({ enumerable: true, get: function () { return summary_2.markdownSummary; } }));
/**
 * Path exports
 */
var path_utils_1 = __nccwpck_require__(64);
Object.defineProperty(exports, "toPosixPath", ({ enumerable: true, get: function () { return path_utils_1.toPosixPath; } }));
Object.defineProperty(exports, "toWin32Path", ({ enumerable: true, get: function () { return path_utils_1.toWin32Path; } }));
Object.defineProperty(exports, "toPlatformPath", ({ enumerable: true, get: function () { return path_utils_1.toPlatformPath; } }));
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 466:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issueCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(147));
const os = __importStar(__nccwpck_require__(37));
const utils_1 = __nccwpck_require__(369);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 557:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OidcClient = void 0;
const http_client_1 = __nccwpck_require__(745);
const auth_1 = __nccwpck_require__(834);
const core_1 = __nccwpck_require__(24);
class OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
            allowRetries: allowRetry,
            maxRetries: maxRetry
        };
        return new http_client_1.HttpClient('actions/oidc-client', [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
    }
    static getRequestToken() {
        const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
        if (!token) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable');
        }
        return token;
    }
    static getIDTokenUrl() {
        const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
        if (!runtimeUrl) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable');
        }
        return runtimeUrl;
    }
    static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const httpclient = OidcClient.createHttpClient();
            const res = yield httpclient
                .getJson(id_token_url)
                .catch(error => {
                throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.result.message}`);
            });
            const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
            if (!id_token) {
                throw new Error('Response json body do not have ID Token field');
            }
            return id_token;
        });
    }
    static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // New ID Token is requested from action service
                let id_token_url = OidcClient.getIDTokenUrl();
                if (audience) {
                    const encodedAudience = encodeURIComponent(audience);
                    id_token_url = `${id_token_url}&audience=${encodedAudience}`;
                }
                core_1.debug(`ID token url is ${id_token_url}`);
                const id_token = yield OidcClient.getCall(id_token_url);
                core_1.setSecret(id_token);
                return id_token;
            }
            catch (error) {
                throw new Error(`Error message: ${error.message}`);
            }
        });
    }
}
exports.OidcClient = OidcClient;
//# sourceMappingURL=oidc-utils.js.map

/***/ }),

/***/ 64:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toPlatformPath = exports.toWin32Path = exports.toPosixPath = void 0;
const path = __importStar(__nccwpck_require__(17));
/**
 * toPosixPath converts the given path to the posix form. On Windows, \\ will be
 * replaced with /.
 *
 * @param pth. Path to transform.
 * @return string Posix path.
 */
function toPosixPath(pth) {
    return pth.replace(/[\\]/g, '/');
}
exports.toPosixPath = toPosixPath;
/**
 * toWin32Path converts the given path to the win32 form. On Linux, / will be
 * replaced with \\.
 *
 * @param pth. Path to transform.
 * @return string Win32 path.
 */
function toWin32Path(pth) {
    return pth.replace(/[/]/g, '\\');
}
exports.toWin32Path = toWin32Path;
/**
 * toPlatformPath converts the given path to a platform-specific path. It does
 * this by replacing instances of / and \ with the platform-specific path
 * separator.
 *
 * @param pth The path to platformize.
 * @return string The platform-specific path.
 */
function toPlatformPath(pth) {
    return pth.replace(/[/\\]/g, path.sep);
}
exports.toPlatformPath = toPlatformPath;
//# sourceMappingURL=path-utils.js.map

/***/ }),

/***/ 29:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.summary = exports.markdownSummary = exports.SUMMARY_DOCS_URL = exports.SUMMARY_ENV_VAR = void 0;
const os_1 = __nccwpck_require__(37);
const fs_1 = __nccwpck_require__(147);
const { access, appendFile, writeFile } = fs_1.promises;
exports.SUMMARY_ENV_VAR = 'GITHUB_STEP_SUMMARY';
exports.SUMMARY_DOCS_URL = 'https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary';
class Summary {
    constructor() {
        this._buffer = '';
    }
    /**
     * Finds the summary file path from the environment, rejects if env var is not found or file does not exist
     * Also checks r/w permissions.
     *
     * @returns step summary file path
     */
    filePath() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._filePath) {
                return this._filePath;
            }
            const pathFromEnv = process.env[exports.SUMMARY_ENV_VAR];
            if (!pathFromEnv) {
                throw new Error(`Unable to find environment variable for $${exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
            }
            try {
                yield access(pathFromEnv, fs_1.constants.R_OK | fs_1.constants.W_OK);
            }
            catch (_a) {
                throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
            }
            this._filePath = pathFromEnv;
            return this._filePath;
        });
    }
    /**
     * Wraps content in an HTML tag, adding any HTML attributes
     *
     * @param {string} tag HTML tag to wrap
     * @param {string | null} content content within the tag
     * @param {[attribute: string]: string} attrs key-value list of HTML attributes to add
     *
     * @returns {string} content wrapped in HTML element
     */
    wrap(tag, content, attrs = {}) {
        const htmlAttrs = Object.entries(attrs)
            .map(([key, value]) => ` ${key}="${value}"`)
            .join('');
        if (!content) {
            return `<${tag}${htmlAttrs}>`;
        }
        return `<${tag}${htmlAttrs}>${content}</${tag}>`;
    }
    /**
     * Writes text in the buffer to the summary buffer file and empties buffer. Will append by default.
     *
     * @param {SummaryWriteOptions} [options] (optional) options for write operation
     *
     * @returns {Promise<Summary>} summary instance
     */
    write(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
            const filePath = yield this.filePath();
            const writeFunc = overwrite ? writeFile : appendFile;
            yield writeFunc(filePath, this._buffer, { encoding: 'utf8' });
            return this.emptyBuffer();
        });
    }
    /**
     * Clears the summary buffer and wipes the summary file
     *
     * @returns {Summary} summary instance
     */
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.emptyBuffer().write({ overwrite: true });
        });
    }
    /**
     * Returns the current summary buffer as a string
     *
     * @returns {string} string of summary buffer
     */
    stringify() {
        return this._buffer;
    }
    /**
     * If the summary buffer is empty
     *
     * @returns {boolen} true if the buffer is empty
     */
    isEmptyBuffer() {
        return this._buffer.length === 0;
    }
    /**
     * Resets the summary buffer without writing to summary file
     *
     * @returns {Summary} summary instance
     */
    emptyBuffer() {
        this._buffer = '';
        return this;
    }
    /**
     * Adds raw text to the summary buffer
     *
     * @param {string} text content to add
     * @param {boolean} [addEOL=false] (optional) append an EOL to the raw text (default: false)
     *
     * @returns {Summary} summary instance
     */
    addRaw(text, addEOL = false) {
        this._buffer += text;
        return addEOL ? this.addEOL() : this;
    }
    /**
     * Adds the operating system-specific end-of-line marker to the buffer
     *
     * @returns {Summary} summary instance
     */
    addEOL() {
        return this.addRaw(os_1.EOL);
    }
    /**
     * Adds an HTML codeblock to the summary buffer
     *
     * @param {string} code content to render within fenced code block
     * @param {string} lang (optional) language to syntax highlight code
     *
     * @returns {Summary} summary instance
     */
    addCodeBlock(code, lang) {
        const attrs = Object.assign({}, (lang && { lang }));
        const element = this.wrap('pre', this.wrap('code', code), attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML list to the summary buffer
     *
     * @param {string[]} items list of items to render
     * @param {boolean} [ordered=false] (optional) if the rendered list should be ordered or not (default: false)
     *
     * @returns {Summary} summary instance
     */
    addList(items, ordered = false) {
        const tag = ordered ? 'ol' : 'ul';
        const listItems = items.map(item => this.wrap('li', item)).join('');
        const element = this.wrap(tag, listItems);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML table to the summary buffer
     *
     * @param {SummaryTableCell[]} rows table rows
     *
     * @returns {Summary} summary instance
     */
    addTable(rows) {
        const tableBody = rows
            .map(row => {
            const cells = row
                .map(cell => {
                if (typeof cell === 'string') {
                    return this.wrap('td', cell);
                }
                const { header, data, colspan, rowspan } = cell;
                const tag = header ? 'th' : 'td';
                const attrs = Object.assign(Object.assign({}, (colspan && { colspan })), (rowspan && { rowspan }));
                return this.wrap(tag, data, attrs);
            })
                .join('');
            return this.wrap('tr', cells);
        })
            .join('');
        const element = this.wrap('table', tableBody);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds a collapsable HTML details element to the summary buffer
     *
     * @param {string} label text for the closed state
     * @param {string} content collapsable content
     *
     * @returns {Summary} summary instance
     */
    addDetails(label, content) {
        const element = this.wrap('details', this.wrap('summary', label) + content);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML image tag to the summary buffer
     *
     * @param {string} src path to the image you to embed
     * @param {string} alt text description of the image
     * @param {SummaryImageOptions} options (optional) addition image attributes
     *
     * @returns {Summary} summary instance
     */
    addImage(src, alt, options) {
        const { width, height } = options || {};
        const attrs = Object.assign(Object.assign({}, (width && { width })), (height && { height }));
        const element = this.wrap('img', null, Object.assign({ src, alt }, attrs));
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML section heading element
     *
     * @param {string} text heading text
     * @param {number | string} [level=1] (optional) the heading level, default: 1
     *
     * @returns {Summary} summary instance
     */
    addHeading(text, level) {
        const tag = `h${level}`;
        const allowedTag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)
            ? tag
            : 'h1';
        const element = this.wrap(allowedTag, text);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML thematic break (<hr>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */
    addSeparator() {
        const element = this.wrap('hr', null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML line break (<br>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */
    addBreak() {
        const element = this.wrap('br', null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML blockquote to the summary buffer
     *
     * @param {string} text quote text
     * @param {string} cite (optional) citation url
     *
     * @returns {Summary} summary instance
     */
    addQuote(text, cite) {
        const attrs = Object.assign({}, (cite && { cite }));
        const element = this.wrap('blockquote', text, attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML anchor tag to the summary buffer
     *
     * @param {string} text link text/content
     * @param {string} href hyperlink
     *
     * @returns {Summary} summary instance
     */
    addLink(text, href) {
        const element = this.wrap('a', text, { href });
        return this.addRaw(element).addEOL();
    }
}
const _summary = new Summary();
/**
 * @deprecated use `core.summary`
 */
exports.markdownSummary = _summary;
exports.summary = _summary;
//# sourceMappingURL=summary.js.map

/***/ }),

/***/ 369:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandProperties = exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */
function toCommandProperties(annotationProperties) {
    if (!Object.keys(annotationProperties).length) {
        return {};
    }
    return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
    };
}
exports.toCommandProperties = toCommandProperties;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 834:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonalAccessTokenCredentialHandler = exports.BearerCredentialHandler = exports.BasicCredentialHandler = void 0;
class BasicCredentialHandler {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString('base64')}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.BasicCredentialHandler = BasicCredentialHandler;
class BearerCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Bearer ${this.token}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.BearerCredentialHandler = BearerCredentialHandler;
class PersonalAccessTokenCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Basic ${Buffer.from(`PAT:${this.token}`).toString('base64')}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 745:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpClient = exports.isHttps = exports.HttpClientResponse = exports.HttpClientError = exports.getProxyUrl = exports.MediaTypes = exports.Headers = exports.HttpCodes = void 0;
const http = __importStar(__nccwpck_require__(685));
const https = __importStar(__nccwpck_require__(687));
const pm = __importStar(__nccwpck_require__(307));
const tunnel = __importStar(__nccwpck_require__(958));
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
var Headers;
(function (Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})(Headers = exports.Headers || (exports.Headers = {}));
var MediaTypes;
(function (MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */
function getProxyUrl(serverUrl) {
    const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : '';
}
exports.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
];
const HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
    }
}
exports.HttpClientError = HttpClientError;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                let output = Buffer.alloc(0);
                this.message.on('data', (chunk) => {
                    output = Buffer.concat([output, chunk]);
                });
                this.message.on('end', () => {
                    resolve(output.toString());
                });
            }));
        });
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    const parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
                this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) {
                this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
                this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
                this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
                this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
                this._maxRetries = requestOptions.maxRetries;
            }
        }
    }
    options(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
        });
    }
    get(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('GET', requestUrl, null, additionalHeaders || {});
        });
    }
    del(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('DELETE', requestUrl, null, additionalHeaders || {});
        });
    }
    post(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('POST', requestUrl, data, additionalHeaders || {});
        });
    }
    patch(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('PATCH', requestUrl, data, additionalHeaders || {});
        });
    }
    put(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('PUT', requestUrl, data, additionalHeaders || {});
        });
    }
    head(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('HEAD', requestUrl, null, additionalHeaders || {});
        });
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(verb, requestUrl, stream, additionalHeaders);
        });
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */
    getJson(requestUrl, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            const res = yield this.get(requestUrl, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    postJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.post(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    putJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.put(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    patchJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.patch(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    request(verb, requestUrl, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._disposed) {
                throw new Error('Client has already been disposed.');
            }
            const parsedUrl = new URL(requestUrl);
            let info = this._prepareRequest(verb, parsedUrl, headers);
            // Only perform retries on reads since writes may not be idempotent.
            const maxTries = this._allowRetries && RetryableHttpVerbs.includes(verb)
                ? this._maxRetries + 1
                : 1;
            let numTries = 0;
            let response;
            do {
                response = yield this.requestRaw(info, data);
                // Check if it's an authentication challenge
                if (response &&
                    response.message &&
                    response.message.statusCode === HttpCodes.Unauthorized) {
                    let authenticationHandler;
                    for (const handler of this.handlers) {
                        if (handler.canHandleAuthentication(response)) {
                            authenticationHandler = handler;
                            break;
                        }
                    }
                    if (authenticationHandler) {
                        return authenticationHandler.handleAuthentication(this, info, data);
                    }
                    else {
                        // We have received an unauthorized response but have no handlers to handle it.
                        // Let the response return to the caller.
                        return response;
                    }
                }
                let redirectsRemaining = this._maxRedirects;
                while (response.message.statusCode &&
                    HttpRedirectCodes.includes(response.message.statusCode) &&
                    this._allowRedirects &&
                    redirectsRemaining > 0) {
                    const redirectUrl = response.message.headers['location'];
                    if (!redirectUrl) {
                        // if there's no location to redirect to, we won't
                        break;
                    }
                    const parsedRedirectUrl = new URL(redirectUrl);
                    if (parsedUrl.protocol === 'https:' &&
                        parsedUrl.protocol !== parsedRedirectUrl.protocol &&
                        !this._allowRedirectDowngrade) {
                        throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
                    }
                    // we need to finish reading the response before reassigning response
                    // which will leak the open socket.
                    yield response.readBody();
                    // strip authorization header if redirected to a different hostname
                    if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                        for (const header in headers) {
                            // header names are case insensitive
                            if (header.toLowerCase() === 'authorization') {
                                delete headers[header];
                            }
                        }
                    }
                    // let's make the request with the new redirectUrl
                    info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                    response = yield this.requestRaw(info, data);
                    redirectsRemaining--;
                }
                if (!response.message.statusCode ||
                    !HttpResponseRetryCodes.includes(response.message.statusCode)) {
                    // If not a retry code, return immediately instead of retrying
                    return response;
                }
                numTries += 1;
                if (numTries < maxTries) {
                    yield response.readBody();
                    yield this._performExponentialBackoff(numTries);
                }
            } while (numTries < maxTries);
            return response;
        });
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                function callbackForResult(err, res) {
                    if (err) {
                        reject(err);
                    }
                    else if (!res) {
                        // If `err` is not passed, then `res` must be passed.
                        reject(new Error('Unknown error'));
                    }
                    else {
                        resolve(res);
                    }
                }
                this.requestRawWithCallback(info, data, callbackForResult);
            });
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        if (typeof data === 'string') {
            if (!info.options.headers) {
                info.options.headers = {};
            }
            info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        function handleResult(err, res) {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        }
        const req = info.httpModule.request(info.options, (msg) => {
            const res = new HttpClientResponse(msg);
            handleResult(undefined, res);
        });
        let socket;
        req.on('socket', sock => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error(`Request timeout: ${info.options.path}`));
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err);
        });
        if (data && typeof data === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof data !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */
    getAgent(serverUrl) {
        const parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port
            ? parseInt(info.parsedUrl.port)
            : defaultPort;
        info.options.path =
            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers) {
            for (const handler of this.handlers) {
                handler.prepareRequest(info.options);
            }
        }
        return info;
    }
    _mergeHeaders(headers) {
        if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers || {}));
        }
        return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
            clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
        let agent;
        const proxyUrl = pm.getProxyUrl(parsedUrl);
        const useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
            agent = this._agent;
        }
        // if agent is already assigned use that agent.
        if (agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        // This is `useProxy` again, but we need to check `proxyURl` directly for TypeScripts's flow analysis.
        if (proxyUrl && proxyUrl.hostname) {
            const agentOptions = {
                maxSockets,
                keepAlive: this._keepAlive,
                proxy: Object.assign(Object.assign({}, ((proxyUrl.username || proxyUrl.password) && {
                    proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                })), { host: proxyUrl.hostname, port: proxyUrl.port })
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, {
                rejectUnauthorized: false
            });
        }
        return agent;
    }
    _performExponentialBackoff(retryNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
            const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
            return new Promise(resolve => setTimeout(() => resolve(), ms));
        });
    }
    _processResponse(res, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const statusCode = res.message.statusCode || 0;
                const response = {
                    statusCode,
                    result: null,
                    headers: {}
                };
                // not found leads to null obj returned
                if (statusCode === HttpCodes.NotFound) {
                    resolve(response);
                }
                // get the result from the body
                function dateTimeDeserializer(key, value) {
                    if (typeof value === 'string') {
                        const a = new Date(value);
                        if (!isNaN(a.valueOf())) {
                            return a;
                        }
                    }
                    return value;
                }
                let obj;
                let contents;
                try {
                    contents = yield res.readBody();
                    if (contents && contents.length > 0) {
                        if (options && options.deserializeDates) {
                            obj = JSON.parse(contents, dateTimeDeserializer);
                        }
                        else {
                            obj = JSON.parse(contents);
                        }
                        response.result = obj;
                    }
                    response.headers = res.message.headers;
                }
                catch (err) {
                    // Invalid resource (contents not json);  leaving result obj null
                }
                // note that 3xx redirects are handled by the http layer.
                if (statusCode > 299) {
                    let msg;
                    // if exception/error in body, attempt to get better error
                    if (obj && obj.message) {
                        msg = obj.message;
                    }
                    else if (contents && contents.length > 0) {
                        // it may be the case that the exception is in the body message as string
                        msg = contents;
                    }
                    else {
                        msg = `Failed request: (${statusCode})`;
                    }
                    const err = new HttpClientError(msg, statusCode);
                    err.result = response.result;
                    reject(err);
                }
                else {
                    resolve(response);
                }
            }));
        });
    }
}
exports.HttpClient = HttpClient;
const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 307:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkBypass = exports.getProxyUrl = void 0;
function getProxyUrl(reqUrl) {
    const usingSsl = reqUrl.protocol === 'https:';
    if (checkBypass(reqUrl)) {
        return undefined;
    }
    const proxyVar = (() => {
        if (usingSsl) {
            return process.env['https_proxy'] || process.env['HTTPS_PROXY'];
        }
        else {
            return process.env['http_proxy'] || process.env['HTTP_PROXY'];
        }
    })();
    if (proxyVar) {
        return new URL(proxyVar);
    }
    else {
        return undefined;
    }
}
exports.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
        return false;
    }
    const noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
    if (!noProxy) {
        return false;
    }
    // Determine the request port
    let reqPort;
    if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
    }
    else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
    }
    else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
    }
    // Format the request hostname and hostname with port
    const upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    // Compare request host against noproxy
    for (const upperNoProxyItem of noProxy
        .split(',')
        .map(x => x.trim().toUpperCase())
        .filter(x => x)) {
        if (upperReqHosts.some(x => x === upperNoProxyItem)) {
            return true;
        }
    }
    return false;
}
exports.checkBypass = checkBypass;
//# sourceMappingURL=proxy.js.map

/***/ }),

/***/ 958:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(306);


/***/ }),

/***/ 306:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var net = __nccwpck_require__(808);
var tls = __nccwpck_require__(404);
var http = __nccwpck_require__(685);
var https = __nccwpck_require__(687);
var events = __nccwpck_require__(361);
var assert = __nccwpck_require__(491);
var util = __nccwpck_require__(837);


exports.httpOverHttp = httpOverHttp;
exports.httpsOverHttp = httpsOverHttp;
exports.httpOverHttps = httpOverHttps;
exports.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  }
} else {
  debug = function() {};
}
exports.debug = debug; // for test


/***/ }),

/***/ 491:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 361:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 685:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 687:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 808:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 37:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 17:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 404:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 837:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nccwpck_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__nccwpck_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "fs"
var external_fs_ = __nccwpck_require__(147);
// EXTERNAL MODULE: ./node_modules/@actions/core/lib/core.js
var core = __nccwpck_require__(24);
;// CONCATENATED MODULE: ./src/policies.ts

function get(action) {
    const files = external_fs_.readdirSync('.github/akita/policies/');
    const matchedPolicy = files.map(function (file) {
        let policy = JSON.parse(external_fs_.readFileSync(`policies/${file}`).toString());
        return policy;
    })
        .filter((policy) => {
        return policy.action === action;
    })[0];
    return matchedPolicy;
}

;// CONCATENATED MODULE: ./src/authorization.ts
function authorization_allowed(claims, policy) {
    const allowed = policy.permissions.map((permission) => {
        const fullPermission = Object.assign(Object.assign({}, claims), permission);
        return JSON.stringify(fullPermission) === JSON.stringify(claims);
    }).includes(true);
    return allowed;
}

;// CONCATENATED MODULE: external "buffer"
const external_buffer_namespaceObject = require("buffer");
;// CONCATENATED MODULE: external "crypto"
const external_crypto_namespaceObject = require("crypto");
;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/digest.js

const digest_digest = (algorithm, data) => createHash(algorithm).update(data).digest();
/* harmony default export */ const runtime_digest = ((/* unused pure expression or super */ null && (digest_digest)));

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/lib/buffer_utils.js

const buffer_utils_encoder = new TextEncoder();
const buffer_utils_decoder = new TextDecoder();
const MAX_INT32 = (/* unused pure expression or super */ null && (2 ** 32));
function buffer_utils_concat(...buffers) {
    const size = buffers.reduce((acc, { length }) => acc + length, 0);
    const buf = new Uint8Array(size);
    let i = 0;
    buffers.forEach((buffer) => {
        buf.set(buffer, i);
        i += buffer.length;
    });
    return buf;
}
function p2s(alg, p2sInput) {
    return buffer_utils_concat(buffer_utils_encoder.encode(alg), new Uint8Array([0]), p2sInput);
}
function writeUInt32BE(buf, value, offset) {
    if (value < 0 || value >= MAX_INT32) {
        throw new RangeError(`value must be >= 0 and <= ${MAX_INT32 - 1}. Received ${value}`);
    }
    buf.set([value >>> 24, value >>> 16, value >>> 8, value & 0xff], offset);
}
function buffer_utils_uint64be(value) {
    const high = Math.floor(value / MAX_INT32);
    const low = value % MAX_INT32;
    const buf = new Uint8Array(8);
    writeUInt32BE(buf, high, 0);
    writeUInt32BE(buf, low, 4);
    return buf;
}
function buffer_utils_uint32be(value) {
    const buf = new Uint8Array(4);
    writeUInt32BE(buf, value);
    return buf;
}
function buffer_utils_lengthAndInput(input) {
    return buffer_utils_concat(buffer_utils_uint32be(input.length), input);
}
async function buffer_utils_concatKdf(secret, bits, value) {
    const iterations = Math.ceil((bits >> 3) / 32);
    const res = new Uint8Array(iterations * 32);
    for (let iter = 0; iter < iterations; iter++) {
        const buf = new Uint8Array(4 + secret.length + value.length);
        buf.set(buffer_utils_uint32be(iter + 1));
        buf.set(secret, 4);
        buf.set(value, 4 + secret.length);
        res.set(await digest('sha256', buf), iter * 32);
    }
    return res.slice(0, bits >> 3);
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/base64url.js


let encode;
function normalize(input) {
    let encoded = input;
    if (encoded instanceof Uint8Array) {
        encoded = buffer_utils_decoder.decode(encoded);
    }
    return encoded;
}
if (external_buffer_namespaceObject.Buffer.isEncoding('base64url')) {
    encode = (input) => external_buffer_namespaceObject.Buffer.from(input).toString('base64url');
}
else {
    encode = (input) => external_buffer_namespaceObject.Buffer.from(input).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
const base64url_decodeBase64 = (input) => Buffer.from(input, 'base64');
const base64url_encodeBase64 = (input) => Buffer.from(input).toString('base64');

const decode = (input) => external_buffer_namespaceObject.Buffer.from(normalize(input), 'base64');

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/util/errors.js
class JOSEError extends Error {
    constructor(message) {
        var _a;
        super(message);
        this.code = 'ERR_JOSE_GENERIC';
        this.name = this.constructor.name;
        (_a = Error.captureStackTrace) === null || _a === void 0 ? void 0 : _a.call(Error, this, this.constructor);
    }
    static get code() {
        return 'ERR_JOSE_GENERIC';
    }
}
class errors_JWTClaimValidationFailed extends JOSEError {
    constructor(message, claim = 'unspecified', reason = 'unspecified') {
        super(message);
        this.code = 'ERR_JWT_CLAIM_VALIDATION_FAILED';
        this.claim = claim;
        this.reason = reason;
    }
    static get code() {
        return 'ERR_JWT_CLAIM_VALIDATION_FAILED';
    }
}
class JWTExpired extends JOSEError {
    constructor(message, claim = 'unspecified', reason = 'unspecified') {
        super(message);
        this.code = 'ERR_JWT_EXPIRED';
        this.claim = claim;
        this.reason = reason;
    }
    static get code() {
        return 'ERR_JWT_EXPIRED';
    }
}
class errors_JOSEAlgNotAllowed extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JOSE_ALG_NOT_ALLOWED';
    }
    static get code() {
        return 'ERR_JOSE_ALG_NOT_ALLOWED';
    }
}
class errors_JOSENotSupported extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JOSE_NOT_SUPPORTED';
    }
    static get code() {
        return 'ERR_JOSE_NOT_SUPPORTED';
    }
}
class errors_JWEDecryptionFailed extends (/* unused pure expression or super */ null && (JOSEError)) {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWE_DECRYPTION_FAILED';
        this.message = 'decryption operation failed';
    }
    static get code() {
        return 'ERR_JWE_DECRYPTION_FAILED';
    }
}
class errors_JWEInvalid extends (/* unused pure expression or super */ null && (JOSEError)) {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWE_INVALID';
    }
    static get code() {
        return 'ERR_JWE_INVALID';
    }
}
class errors_JWSInvalid extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWS_INVALID';
    }
    static get code() {
        return 'ERR_JWS_INVALID';
    }
}
class errors_JWTInvalid extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWT_INVALID';
    }
    static get code() {
        return 'ERR_JWT_INVALID';
    }
}
class errors_JWKInvalid extends (/* unused pure expression or super */ null && (JOSEError)) {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWK_INVALID';
    }
    static get code() {
        return 'ERR_JWK_INVALID';
    }
}
class JWKSInvalid extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWKS_INVALID';
    }
    static get code() {
        return 'ERR_JWKS_INVALID';
    }
}
class JWKSNoMatchingKey extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWKS_NO_MATCHING_KEY';
        this.message = 'no applicable key found in the JSON Web Key Set';
    }
    static get code() {
        return 'ERR_JWKS_NO_MATCHING_KEY';
    }
}
class JWKSMultipleMatchingKeys extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWKS_MULTIPLE_MATCHING_KEYS';
        this.message = 'multiple matching keys found in the JSON Web Key Set';
    }
    static get code() {
        return 'ERR_JWKS_MULTIPLE_MATCHING_KEYS';
    }
}
class JWKSTimeout extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWKS_TIMEOUT';
        this.message = 'request timed out';
    }
    static get code() {
        return 'ERR_JWKS_TIMEOUT';
    }
}
class errors_JWSSignatureVerificationFailed extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED';
        this.message = 'signature verification failed';
    }
    static get code() {
        return 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED';
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/random.js


;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/lib/iv.js


function iv_bitLength(alg) {
    switch (alg) {
        case 'A128GCM':
        case 'A128GCMKW':
        case 'A192GCM':
        case 'A192GCMKW':
        case 'A256GCM':
        case 'A256GCMKW':
            return 96;
        case 'A128CBC-HS256':
        case 'A192CBC-HS384':
        case 'A256CBC-HS512':
            return 128;
        default:
            throw new JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
    }
}
/* harmony default export */ const iv = ((alg) => random(new Uint8Array(iv_bitLength(alg) >> 3)));

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/lib/check_iv_length.js


const check_iv_length_checkIvLength = (enc, iv) => {
    if (iv.length << 3 !== bitLength(enc)) {
        throw new JWEInvalid('Invalid Initialization Vector length');
    }
};
/* harmony default export */ const check_iv_length = ((/* unused pure expression or super */ null && (check_iv_length_checkIvLength)));

// EXTERNAL MODULE: external "util"
var external_util_ = __nccwpck_require__(837);
;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/is_key_object.js


/* harmony default export */ const is_key_object = (external_util_.types.isKeyObject
    ? (obj) => external_util_.types.isKeyObject(obj)
    : (obj) => obj != null && obj instanceof external_crypto_namespaceObject.KeyObject);

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/check_cek_length.js


const check_cek_length_checkCekLength = (enc, cek) => {
    let expected;
    switch (enc) {
        case 'A128CBC-HS256':
        case 'A192CBC-HS384':
        case 'A256CBC-HS512':
            expected = parseInt(enc.slice(-3), 10);
            break;
        case 'A128GCM':
        case 'A192GCM':
        case 'A256GCM':
            expected = parseInt(enc.slice(1, 4), 10);
            break;
        default:
            throw new JOSENotSupported(`Content Encryption Algorithm ${enc} is not supported either by JOSE or your javascript runtime`);
    }
    if (cek instanceof Uint8Array) {
        if (cek.length << 3 !== expected) {
            throw new JWEInvalid('Invalid Content Encryption Key length');
        }
        return;
    }
    if (isKeyObject(cek) && cek.type === 'secret') {
        if (cek.symmetricKeySize << 3 !== expected) {
            throw new JWEInvalid('Invalid Content Encryption Key length');
        }
        return;
    }
    throw new TypeError('Invalid Content Encryption Key type');
};
/* harmony default export */ const check_cek_length = ((/* unused pure expression or super */ null && (check_cek_length_checkCekLength)));

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/timing_safe_equal.js

const timing_safe_equal_timingSafeEqual = (/* unused pure expression or super */ null && (impl));
/* harmony default export */ const timing_safe_equal = ((/* unused pure expression or super */ null && (timing_safe_equal_timingSafeEqual)));

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/cbc_tag.js


function cbc_tag_cbcTag(aad, iv, ciphertext, macSize, macKey, keySize) {
    const macData = concat(aad, iv, ciphertext, uint64be(aad.length << 3));
    const hmac = createHmac(`sha${macSize}`, macKey);
    hmac.update(macData);
    return hmac.digest().slice(0, keySize >> 3);
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/webcrypto.js


const webcrypto = external_crypto_namespaceObject.webcrypto;
/* harmony default export */ const runtime_webcrypto = ((/* unused pure expression or super */ null && (webcrypto)));
const webcrypto_isCryptoKey = external_util_.types.isCryptoKey
    ? (key) => external_util_.types.isCryptoKey(key)
    :
        (key) => false;

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/ciphers.js

let ciphers;
/* harmony default export */ const runtime_ciphers = ((algorithm) => {
    ciphers || (ciphers = new Set(getCiphers()));
    return ciphers.has(algorithm);
});

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/is_key_like.js


/* harmony default export */ const is_key_like = ((key) => is_key_object(key) || webcrypto_isCryptoKey(key));
const is_key_like_types = ['KeyObject'];
if (parseInt(process.versions.node) >= 16) {
    is_key_like_types.push('CryptoKey');
}


;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/decrypt.js













function cbcDecrypt(enc, cek, ciphertext, iv, tag, aad) {
    const keySize = parseInt(enc.slice(1, 4), 10);
    if (isKeyObject(cek)) {
        cek = cek.export();
    }
    const encKey = cek.subarray(keySize >> 3);
    const macKey = cek.subarray(0, keySize >> 3);
    const macSize = parseInt(enc.slice(-3), 10);
    const algorithm = `aes-${keySize}-cbc`;
    if (!supported(algorithm)) {
        throw new JOSENotSupported(`alg ${enc} is not supported by your javascript runtime`);
    }
    const expectedTag = cbcTag(aad, iv, ciphertext, macSize, macKey, keySize);
    let macCheckPassed;
    try {
        macCheckPassed = timingSafeEqual(tag, expectedTag);
    }
    catch {
    }
    if (!macCheckPassed) {
        throw new JWEDecryptionFailed();
    }
    let plaintext;
    try {
        const decipher = createDecipheriv(algorithm, encKey, iv);
        plaintext = concat(decipher.update(ciphertext), decipher.final());
    }
    catch {
    }
    if (!plaintext) {
        throw new JWEDecryptionFailed();
    }
    return plaintext;
}
function gcmDecrypt(enc, cek, ciphertext, iv, tag, aad) {
    const keySize = parseInt(enc.slice(1, 4), 10);
    const algorithm = `aes-${keySize}-gcm`;
    if (!supported(algorithm)) {
        throw new JOSENotSupported(`alg ${enc} is not supported by your javascript runtime`);
    }
    try {
        const decipher = createDecipheriv(algorithm, cek, iv, { authTagLength: 16 });
        decipher.setAuthTag(tag);
        if (aad.byteLength) {
            decipher.setAAD(aad, { plaintextLength: ciphertext.length });
        }
        const plaintext = decipher.update(ciphertext);
        decipher.final();
        return plaintext;
    }
    catch {
        throw new JWEDecryptionFailed();
    }
}
const decrypt_decrypt = (enc, cek, ciphertext, iv, tag, aad) => {
    let key;
    if (isCryptoKey(cek)) {
        checkEncCryptoKey(cek, enc, 'decrypt');
        key = KeyObject.from(cek);
    }
    else if (cek instanceof Uint8Array || isKeyObject(cek)) {
        key = cek;
    }
    else {
        throw new TypeError(invalidKeyInput(cek, ...types, 'Uint8Array'));
    }
    checkCekLength(enc, key);
    checkIvLength(enc, iv);
    switch (enc) {
        case 'A128CBC-HS256':
        case 'A192CBC-HS384':
        case 'A256CBC-HS512':
            return cbcDecrypt(enc, key, ciphertext, iv, tag, aad);
        case 'A128GCM':
        case 'A192GCM':
        case 'A256GCM':
            return gcmDecrypt(enc, key, ciphertext, iv, tag, aad);
        default:
            throw new JOSENotSupported('Unsupported JWE Content Encryption Algorithm');
    }
};
/* harmony default export */ const runtime_decrypt = ((/* unused pure expression or super */ null && (decrypt_decrypt)));

;// CONCATENATED MODULE: external "zlib"
const external_zlib_namespaceObject = require("zlib");
;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/zlib.js


const inflateRaw = (0,external_util_.promisify)(external_zlib_namespaceObject.inflateRaw);
const deflateRaw = (0,external_util_.promisify)(external_zlib_namespaceObject.deflateRaw);
const zlib_inflate = (input) => inflateRaw(input);
const zlib_deflate = (input) => deflateRaw(input);

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/aeskw.js










function checkKeySize(key, alg) {
    if (key.symmetricKeySize << 3 !== parseInt(alg.slice(1, 4), 10)) {
        throw new TypeError(`Invalid key size for alg: ${alg}`);
    }
}
function ensureKeyObject(key, alg, usage) {
    if (isKeyObject(key)) {
        return key;
    }
    if (key instanceof Uint8Array) {
        return createSecretKey(key);
    }
    if (isCryptoKey(key)) {
        checkEncCryptoKey(key, alg, usage);
        return KeyObject.from(key);
    }
    throw new TypeError(invalidKeyInput(key, ...types, 'Uint8Array'));
}
const aeskw_wrap = (alg, key, cek) => {
    const size = parseInt(alg.slice(1, 4), 10);
    const algorithm = `aes${size}-wrap`;
    if (!supported(algorithm)) {
        throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
    const keyObject = ensureKeyObject(key, alg, 'wrapKey');
    checkKeySize(keyObject, alg);
    const cipher = createCipheriv(algorithm, keyObject, Buffer.alloc(8, 0xa6));
    return concat(cipher.update(cek), cipher.final());
};
const aeskw_unwrap = (alg, key, encryptedKey) => {
    const size = parseInt(alg.slice(1, 4), 10);
    const algorithm = `aes${size}-wrap`;
    if (!supported(algorithm)) {
        throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
    const keyObject = ensureKeyObject(key, alg, 'unwrapKey');
    checkKeySize(keyObject, alg);
    const cipher = createDecipheriv(algorithm, keyObject, Buffer.alloc(8, 0xa6));
    return concat(cipher.update(encryptedKey), cipher.final());
};

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/lib/invalid_key_input.js
/* harmony default export */ const invalid_key_input = ((actual, ...types) => {
    let msg = 'Key must be ';
    if (types.length > 2) {
        const last = types.pop();
        msg += `one of type ${types.join(', ')}, or ${last}.`;
    }
    else if (types.length === 2) {
        msg += `one of type ${types[0]} or ${types[1]}.`;
    }
    else {
        msg += `of type ${types[0]}.`;
    }
    if (actual == null) {
        msg += ` Received ${actual}`;
    }
    else if (typeof actual === 'function' && actual.name) {
        msg += ` Received function ${actual.name}`;
    }
    else if (typeof actual === 'object' && actual != null) {
        if (actual.constructor && actual.constructor.name) {
            msg += ` Received an instance of ${actual.constructor.name}`;
        }
    }
    return msg;
});

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/get_named_curve.js







const p256 = external_buffer_namespaceObject.Buffer.from([42, 134, 72, 206, 61, 3, 1, 7]);
const p384 = external_buffer_namespaceObject.Buffer.from([43, 129, 4, 0, 34]);
const p521 = external_buffer_namespaceObject.Buffer.from([43, 129, 4, 0, 35]);
const secp256k1 = external_buffer_namespaceObject.Buffer.from([43, 129, 4, 0, 10]);
const weakMap = new WeakMap();
const namedCurveToJOSE = (namedCurve) => {
    switch (namedCurve) {
        case 'prime256v1':
            return 'P-256';
        case 'secp384r1':
            return 'P-384';
        case 'secp521r1':
            return 'P-521';
        case 'secp256k1':
            return 'secp256k1';
        default:
            throw new errors_JOSENotSupported('Unsupported key curve for this operation');
    }
};
const get_named_curve_getNamedCurve = (kee, raw) => {
    var _a;
    let key;
    if (webcrypto_isCryptoKey(kee)) {
        key = external_crypto_namespaceObject.KeyObject.from(kee);
    }
    else if (is_key_object(kee)) {
        key = kee;
    }
    else {
        throw new TypeError(invalid_key_input(kee, ...is_key_like_types));
    }
    if (key.type === 'secret') {
        throw new TypeError('only "private" or "public" type keys can be used for this operation');
    }
    switch (key.asymmetricKeyType) {
        case 'ed25519':
        case 'ed448':
            return `Ed${key.asymmetricKeyType.slice(2)}`;
        case 'x25519':
        case 'x448':
            return `X${key.asymmetricKeyType.slice(1)}`;
        case 'ec': {
            if (weakMap.has(key)) {
                return weakMap.get(key);
            }
            let namedCurve = (_a = key.asymmetricKeyDetails) === null || _a === void 0 ? void 0 : _a.namedCurve;
            if (!namedCurve && key.type === 'private') {
                namedCurve = get_named_curve_getNamedCurve((0,external_crypto_namespaceObject.createPublicKey)(key), true);
            }
            else if (!namedCurve) {
                const buf = key.export({ format: 'der', type: 'spki' });
                const i = buf[1] < 128 ? 14 : 15;
                const len = buf[i];
                const curveOid = buf.slice(i + 1, i + 1 + len);
                if (curveOid.equals(p256)) {
                    namedCurve = 'prime256v1';
                }
                else if (curveOid.equals(p384)) {
                    namedCurve = 'secp384r1';
                }
                else if (curveOid.equals(p521)) {
                    namedCurve = 'secp521r1';
                }
                else if (curveOid.equals(secp256k1)) {
                    namedCurve = 'secp256k1';
                }
                else {
                    throw new errors_JOSENotSupported('Unsupported key curve for this operation');
                }
            }
            if (raw)
                return namedCurve;
            const curve = namedCurveToJOSE(namedCurve);
            weakMap.set(key, curve);
            return curve;
        }
        default:
            throw new TypeError('Invalid asymmetric key type for this operation');
    }
};
function setCurve(keyObject, curve) {
    weakMap.set(keyObject, curve);
}
/* harmony default export */ const get_named_curve = (get_named_curve_getNamedCurve);

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/ecdhes.js










const generateKeyPair = (0,external_util_.promisify)(external_crypto_namespaceObject.generateKeyPair);
async function deriveKey(publicKee, privateKee, algorithm, keyLength, apu = new Uint8Array(0), apv = new Uint8Array(0)) {
    let publicKey;
    if (isCryptoKey(publicKee)) {
        checkEncCryptoKey(publicKee, 'ECDH');
        publicKey = KeyObject.from(publicKee);
    }
    else if (isKeyObject(publicKee)) {
        publicKey = publicKee;
    }
    else {
        throw new TypeError(invalidKeyInput(publicKee, ...types));
    }
    let privateKey;
    if (isCryptoKey(privateKee)) {
        checkEncCryptoKey(privateKee, 'ECDH', 'deriveBits');
        privateKey = KeyObject.from(privateKee);
    }
    else if (isKeyObject(privateKee)) {
        privateKey = privateKee;
    }
    else {
        throw new TypeError(invalidKeyInput(privateKee, ...types));
    }
    const value = concat(lengthAndInput(encoder.encode(algorithm)), lengthAndInput(apu), lengthAndInput(apv), uint32be(keyLength));
    const sharedSecret = diffieHellman({ privateKey, publicKey });
    return concatKdf(sharedSecret, keyLength, value);
}
async function generateEpk(kee) {
    let key;
    if (isCryptoKey(kee)) {
        key = KeyObject.from(kee);
    }
    else if (isKeyObject(kee)) {
        key = kee;
    }
    else {
        throw new TypeError(invalidKeyInput(kee, ...types));
    }
    switch (key.asymmetricKeyType) {
        case 'x25519':
            return generateKeyPair('x25519');
        case 'x448': {
            return generateKeyPair('x448');
        }
        case 'ec': {
            const namedCurve = getNamedCurve(key);
            return generateKeyPair('ec', { namedCurve });
        }
        default:
            throw new JOSENotSupported('Invalid or unsupported EPK');
    }
}
const ecdhAllowed = (key) => ['P-256', 'P-384', 'P-521', 'X25519', 'X448'].includes(getNamedCurve(key));

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/lib/check_p2s.js

function check_p2s_checkP2s(p2s) {
    if (!(p2s instanceof Uint8Array) || p2s.length < 8) {
        throw new JWEInvalid('PBES2 Salt Input must be 8 or more octets');
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/pbes2kw.js












const pbkdf2 = (0,external_util_.promisify)(external_crypto_namespaceObject.pbkdf2);
function getPassword(key, alg) {
    if (isKeyObject(key)) {
        return key.export();
    }
    if (key instanceof Uint8Array) {
        return key;
    }
    if (isCryptoKey(key)) {
        checkEncCryptoKey(key, alg, 'deriveBits', 'deriveKey');
        return KeyObject.from(key).export();
    }
    throw new TypeError(invalidKeyInput(key, ...types, 'Uint8Array'));
}
const pbes2kw_encrypt = async (alg, key, cek, p2c = 2048, p2s = random(new Uint8Array(16))) => {
    checkP2s(p2s);
    const salt = concatSalt(alg, p2s);
    const keylen = parseInt(alg.slice(13, 16), 10) >> 3;
    const password = getPassword(key, alg);
    const derivedKey = await pbkdf2(password, salt, p2c, keylen, `sha${alg.slice(8, 11)}`);
    const encryptedKey = await wrap(alg.slice(-6), derivedKey, cek);
    return { encryptedKey, p2c, p2s: base64url(p2s) };
};
const pbes2kw_decrypt = async (alg, key, encryptedKey, p2c, p2s) => {
    checkP2s(p2s);
    const salt = concatSalt(alg, p2s);
    const keylen = parseInt(alg.slice(13, 16), 10) >> 3;
    const password = getPassword(key, alg);
    const derivedKey = await pbkdf2(password, salt, p2c, keylen, `sha${alg.slice(8, 11)}`);
    return unwrap(alg.slice(-6), derivedKey, encryptedKey);
};

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/check_modulus_length.js
const check_modulus_length_weakMap = new WeakMap();
const getLength = (buf, index) => {
    let len = buf.readUInt8(1);
    if ((len & 0x80) === 0) {
        if (index === 0) {
            return len;
        }
        return getLength(buf.subarray(2 + len), index - 1);
    }
    const num = len & 0x7f;
    len = 0;
    for (let i = 0; i < num; i++) {
        len <<= 8;
        const j = buf.readUInt8(2 + i);
        len |= j;
    }
    if (index === 0) {
        return len;
    }
    return getLength(buf.subarray(2 + len), index - 1);
};
const getLengthOfSeqIndex = (sequence, index) => {
    const len = sequence.readUInt8(1);
    if ((len & 0x80) === 0) {
        return getLength(sequence.subarray(2), index);
    }
    const num = len & 0x7f;
    return getLength(sequence.subarray(2 + num), index);
};
const getModulusLength = (key) => {
    var _a, _b;
    if (check_modulus_length_weakMap.has(key)) {
        return check_modulus_length_weakMap.get(key);
    }
    const modulusLength = (_b = (_a = key.asymmetricKeyDetails) === null || _a === void 0 ? void 0 : _a.modulusLength) !== null && _b !== void 0 ? _b : (getLengthOfSeqIndex(key.export({ format: 'der', type: 'pkcs1' }), key.type === 'private' ? 1 : 0) -
        1) <<
        3;
    check_modulus_length_weakMap.set(key, modulusLength);
    return modulusLength;
};
const check_modulus_length_setModulusLength = (keyObject, modulusLength) => {
    check_modulus_length_weakMap.set(keyObject, modulusLength);
};
/* harmony default export */ const check_modulus_length = ((key, alg) => {
    if (getModulusLength(key) < 2048) {
        throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
    }
});

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/rsaes.js







const checkKey = (key, alg) => {
    if (key.asymmetricKeyType !== 'rsa') {
        throw new TypeError('Invalid key for this operation, its asymmetricKeyType must be rsa');
    }
    checkModulusLength(key, alg);
};
const resolvePadding = (alg) => {
    switch (alg) {
        case 'RSA-OAEP':
        case 'RSA-OAEP-256':
        case 'RSA-OAEP-384':
        case 'RSA-OAEP-512':
            return constants.RSA_PKCS1_OAEP_PADDING;
        case 'RSA1_5':
            return constants.RSA_PKCS1_PADDING;
        default:
            return undefined;
    }
};
const resolveOaepHash = (alg) => {
    switch (alg) {
        case 'RSA-OAEP':
            return 'sha1';
        case 'RSA-OAEP-256':
            return 'sha256';
        case 'RSA-OAEP-384':
            return 'sha384';
        case 'RSA-OAEP-512':
            return 'sha512';
        default:
            return undefined;
    }
};
function rsaes_ensureKeyObject(key, alg, ...usages) {
    if (isKeyObject(key)) {
        return key;
    }
    if (isCryptoKey(key)) {
        checkEncCryptoKey(key, alg, ...usages);
        return KeyObject.from(key);
    }
    throw new TypeError(invalidKeyInput(key, ...types));
}
const rsaes_encrypt = (alg, key, cek) => {
    const padding = resolvePadding(alg);
    const oaepHash = resolveOaepHash(alg);
    const keyObject = rsaes_ensureKeyObject(key, alg, 'wrapKey', 'encrypt');
    checkKey(keyObject, alg);
    return publicEncrypt({ key: keyObject, oaepHash, padding }, cek);
};
const rsaes_decrypt = (alg, key, encryptedKey) => {
    const padding = resolvePadding(alg);
    const oaepHash = resolveOaepHash(alg);
    const keyObject = rsaes_ensureKeyObject(key, alg, 'unwrapKey', 'decrypt');
    checkKey(keyObject, alg);
    return privateDecrypt({ key: keyObject, oaepHash, padding }, encryptedKey);
};

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/lib/cek.js


function cek_bitLength(alg) {
    switch (alg) {
        case 'A128GCM':
            return 128;
        case 'A192GCM':
            return 192;
        case 'A256GCM':
        case 'A128CBC-HS256':
            return 256;
        case 'A192CBC-HS384':
            return 384;
        case 'A256CBC-HS512':
            return 512;
        default:
            throw new JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
    }
}
/* harmony default export */ const cek = ((alg) => random(new Uint8Array(cek_bitLength(alg) >> 3)));

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/asn1.js






const genericExport = (keyType, keyFormat, key) => {
    let keyObject;
    if (isCryptoKey(key)) {
        if (!key.extractable) {
            throw new TypeError('CryptoKey is not extractable');
        }
        keyObject = KeyObject.from(key);
    }
    else if (isKeyObject(key)) {
        keyObject = key;
    }
    else {
        throw new TypeError(invalidKeyInput(key, ...types));
    }
    if (keyObject.type !== keyType) {
        throw new TypeError(`key is not a ${keyType} key`);
    }
    return keyObject.export({ format: 'pem', type: keyFormat });
};
const toSPKI = (key) => {
    return genericExport('public', 'spki', key);
};
const toPKCS8 = (key) => {
    return genericExport('private', 'pkcs8', key);
};
const fromPKCS8 = (pem) => createPrivateKey({
    key: Buffer.from(pem.replace(/(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g, ''), 'base64'),
    type: 'pkcs8',
    format: 'der',
});
const fromSPKI = (pem) => createPublicKey({
    key: Buffer.from(pem.replace(/(?:-----(?:BEGIN|END) PUBLIC KEY-----|\s)/g, ''), 'base64'),
    type: 'spki',
    format: 'der',
});

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/asn1_sequence_encoder.js


const tagInteger = 0x02;
const tagBitStr = 0x03;
const tagOctStr = 0x04;
const tagSequence = 0x30;
const bZero = external_buffer_namespaceObject.Buffer.from([0x00]);
const bTagInteger = external_buffer_namespaceObject.Buffer.from([tagInteger]);
const bTagBitStr = external_buffer_namespaceObject.Buffer.from([tagBitStr]);
const bTagSequence = external_buffer_namespaceObject.Buffer.from([tagSequence]);
const bTagOctStr = external_buffer_namespaceObject.Buffer.from([tagOctStr]);
const encodeLength = (len) => {
    if (len < 128)
        return external_buffer_namespaceObject.Buffer.from([len]);
    const buffer = external_buffer_namespaceObject.Buffer.alloc(5);
    buffer.writeUInt32BE(len, 1);
    let offset = 1;
    while (buffer[offset] === 0)
        offset++;
    buffer[offset - 1] = 0x80 | (5 - offset);
    return buffer.slice(offset - 1);
};
const oids = new Map([
    ['P-256', external_buffer_namespaceObject.Buffer.from('06 08 2A 86 48 CE 3D 03 01 07'.replace(/ /g, ''), 'hex')],
    ['secp256k1', external_buffer_namespaceObject.Buffer.from('06 05 2B 81 04 00 0A'.replace(/ /g, ''), 'hex')],
    ['P-384', external_buffer_namespaceObject.Buffer.from('06 05 2B 81 04 00 22'.replace(/ /g, ''), 'hex')],
    ['P-521', external_buffer_namespaceObject.Buffer.from('06 05 2B 81 04 00 23'.replace(/ /g, ''), 'hex')],
    ['ecPublicKey', external_buffer_namespaceObject.Buffer.from('06 07 2A 86 48 CE 3D 02 01'.replace(/ /g, ''), 'hex')],
    ['X25519', external_buffer_namespaceObject.Buffer.from('06 03 2B 65 6E'.replace(/ /g, ''), 'hex')],
    ['X448', external_buffer_namespaceObject.Buffer.from('06 03 2B 65 6F'.replace(/ /g, ''), 'hex')],
    ['Ed25519', external_buffer_namespaceObject.Buffer.from('06 03 2B 65 70'.replace(/ /g, ''), 'hex')],
    ['Ed448', external_buffer_namespaceObject.Buffer.from('06 03 2B 65 71'.replace(/ /g, ''), 'hex')],
]);
class DumbAsn1Encoder {
    constructor() {
        this.length = 0;
        this.elements = [];
    }
    oidFor(oid) {
        const bOid = oids.get(oid);
        if (!bOid) {
            throw new errors_JOSENotSupported('Invalid or unsupported OID');
        }
        this.elements.push(bOid);
        this.length += bOid.length;
    }
    zero() {
        this.elements.push(bTagInteger, external_buffer_namespaceObject.Buffer.from([0x01]), bZero);
        this.length += 3;
    }
    one() {
        this.elements.push(bTagInteger, external_buffer_namespaceObject.Buffer.from([0x01]), external_buffer_namespaceObject.Buffer.from([0x01]));
        this.length += 3;
    }
    unsignedInteger(integer) {
        if (integer[0] & 0x80) {
            const len = encodeLength(integer.length + 1);
            this.elements.push(bTagInteger, len, bZero, integer);
            this.length += 2 + len.length + integer.length;
        }
        else {
            let i = 0;
            while (integer[i] === 0 && (integer[i + 1] & 0x80) === 0)
                i++;
            const len = encodeLength(integer.length - i);
            this.elements.push(bTagInteger, encodeLength(integer.length - i), integer.slice(i));
            this.length += 1 + len.length + integer.length - i;
        }
    }
    octStr(octStr) {
        const len = encodeLength(octStr.length);
        this.elements.push(bTagOctStr, encodeLength(octStr.length), octStr);
        this.length += 1 + len.length + octStr.length;
    }
    bitStr(bitS) {
        const len = encodeLength(bitS.length + 1);
        this.elements.push(bTagBitStr, encodeLength(bitS.length + 1), bZero, bitS);
        this.length += 1 + len.length + bitS.length + 1;
    }
    add(seq) {
        this.elements.push(seq);
        this.length += seq.length;
    }
    end(tag = bTagSequence) {
        const len = encodeLength(this.length);
        return external_buffer_namespaceObject.Buffer.concat([tag, len, ...this.elements], 1 + len.length + this.length);
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/jwk_to_key.js







const [major, minor] = process.version
    .slice(1)
    .split('.')
    .map((str) => parseInt(str, 10));
const jwkImportSupported = major >= 16 || (major === 15 && minor >= 12);
const parse = (jwk) => {
    if (jwkImportSupported && jwk.kty !== 'oct') {
        return jwk.d
            ? (0,external_crypto_namespaceObject.createPrivateKey)({ format: 'jwk', key: jwk })
            : (0,external_crypto_namespaceObject.createPublicKey)({ format: 'jwk', key: jwk });
    }
    switch (jwk.kty) {
        case 'oct': {
            return (0,external_crypto_namespaceObject.createSecretKey)(decode(jwk.k));
        }
        case 'RSA': {
            const enc = new DumbAsn1Encoder();
            const isPrivate = jwk.d !== undefined;
            const modulus = external_buffer_namespaceObject.Buffer.from(jwk.n, 'base64');
            const exponent = external_buffer_namespaceObject.Buffer.from(jwk.e, 'base64');
            if (isPrivate) {
                enc.zero();
                enc.unsignedInteger(modulus);
                enc.unsignedInteger(exponent);
                enc.unsignedInteger(external_buffer_namespaceObject.Buffer.from(jwk.d, 'base64'));
                enc.unsignedInteger(external_buffer_namespaceObject.Buffer.from(jwk.p, 'base64'));
                enc.unsignedInteger(external_buffer_namespaceObject.Buffer.from(jwk.q, 'base64'));
                enc.unsignedInteger(external_buffer_namespaceObject.Buffer.from(jwk.dp, 'base64'));
                enc.unsignedInteger(external_buffer_namespaceObject.Buffer.from(jwk.dq, 'base64'));
                enc.unsignedInteger(external_buffer_namespaceObject.Buffer.from(jwk.qi, 'base64'));
            }
            else {
                enc.unsignedInteger(modulus);
                enc.unsignedInteger(exponent);
            }
            const der = enc.end();
            const createInput = {
                key: der,
                format: 'der',
                type: 'pkcs1',
            };
            const keyObject = isPrivate ? (0,external_crypto_namespaceObject.createPrivateKey)(createInput) : (0,external_crypto_namespaceObject.createPublicKey)(createInput);
            check_modulus_length_setModulusLength(keyObject, modulus.length << 3);
            return keyObject;
        }
        case 'EC': {
            const enc = new DumbAsn1Encoder();
            const isPrivate = jwk.d !== undefined;
            const pub = external_buffer_namespaceObject.Buffer.concat([
                external_buffer_namespaceObject.Buffer.alloc(1, 4),
                external_buffer_namespaceObject.Buffer.from(jwk.x, 'base64'),
                external_buffer_namespaceObject.Buffer.from(jwk.y, 'base64'),
            ]);
            if (isPrivate) {
                enc.zero();
                const enc$1 = new DumbAsn1Encoder();
                enc$1.oidFor('ecPublicKey');
                enc$1.oidFor(jwk.crv);
                enc.add(enc$1.end());
                const enc$2 = new DumbAsn1Encoder();
                enc$2.one();
                enc$2.octStr(external_buffer_namespaceObject.Buffer.from(jwk.d, 'base64'));
                const enc$3 = new DumbAsn1Encoder();
                enc$3.bitStr(pub);
                const f2 = enc$3.end(external_buffer_namespaceObject.Buffer.from([0xa1]));
                enc$2.add(f2);
                const f = enc$2.end();
                const enc$4 = new DumbAsn1Encoder();
                enc$4.add(f);
                const f3 = enc$4.end(external_buffer_namespaceObject.Buffer.from([0x04]));
                enc.add(f3);
                const der = enc.end();
                const keyObject = (0,external_crypto_namespaceObject.createPrivateKey)({ key: der, format: 'der', type: 'pkcs8' });
                setCurve(keyObject, jwk.crv);
                return keyObject;
            }
            const enc$1 = new DumbAsn1Encoder();
            enc$1.oidFor('ecPublicKey');
            enc$1.oidFor(jwk.crv);
            enc.add(enc$1.end());
            enc.bitStr(pub);
            const der = enc.end();
            const keyObject = (0,external_crypto_namespaceObject.createPublicKey)({ key: der, format: 'der', type: 'spki' });
            setCurve(keyObject, jwk.crv);
            return keyObject;
        }
        case 'OKP': {
            const enc = new DumbAsn1Encoder();
            const isPrivate = jwk.d !== undefined;
            if (isPrivate) {
                enc.zero();
                const enc$1 = new DumbAsn1Encoder();
                enc$1.oidFor(jwk.crv);
                enc.add(enc$1.end());
                const enc$2 = new DumbAsn1Encoder();
                enc$2.octStr(external_buffer_namespaceObject.Buffer.from(jwk.d, 'base64'));
                const f = enc$2.end(external_buffer_namespaceObject.Buffer.from([0x04]));
                enc.add(f);
                const der = enc.end();
                return (0,external_crypto_namespaceObject.createPrivateKey)({ key: der, format: 'der', type: 'pkcs8' });
            }
            const enc$1 = new DumbAsn1Encoder();
            enc$1.oidFor(jwk.crv);
            enc.add(enc$1.end());
            enc.bitStr(external_buffer_namespaceObject.Buffer.from(jwk.x, 'base64'));
            const der = enc.end();
            return (0,external_crypto_namespaceObject.createPublicKey)({ key: der, format: 'der', type: 'spki' });
        }
        default:
            throw new errors_JOSENotSupported('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
    }
};
/* harmony default export */ const jwk_to_key = (parse);

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/lib/is_object.js
function isObjectLike(value) {
    return typeof value === 'object' && value !== null;
}
function is_object_isObject(input) {
    if (!isObjectLike(input) || Object.prototype.toString.call(input) !== '[object Object]') {
        return false;
    }
    if (Object.getPrototypeOf(input) === null) {
        return true;
    }
    let proto = input;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(input) === proto;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/key/import.js







function getElement(seq) {
    let result = [];
    let next = 0;
    while (next < seq.length) {
        let nextPart = parseElement(seq.subarray(next));
        result.push(nextPart);
        next += nextPart.byteLength;
    }
    return result;
}
function parseElement(bytes) {
    let position = 0;
    let tag = bytes[0] & 0x1f;
    position++;
    if (tag === 0x1f) {
        tag = 0;
        while (bytes[position] >= 0x80) {
            tag = tag * 128 + bytes[position] - 0x80;
            position++;
        }
        tag = tag * 128 + bytes[position] - 0x80;
        position++;
    }
    let length = 0;
    if (bytes[position] < 0x80) {
        length = bytes[position];
        position++;
    }
    else {
        let numberOfDigits = bytes[position] & 0x7f;
        position++;
        length = 0;
        for (let i = 0; i < numberOfDigits; i++) {
            length = length * 256 + bytes[position];
            position++;
        }
    }
    if (length === 0x80) {
        length = 0;
        while (bytes[position + length] !== 0 || bytes[position + length + 1] !== 0) {
            length++;
        }
        const byteLength = position + length + 2;
        return {
            byteLength,
            contents: bytes.subarray(position, position + length),
            raw: bytes.subarray(0, byteLength),
        };
    }
    const byteLength = position + length;
    return {
        byteLength,
        contents: bytes.subarray(position, byteLength),
        raw: bytes.subarray(0, byteLength),
    };
}
function spkiFromX509(buf) {
    const tbsCertificate = getElement(getElement(parseElement(buf).contents)[0].contents);
    return encodeBase64(tbsCertificate[tbsCertificate[0].raw[0] === 0xa0 ? 6 : 5].raw);
}
function getSPKI(x509) {
    const pem = x509.replace(/(?:-----(?:BEGIN|END) CERTIFICATE-----|\s)/g, '');
    const raw = decodeBase64(pem);
    return formatPEM(spkiFromX509(raw), 'PUBLIC KEY');
}
async function importSPKI(spki, alg, options) {
    if (typeof spki !== 'string' || spki.indexOf('-----BEGIN PUBLIC KEY-----') !== 0) {
        throw new TypeError('"spki" must be SPKI formatted string');
    }
    return importPublic(spki, alg, options);
}
async function importX509(x509, alg, options) {
    if (typeof x509 !== 'string' || x509.indexOf('-----BEGIN CERTIFICATE-----') !== 0) {
        throw new TypeError('"x509" must be X.509 formatted string');
    }
    const spki = getSPKI(x509);
    return importPublic(spki, alg, options);
}
async function importPKCS8(pkcs8, alg, options) {
    if (typeof pkcs8 !== 'string' || pkcs8.indexOf('-----BEGIN PRIVATE KEY-----') !== 0) {
        throw new TypeError('"pkcs8" must be PCKS8 formatted string');
    }
    return importPrivate(pkcs8, alg, options);
}
async function import_importJWK(jwk, alg, octAsKeyObject) {
    if (!is_object_isObject(jwk)) {
        throw new TypeError('JWK must be an object');
    }
    alg || (alg = jwk.alg);
    if (typeof alg !== 'string' || !alg) {
        throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
    }
    switch (jwk.kty) {
        case 'oct':
            if (typeof jwk.k !== 'string' || !jwk.k) {
                throw new TypeError('missing "k" (Key Value) Parameter value');
            }
            octAsKeyObject !== null && octAsKeyObject !== void 0 ? octAsKeyObject : (octAsKeyObject = jwk.ext !== true);
            if (octAsKeyObject) {
                return jwk_to_key({ ...jwk, alg, ext: false });
            }
            return decode(jwk.k);
        case 'RSA':
            if (jwk.oth !== undefined) {
                throw new errors_JOSENotSupported('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
            }
        case 'EC':
        case 'OKP':
            return jwk_to_key({ ...jwk, alg });
        default:
            throw new errors_JOSENotSupported('Unsupported "kty" (Key Type) Parameter value');
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/lib/check_key_type.js


const symmetricTypeCheck = (key) => {
    if (key instanceof Uint8Array)
        return;
    if (!is_key_like(key)) {
        throw new TypeError(invalid_key_input(key, ...is_key_like_types, 'Uint8Array'));
    }
    if (key.type !== 'secret') {
        throw new TypeError(`${is_key_like_types.join(' or ')} instances for symmetric algorithms must be of type "secret"`);
    }
};
const asymmetricTypeCheck = (key, usage) => {
    if (!is_key_like(key)) {
        throw new TypeError(invalid_key_input(key, ...is_key_like_types));
    }
    if (key.type === 'secret') {
        throw new TypeError(`${is_key_like_types.join(' or ')} instances for asymmetric algorithms must not be of type "secret"`);
    }
    if (usage === 'sign' && key.type === 'public') {
        throw new TypeError(`${is_key_like_types.join(' or ')} instances for asymmetric algorithm signing must be of type "private"`);
    }
    if (usage === 'decrypt' && key.type === 'public') {
        throw new TypeError(`${is_key_like_types.join(' or ')} instances for asymmetric algorithm decryption must be of type "private"`);
    }
    if (key.algorithm && usage === 'verify' && key.type === 'private') {
        throw new TypeError(`${is_key_like_types.join(' or ')} instances for asymmetric algorithm verifying must be of type "public"`);
    }
    if (key.algorithm && usage === 'encrypt' && key.type === 'private') {
        throw new TypeError(`${is_key_like_types.join(' or ')} instances for asymmetric algorithm encryption must be of type "public"`);
    }
};
const check_key_type_checkKeyType = (alg, key, usage) => {
    const symmetric = alg.startsWith('HS') ||
        alg === 'dir' ||
        alg.startsWith('PBES2') ||
        /^A\d{3}(?:GCM)?KW$/.test(alg);
    if (symmetric) {
        symmetricTypeCheck(key);
    }
    else {
        asymmetricTypeCheck(key, usage);
    }
};
/* harmony default export */ const check_key_type = (check_key_type_checkKeyType);

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/encrypt.js












function cbcEncrypt(enc, plaintext, cek, iv, aad) {
    const keySize = parseInt(enc.slice(1, 4), 10);
    if (isKeyObject(cek)) {
        cek = cek.export();
    }
    const encKey = cek.subarray(keySize >> 3);
    const macKey = cek.subarray(0, keySize >> 3);
    const algorithm = `aes-${keySize}-cbc`;
    if (!supported(algorithm)) {
        throw new JOSENotSupported(`alg ${enc} is not supported by your javascript runtime`);
    }
    const cipher = createCipheriv(algorithm, encKey, iv);
    const ciphertext = concat(cipher.update(plaintext), cipher.final());
    const macSize = parseInt(enc.slice(-3), 10);
    const tag = cbcTag(aad, iv, ciphertext, macSize, macKey, keySize);
    return { ciphertext, tag };
}
function gcmEncrypt(enc, plaintext, cek, iv, aad) {
    const keySize = parseInt(enc.slice(1, 4), 10);
    const algorithm = `aes-${keySize}-gcm`;
    if (!supported(algorithm)) {
        throw new JOSENotSupported(`alg ${enc} is not supported by your javascript runtime`);
    }
    const cipher = createCipheriv(algorithm, cek, iv, { authTagLength: 16 });
    if (aad.byteLength) {
        cipher.setAAD(aad, { plaintextLength: plaintext.length });
    }
    const ciphertext = cipher.update(plaintext);
    cipher.final();
    const tag = cipher.getAuthTag();
    return { ciphertext, tag };
}
const encrypt_encrypt = (enc, plaintext, cek, iv, aad) => {
    let key;
    if (isCryptoKey(cek)) {
        checkEncCryptoKey(cek, enc, 'encrypt');
        key = KeyObject.from(cek);
    }
    else if (cek instanceof Uint8Array || isKeyObject(cek)) {
        key = cek;
    }
    else {
        throw new TypeError(invalidKeyInput(cek, ...types, 'Uint8Array'));
    }
    checkCekLength(enc, key);
    checkIvLength(enc, iv);
    switch (enc) {
        case 'A128CBC-HS256':
        case 'A192CBC-HS384':
        case 'A256CBC-HS512':
            return cbcEncrypt(enc, plaintext, key, iv, aad);
        case 'A128GCM':
        case 'A192GCM':
        case 'A256GCM':
            return gcmEncrypt(enc, plaintext, key, iv, aad);
        default:
            throw new JOSENotSupported('Unsupported JWE Content Encryption Algorithm');
    }
};
/* harmony default export */ const runtime_encrypt = ((/* unused pure expression or super */ null && (encrypt_encrypt)));

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/lib/aesgcmkw.js




async function aesgcmkw_wrap(alg, key, cek, iv) {
    const jweAlgorithm = alg.slice(0, 7);
    iv || (iv = generateIv(jweAlgorithm));
    const { ciphertext: encryptedKey, tag } = await encrypt(jweAlgorithm, cek, key, iv, new Uint8Array(0));
    return { encryptedKey, iv: base64url(iv), tag: base64url(tag) };
}
async function aesgcmkw_unwrap(alg, key, encryptedKey, iv, tag) {
    const jweAlgorithm = alg.slice(0, 7);
    return decrypt(jweAlgorithm, key, encryptedKey, iv, tag, new Uint8Array(0));
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/lib/decrypt_key_management.js











async function decrypt_key_management_decryptKeyManagement(alg, key, encryptedKey, joseHeader) {
    checkKeyType(alg, key, 'decrypt');
    switch (alg) {
        case 'dir': {
            if (encryptedKey !== undefined)
                throw new JWEInvalid('Encountered unexpected JWE Encrypted Key');
            return key;
        }
        case 'ECDH-ES':
            if (encryptedKey !== undefined)
                throw new JWEInvalid('Encountered unexpected JWE Encrypted Key');
        case 'ECDH-ES+A128KW':
        case 'ECDH-ES+A192KW':
        case 'ECDH-ES+A256KW': {
            if (!isObject(joseHeader.epk))
                throw new JWEInvalid(`JOSE Header "epk" (Ephemeral Public Key) missing or invalid`);
            if (!ECDH.ecdhAllowed(key))
                throw new JOSENotSupported('ECDH with the provided key is not allowed or not supported by your javascript runtime');
            const epk = await importJWK(joseHeader.epk, alg);
            let partyUInfo;
            let partyVInfo;
            if (joseHeader.apu !== undefined) {
                if (typeof joseHeader.apu !== 'string')
                    throw new JWEInvalid(`JOSE Header "apu" (Agreement PartyUInfo) invalid`);
                partyUInfo = base64url(joseHeader.apu);
            }
            if (joseHeader.apv !== undefined) {
                if (typeof joseHeader.apv !== 'string')
                    throw new JWEInvalid(`JOSE Header "apv" (Agreement PartyVInfo) invalid`);
                partyVInfo = base64url(joseHeader.apv);
            }
            const sharedSecret = await ECDH.deriveKey(epk, key, alg === 'ECDH-ES' ? joseHeader.enc : alg, alg === 'ECDH-ES' ? cekLength(joseHeader.enc) : parseInt(alg.slice(-5, -2), 10), partyUInfo, partyVInfo);
            if (alg === 'ECDH-ES')
                return sharedSecret;
            if (encryptedKey === undefined)
                throw new JWEInvalid('JWE Encrypted Key missing');
            return aesKw(alg.slice(-6), sharedSecret, encryptedKey);
        }
        case 'RSA1_5':
        case 'RSA-OAEP':
        case 'RSA-OAEP-256':
        case 'RSA-OAEP-384':
        case 'RSA-OAEP-512': {
            if (encryptedKey === undefined)
                throw new JWEInvalid('JWE Encrypted Key missing');
            return rsaEs(alg, key, encryptedKey);
        }
        case 'PBES2-HS256+A128KW':
        case 'PBES2-HS384+A192KW':
        case 'PBES2-HS512+A256KW': {
            if (encryptedKey === undefined)
                throw new JWEInvalid('JWE Encrypted Key missing');
            if (typeof joseHeader.p2c !== 'number')
                throw new JWEInvalid(`JOSE Header "p2c" (PBES2 Count) missing or invalid`);
            if (typeof joseHeader.p2s !== 'string')
                throw new JWEInvalid(`JOSE Header "p2s" (PBES2 Salt) missing or invalid`);
            return pbes2Kw(alg, key, encryptedKey, joseHeader.p2c, base64url(joseHeader.p2s));
        }
        case 'A128KW':
        case 'A192KW':
        case 'A256KW': {
            if (encryptedKey === undefined)
                throw new JWEInvalid('JWE Encrypted Key missing');
            return aesKw(alg, key, encryptedKey);
        }
        case 'A128GCMKW':
        case 'A192GCMKW':
        case 'A256GCMKW': {
            if (encryptedKey === undefined)
                throw new JWEInvalid('JWE Encrypted Key missing');
            if (typeof joseHeader.iv !== 'string')
                throw new JWEInvalid(`JOSE Header "iv" (Initialization Vector) missing or invalid`);
            if (typeof joseHeader.tag !== 'string')
                throw new JWEInvalid(`JOSE Header "tag" (Authentication Tag) missing or invalid`);
            const iv = base64url(joseHeader.iv);
            const tag = base64url(joseHeader.tag);
            return aesGcmKw(alg, key, encryptedKey, iv, tag);
        }
        default: {
            throw new JOSENotSupported('Invalid or unsupported "alg" (JWE Algorithm) header value');
        }
    }
}
/* harmony default export */ const decrypt_key_management = ((/* unused pure expression or super */ null && (decrypt_key_management_decryptKeyManagement)));

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/lib/validate_crit.js

function validate_crit_validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
    if (joseHeader.crit !== undefined && protectedHeader.crit === undefined) {
        throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
    }
    if (!protectedHeader || protectedHeader.crit === undefined) {
        return new Set();
    }
    if (!Array.isArray(protectedHeader.crit) ||
        protectedHeader.crit.length === 0 ||
        protectedHeader.crit.some((input) => typeof input !== 'string' || input.length === 0)) {
        throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
    }
    let recognized;
    if (recognizedOption !== undefined) {
        recognized = new Map([...Object.entries(recognizedOption), ...recognizedDefault.entries()]);
    }
    else {
        recognized = recognizedDefault;
    }
    for (const parameter of protectedHeader.crit) {
        if (!recognized.has(parameter)) {
            throw new errors_JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
        }
        if (joseHeader[parameter] === undefined) {
            throw new Err(`Extension Header Parameter "${parameter}" is missing`);
        }
        else if (recognized.get(parameter) && protectedHeader[parameter] === undefined) {
            throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
        }
    }
    return new Set(protectedHeader.crit);
}
/* harmony default export */ const validate_crit = (validate_crit_validateCrit);

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/jwe/flattened/decrypt.js











async function decrypt_flattenedDecrypt(jwe, key, options) {
    var _a;
    if (!isObject(jwe)) {
        throw new JWEInvalid('Flattened JWE must be an object');
    }
    if (jwe.protected === undefined && jwe.header === undefined && jwe.unprotected === undefined) {
        throw new JWEInvalid('JOSE Header missing');
    }
    if (typeof jwe.iv !== 'string') {
        throw new JWEInvalid('JWE Initialization Vector missing or incorrect type');
    }
    if (typeof jwe.ciphertext !== 'string') {
        throw new JWEInvalid('JWE Ciphertext missing or incorrect type');
    }
    if (typeof jwe.tag !== 'string') {
        throw new JWEInvalid('JWE Authentication Tag missing or incorrect type');
    }
    if (jwe.protected !== undefined && typeof jwe.protected !== 'string') {
        throw new JWEInvalid('JWE Protected Header incorrect type');
    }
    if (jwe.encrypted_key !== undefined && typeof jwe.encrypted_key !== 'string') {
        throw new JWEInvalid('JWE Encrypted Key incorrect type');
    }
    if (jwe.aad !== undefined && typeof jwe.aad !== 'string') {
        throw new JWEInvalid('JWE AAD incorrect type');
    }
    if (jwe.header !== undefined && !isObject(jwe.header)) {
        throw new JWEInvalid('JWE Shared Unprotected Header incorrect type');
    }
    if (jwe.unprotected !== undefined && !isObject(jwe.unprotected)) {
        throw new JWEInvalid('JWE Per-Recipient Unprotected Header incorrect type');
    }
    let parsedProt;
    if (jwe.protected) {
        const protectedHeader = base64url(jwe.protected);
        try {
            parsedProt = JSON.parse(decoder.decode(protectedHeader));
        }
        catch {
            throw new JWEInvalid('JWE Protected Header is invalid');
        }
    }
    if (!isDisjoint(parsedProt, jwe.header, jwe.unprotected)) {
        throw new JWEInvalid('JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint');
    }
    const joseHeader = {
        ...parsedProt,
        ...jwe.header,
        ...jwe.unprotected,
    };
    validateCrit(JWEInvalid, new Map(), options === null || options === void 0 ? void 0 : options.crit, parsedProt, joseHeader);
    if (joseHeader.zip !== undefined) {
        if (!parsedProt || !parsedProt.zip) {
            throw new JWEInvalid('JWE "zip" (Compression Algorithm) Header MUST be integrity protected');
        }
        if (joseHeader.zip !== 'DEF') {
            throw new JOSENotSupported('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value');
        }
    }
    const { alg, enc } = joseHeader;
    if (typeof alg !== 'string' || !alg) {
        throw new JWEInvalid('missing JWE Algorithm (alg) in JWE Header');
    }
    if (typeof enc !== 'string' || !enc) {
        throw new JWEInvalid('missing JWE Encryption Algorithm (enc) in JWE Header');
    }
    const keyManagementAlgorithms = options && validateAlgorithms('keyManagementAlgorithms', options.keyManagementAlgorithms);
    const contentEncryptionAlgorithms = options &&
        validateAlgorithms('contentEncryptionAlgorithms', options.contentEncryptionAlgorithms);
    if (keyManagementAlgorithms && !keyManagementAlgorithms.has(alg)) {
        throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter not allowed');
    }
    if (contentEncryptionAlgorithms && !contentEncryptionAlgorithms.has(enc)) {
        throw new JOSEAlgNotAllowed('"enc" (Encryption Algorithm) Header Parameter not allowed');
    }
    let encryptedKey;
    if (jwe.encrypted_key !== undefined) {
        encryptedKey = base64url(jwe.encrypted_key);
    }
    let resolvedKey = false;
    if (typeof key === 'function') {
        key = await key(parsedProt, jwe);
        resolvedKey = true;
    }
    let cek;
    try {
        cek = await decryptKeyManagement(alg, key, encryptedKey, joseHeader);
    }
    catch (err) {
        if (err instanceof TypeError) {
            throw err;
        }
        cek = generateCek(enc);
    }
    const iv = base64url(jwe.iv);
    const tag = base64url(jwe.tag);
    const protectedHeader = encoder.encode((_a = jwe.protected) !== null && _a !== void 0 ? _a : '');
    let additionalData;
    if (jwe.aad !== undefined) {
        additionalData = concat(protectedHeader, encoder.encode('.'), encoder.encode(jwe.aad));
    }
    else {
        additionalData = protectedHeader;
    }
    let plaintext = await decrypt(enc, cek, base64url(jwe.ciphertext), iv, tag, additionalData);
    if (joseHeader.zip === 'DEF') {
        plaintext = await ((options === null || options === void 0 ? void 0 : options.inflateRaw) || inflate)(plaintext);
    }
    const result = { plaintext };
    if (jwe.protected !== undefined) {
        result.protectedHeader = parsedProt;
    }
    if (jwe.aad !== undefined) {
        result.additionalAuthenticatedData = base64url(jwe.aad);
    }
    if (jwe.unprotected !== undefined) {
        result.sharedUnprotectedHeader = jwe.unprotected;
    }
    if (jwe.header !== undefined) {
        result.unprotectedHeader = jwe.header;
    }
    if (resolvedKey) {
        return { ...result, key };
    }
    return result;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/jwe/compact/decrypt.js



async function decrypt_compactDecrypt(jwe, key, options) {
    if (jwe instanceof Uint8Array) {
        jwe = decoder.decode(jwe);
    }
    if (typeof jwe !== 'string') {
        throw new JWEInvalid('Compact JWE must be a string or Uint8Array');
    }
    const { 0: protectedHeader, 1: encryptedKey, 2: iv, 3: ciphertext, 4: tag, length, } = jwe.split('.');
    if (length !== 5) {
        throw new JWEInvalid('Invalid Compact JWE');
    }
    const decrypted = await flattenedDecrypt({
        ciphertext,
        iv: (iv || undefined),
        protected: protectedHeader || undefined,
        tag: (tag || undefined),
        encrypted_key: encryptedKey || undefined,
    }, key, options);
    const result = { plaintext: decrypted.plaintext, protectedHeader: decrypted.protectedHeader };
    if (typeof key === 'function') {
        return { ...result, key: decrypted.key };
    }
    return result;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/jwe/general/decrypt.js



async function generalDecrypt(jwe, key, options) {
    if (!isObject(jwe)) {
        throw new JWEInvalid('General JWE must be an object');
    }
    if (!Array.isArray(jwe.recipients) || !jwe.recipients.every(isObject)) {
        throw new JWEInvalid('JWE Recipients missing or incorrect type');
    }
    if (!jwe.recipients.length) {
        throw new JWEInvalid('JWE Recipients has no members');
    }
    for (const recipient of jwe.recipients) {
        try {
            return await flattenedDecrypt({
                aad: jwe.aad,
                ciphertext: jwe.ciphertext,
                encrypted_key: recipient.encrypted_key,
                header: recipient.header,
                iv: jwe.iv,
                protected: jwe.protected,
                tag: jwe.tag,
                unprotected: jwe.unprotected,
            }, key, options);
        }
        catch {
        }
    }
    throw new JWEDecryptionFailed();
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/key_to_jwk.js









const [key_to_jwk_major, key_to_jwk_minor] = process.version
    .slice(1)
    .split('.')
    .map((str) => parseInt(str, 10));
const jwkExportSupported = key_to_jwk_major >= 16 || (key_to_jwk_major === 15 && key_to_jwk_minor >= 9);
const key_to_jwk_keyToJWK = (key) => {
    let keyObject;
    if (isCryptoKey(key)) {
        if (!key.extractable) {
            throw new TypeError('CryptoKey is not extractable');
        }
        keyObject = KeyObject.from(key);
    }
    else if (isKeyObject(key)) {
        keyObject = key;
    }
    else if (key instanceof Uint8Array) {
        return {
            kty: 'oct',
            k: base64url(key),
        };
    }
    else {
        throw new TypeError(invalidKeyInput(key, ...types, 'Uint8Array'));
    }
    if (jwkExportSupported) {
        return keyObject.export({ format: 'jwk' });
    }
    switch (keyObject.type) {
        case 'secret':
            return {
                kty: 'oct',
                k: base64url(keyObject.export()),
            };
        case 'private':
        case 'public': {
            switch (keyObject.asymmetricKeyType) {
                case 'rsa': {
                    const der = keyObject.export({ format: 'der', type: 'pkcs1' });
                    const dec = new Asn1SequenceDecoder(der);
                    if (keyObject.type === 'private') {
                        dec.unsignedInteger();
                    }
                    const n = base64url(dec.unsignedInteger());
                    const e = base64url(dec.unsignedInteger());
                    let jwk;
                    if (keyObject.type === 'private') {
                        jwk = {
                            d: base64url(dec.unsignedInteger()),
                            p: base64url(dec.unsignedInteger()),
                            q: base64url(dec.unsignedInteger()),
                            dp: base64url(dec.unsignedInteger()),
                            dq: base64url(dec.unsignedInteger()),
                            qi: base64url(dec.unsignedInteger()),
                        };
                    }
                    dec.end();
                    return { kty: 'RSA', n, e, ...jwk };
                }
                case 'ec': {
                    const crv = getNamedCurve(keyObject);
                    let len;
                    let offset;
                    let correction;
                    switch (crv) {
                        case 'secp256k1':
                            len = 64;
                            offset = 31 + 2;
                            correction = -1;
                            break;
                        case 'P-256':
                            len = 64;
                            offset = 34 + 2;
                            correction = -1;
                            break;
                        case 'P-384':
                            len = 96;
                            offset = 33 + 2;
                            correction = -3;
                            break;
                        case 'P-521':
                            len = 132;
                            offset = 33 + 2;
                            correction = -3;
                            break;
                        default:
                            throw new JOSENotSupported('Unsupported curve');
                    }
                    if (keyObject.type === 'public') {
                        const der = keyObject.export({ type: 'spki', format: 'der' });
                        return {
                            kty: 'EC',
                            crv,
                            x: base64url(der.subarray(-len, -len / 2)),
                            y: base64url(der.subarray(-len / 2)),
                        };
                    }
                    const der = keyObject.export({ type: 'pkcs8', format: 'der' });
                    if (der.length < 100) {
                        offset += correction;
                    }
                    return {
                        ...key_to_jwk_keyToJWK(createPublicKey(keyObject)),
                        d: base64url(der.subarray(offset, offset + len / 2)),
                    };
                }
                case 'ed25519':
                case 'x25519': {
                    const crv = getNamedCurve(keyObject);
                    if (keyObject.type === 'public') {
                        const der = keyObject.export({ type: 'spki', format: 'der' });
                        return {
                            kty: 'OKP',
                            crv,
                            x: base64url(der.subarray(-32)),
                        };
                    }
                    const der = keyObject.export({ type: 'pkcs8', format: 'der' });
                    return {
                        ...key_to_jwk_keyToJWK(createPublicKey(keyObject)),
                        d: base64url(der.subarray(-32)),
                    };
                }
                case 'ed448':
                case 'x448': {
                    const crv = getNamedCurve(keyObject);
                    if (keyObject.type === 'public') {
                        const der = keyObject.export({ type: 'spki', format: 'der' });
                        return {
                            kty: 'OKP',
                            crv,
                            x: base64url(der.subarray(crv === 'Ed448' ? -57 : -56)),
                        };
                    }
                    const der = keyObject.export({ type: 'pkcs8', format: 'der' });
                    return {
                        ...key_to_jwk_keyToJWK(createPublicKey(keyObject)),
                        d: base64url(der.subarray(crv === 'Ed448' ? -57 : -56)),
                    };
                }
                default:
                    throw new JOSENotSupported('Unsupported key asymmetricKeyType');
            }
        }
        default:
            throw new JOSENotSupported('Unsupported key type');
    }
};
/* harmony default export */ const key_to_jwk = ((/* unused pure expression or super */ null && (key_to_jwk_keyToJWK)));

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/key/export.js



async function exportSPKI(key) {
    return exportPublic(key);
}
async function exportPKCS8(key) {
    return exportPrivate(key);
}
async function export_exportJWK(key) {
    return keyToJWK(key);
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/lib/encrypt_key_management.js










async function encrypt_key_management_encryptKeyManagement(alg, enc, key, providedCek, providedParameters = {}) {
    let encryptedKey;
    let parameters;
    let cek;
    checkKeyType(alg, key, 'encrypt');
    switch (alg) {
        case 'dir': {
            cek = key;
            break;
        }
        case 'ECDH-ES':
        case 'ECDH-ES+A128KW':
        case 'ECDH-ES+A192KW':
        case 'ECDH-ES+A256KW': {
            if (!ECDH.ecdhAllowed(key)) {
                throw new JOSENotSupported('ECDH with the provided key is not allowed or not supported by your javascript runtime');
            }
            const { apu, apv } = providedParameters;
            let { epk: ephemeralKey } = providedParameters;
            ephemeralKey || (ephemeralKey = (await ECDH.generateEpk(key)).privateKey);
            const { x, y, crv, kty } = await exportJWK(ephemeralKey);
            const sharedSecret = await ECDH.deriveKey(key, ephemeralKey, alg === 'ECDH-ES' ? enc : alg, alg === 'ECDH-ES' ? cekLength(enc) : parseInt(alg.slice(-5, -2), 10), apu, apv);
            parameters = { epk: { x, crv, kty } };
            if (kty === 'EC')
                parameters.epk.y = y;
            if (apu)
                parameters.apu = base64url(apu);
            if (apv)
                parameters.apv = base64url(apv);
            if (alg === 'ECDH-ES') {
                cek = sharedSecret;
                break;
            }
            cek = providedCek || generateCek(enc);
            const kwAlg = alg.slice(-6);
            encryptedKey = await aesKw(kwAlg, sharedSecret, cek);
            break;
        }
        case 'RSA1_5':
        case 'RSA-OAEP':
        case 'RSA-OAEP-256':
        case 'RSA-OAEP-384':
        case 'RSA-OAEP-512': {
            cek = providedCek || generateCek(enc);
            encryptedKey = await rsaEs(alg, key, cek);
            break;
        }
        case 'PBES2-HS256+A128KW':
        case 'PBES2-HS384+A192KW':
        case 'PBES2-HS512+A256KW': {
            cek = providedCek || generateCek(enc);
            const { p2c, p2s } = providedParameters;
            ({ encryptedKey, ...parameters } = await pbes2Kw(alg, key, cek, p2c, p2s));
            break;
        }
        case 'A128KW':
        case 'A192KW':
        case 'A256KW': {
            cek = providedCek || generateCek(enc);
            encryptedKey = await aesKw(alg, key, cek);
            break;
        }
        case 'A128GCMKW':
        case 'A192GCMKW':
        case 'A256GCMKW': {
            cek = providedCek || generateCek(enc);
            const { iv } = providedParameters;
            ({ encryptedKey, ...parameters } = await aesGcmKw(alg, key, cek, iv));
            break;
        }
        default: {
            throw new JOSENotSupported('Invalid or unsupported "alg" (JWE Algorithm) header value');
        }
    }
    return { cek, encryptedKey, parameters };
}
/* harmony default export */ const encrypt_key_management = ((/* unused pure expression or super */ null && (encrypt_key_management_encryptKeyManagement)));

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/jwe/flattened/encrypt.js









const encrypt_unprotected = Symbol();
class encrypt_FlattenedEncrypt {
    constructor(plaintext) {
        if (!(plaintext instanceof Uint8Array)) {
            throw new TypeError('plaintext must be an instance of Uint8Array');
        }
        this._plaintext = plaintext;
    }
    setKeyManagementParameters(parameters) {
        if (this._keyManagementParameters) {
            throw new TypeError('setKeyManagementParameters can only be called once');
        }
        this._keyManagementParameters = parameters;
        return this;
    }
    setProtectedHeader(protectedHeader) {
        if (this._protectedHeader) {
            throw new TypeError('setProtectedHeader can only be called once');
        }
        this._protectedHeader = protectedHeader;
        return this;
    }
    setSharedUnprotectedHeader(sharedUnprotectedHeader) {
        if (this._sharedUnprotectedHeader) {
            throw new TypeError('setSharedUnprotectedHeader can only be called once');
        }
        this._sharedUnprotectedHeader = sharedUnprotectedHeader;
        return this;
    }
    setUnprotectedHeader(unprotectedHeader) {
        if (this._unprotectedHeader) {
            throw new TypeError('setUnprotectedHeader can only be called once');
        }
        this._unprotectedHeader = unprotectedHeader;
        return this;
    }
    setAdditionalAuthenticatedData(aad) {
        this._aad = aad;
        return this;
    }
    setContentEncryptionKey(cek) {
        if (this._cek) {
            throw new TypeError('setContentEncryptionKey can only be called once');
        }
        this._cek = cek;
        return this;
    }
    setInitializationVector(iv) {
        if (this._iv) {
            throw new TypeError('setInitializationVector can only be called once');
        }
        this._iv = iv;
        return this;
    }
    async encrypt(key, options) {
        if (!this._protectedHeader && !this._unprotectedHeader && !this._sharedUnprotectedHeader) {
            throw new JWEInvalid('either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()');
        }
        if (!isDisjoint(this._protectedHeader, this._unprotectedHeader, this._sharedUnprotectedHeader)) {
            throw new JWEInvalid('JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint');
        }
        const joseHeader = {
            ...this._protectedHeader,
            ...this._unprotectedHeader,
            ...this._sharedUnprotectedHeader,
        };
        validateCrit(JWEInvalid, new Map(), options === null || options === void 0 ? void 0 : options.crit, this._protectedHeader, joseHeader);
        if (joseHeader.zip !== undefined) {
            if (!this._protectedHeader || !this._protectedHeader.zip) {
                throw new JWEInvalid('JWE "zip" (Compression Algorithm) Header MUST be integrity protected');
            }
            if (joseHeader.zip !== 'DEF') {
                throw new JOSENotSupported('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value');
            }
        }
        const { alg, enc } = joseHeader;
        if (typeof alg !== 'string' || !alg) {
            throw new JWEInvalid('JWE "alg" (Algorithm) Header Parameter missing or invalid');
        }
        if (typeof enc !== 'string' || !enc) {
            throw new JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
        }
        let encryptedKey;
        if (alg === 'dir') {
            if (this._cek) {
                throw new TypeError('setContentEncryptionKey cannot be called when using Direct Encryption');
            }
        }
        else if (alg === 'ECDH-ES') {
            if (this._cek) {
                throw new TypeError('setContentEncryptionKey cannot be called when using Direct Key Agreement');
            }
        }
        let cek;
        {
            let parameters;
            ({ cek, encryptedKey, parameters } = await encryptKeyManagement(alg, enc, key, this._cek, this._keyManagementParameters));
            if (parameters) {
                if (options && encrypt_unprotected in options) {
                    if (!this._unprotectedHeader) {
                        this.setUnprotectedHeader(parameters);
                    }
                    else {
                        this._unprotectedHeader = { ...this._unprotectedHeader, ...parameters };
                    }
                }
                else {
                    if (!this._protectedHeader) {
                        this.setProtectedHeader(parameters);
                    }
                    else {
                        this._protectedHeader = { ...this._protectedHeader, ...parameters };
                    }
                }
            }
        }
        this._iv || (this._iv = generateIv(enc));
        let additionalData;
        let protectedHeader;
        let aadMember;
        if (this._protectedHeader) {
            protectedHeader = encoder.encode(base64url(JSON.stringify(this._protectedHeader)));
        }
        else {
            protectedHeader = encoder.encode('');
        }
        if (this._aad) {
            aadMember = base64url(this._aad);
            additionalData = concat(protectedHeader, encoder.encode('.'), encoder.encode(aadMember));
        }
        else {
            additionalData = protectedHeader;
        }
        let ciphertext;
        let tag;
        if (joseHeader.zip === 'DEF') {
            const deflated = await ((options === null || options === void 0 ? void 0 : options.deflateRaw) || deflate)(this._plaintext);
            ({ ciphertext, tag } = await encrypt(enc, deflated, cek, this._iv, additionalData));
        }
        else {
            ;
            ({ ciphertext, tag } = await encrypt(enc, this._plaintext, cek, this._iv, additionalData));
        }
        const jwe = {
            ciphertext: base64url(ciphertext),
            iv: base64url(this._iv),
            tag: base64url(tag),
        };
        if (encryptedKey) {
            jwe.encrypted_key = base64url(encryptedKey);
        }
        if (aadMember) {
            jwe.aad = aadMember;
        }
        if (this._protectedHeader) {
            jwe.protected = decoder.decode(protectedHeader);
        }
        if (this._sharedUnprotectedHeader) {
            jwe.unprotected = this._sharedUnprotectedHeader;
        }
        if (this._unprotectedHeader) {
            jwe.header = this._unprotectedHeader;
        }
        return jwe;
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/jwe/general/encrypt.js







class IndividualRecipient {
    constructor(enc, key, options) {
        this.parent = enc;
        this.key = key;
        this.options = options;
    }
    setUnprotectedHeader(unprotectedHeader) {
        if (this.unprotectedHeader) {
            throw new TypeError('setUnprotectedHeader can only be called once');
        }
        this.unprotectedHeader = unprotectedHeader;
        return this;
    }
    addRecipient(...args) {
        return this.parent.addRecipient(...args);
    }
    encrypt(...args) {
        return this.parent.encrypt(...args);
    }
    done() {
        return this.parent;
    }
}
class GeneralEncrypt {
    constructor(plaintext) {
        this._recipients = [];
        this._plaintext = plaintext;
    }
    addRecipient(key, options) {
        const recipient = new IndividualRecipient(this, key, { crit: options === null || options === void 0 ? void 0 : options.crit });
        this._recipients.push(recipient);
        return recipient;
    }
    setProtectedHeader(protectedHeader) {
        if (this._protectedHeader) {
            throw new TypeError('setProtectedHeader can only be called once');
        }
        this._protectedHeader = protectedHeader;
        return this;
    }
    setSharedUnprotectedHeader(sharedUnprotectedHeader) {
        if (this._unprotectedHeader) {
            throw new TypeError('setSharedUnprotectedHeader can only be called once');
        }
        this._unprotectedHeader = sharedUnprotectedHeader;
        return this;
    }
    setAdditionalAuthenticatedData(aad) {
        this._aad = aad;
        return this;
    }
    async encrypt(options) {
        var _a, _b, _c;
        if (!this._recipients.length) {
            throw new JWEInvalid('at least one recipient must be added');
        }
        options = { deflateRaw: options === null || options === void 0 ? void 0 : options.deflateRaw };
        if (this._recipients.length === 1) {
            const [recipient] = this._recipients;
            const flattened = await new FlattenedEncrypt(this._plaintext)
                .setAdditionalAuthenticatedData(this._aad)
                .setProtectedHeader(this._protectedHeader)
                .setSharedUnprotectedHeader(this._unprotectedHeader)
                .setUnprotectedHeader(recipient.unprotectedHeader)
                .encrypt(recipient.key, { ...recipient.options, ...options });
            let jwe = {
                ciphertext: flattened.ciphertext,
                iv: flattened.iv,
                recipients: [{}],
                tag: flattened.tag,
            };
            if (flattened.aad)
                jwe.aad = flattened.aad;
            if (flattened.protected)
                jwe.protected = flattened.protected;
            if (flattened.unprotected)
                jwe.unprotected = flattened.unprotected;
            if (flattened.encrypted_key)
                jwe.recipients[0].encrypted_key = flattened.encrypted_key;
            if (flattened.header)
                jwe.recipients[0].header = flattened.header;
            return jwe;
        }
        let enc;
        for (let i = 0; i < this._recipients.length; i++) {
            const recipient = this._recipients[i];
            if (!isDisjoint(this._protectedHeader, this._unprotectedHeader, recipient.unprotectedHeader)) {
                throw new JWEInvalid('JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint');
            }
            const joseHeader = {
                ...this._protectedHeader,
                ...this._unprotectedHeader,
                ...recipient.unprotectedHeader,
            };
            const { alg } = joseHeader;
            if (typeof alg !== 'string' || !alg) {
                throw new JWEInvalid('JWE "alg" (Algorithm) Header Parameter missing or invalid');
            }
            if (alg === 'dir' || alg === 'ECDH-ES') {
                throw new JWEInvalid('"dir" and "ECDH-ES" alg may only be used with a single recipient');
            }
            if (typeof joseHeader.enc !== 'string' || !joseHeader.enc) {
                throw new JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
            }
            if (!enc) {
                enc = joseHeader.enc;
            }
            else if (enc !== joseHeader.enc) {
                throw new JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter must be the same for all recipients');
            }
            validateCrit(JWEInvalid, new Map(), recipient.options.crit, this._protectedHeader, joseHeader);
            if (joseHeader.zip !== undefined) {
                if (!this._protectedHeader || !this._protectedHeader.zip) {
                    throw new JWEInvalid('JWE "zip" (Compression Algorithm) Header MUST be integrity protected');
                }
            }
        }
        const cek = generateCek(enc);
        let jwe = {
            ciphertext: '',
            iv: '',
            recipients: [],
            tag: '',
        };
        for (let i = 0; i < this._recipients.length; i++) {
            const recipient = this._recipients[i];
            const target = {};
            jwe.recipients.push(target);
            const joseHeader = {
                ...this._protectedHeader,
                ...this._unprotectedHeader,
                ...recipient.unprotectedHeader,
            };
            const p2c = joseHeader.alg.startsWith('PBES2') ? 2048 + i : undefined;
            if (i === 0) {
                const flattened = await new FlattenedEncrypt(this._plaintext)
                    .setAdditionalAuthenticatedData(this._aad)
                    .setContentEncryptionKey(cek)
                    .setProtectedHeader(this._protectedHeader)
                    .setSharedUnprotectedHeader(this._unprotectedHeader)
                    .setUnprotectedHeader(recipient.unprotectedHeader)
                    .setKeyManagementParameters({ p2c })
                    .encrypt(recipient.key, {
                    ...recipient.options,
                    ...options,
                    [unprotected]: true,
                });
                jwe.ciphertext = flattened.ciphertext;
                jwe.iv = flattened.iv;
                jwe.tag = flattened.tag;
                if (flattened.aad)
                    jwe.aad = flattened.aad;
                if (flattened.protected)
                    jwe.protected = flattened.protected;
                if (flattened.unprotected)
                    jwe.unprotected = flattened.unprotected;
                target.encrypted_key = flattened.encrypted_key;
                if (flattened.header)
                    target.header = flattened.header;
                continue;
            }
            const { encryptedKey, parameters } = await encryptKeyManagement(((_a = recipient.unprotectedHeader) === null || _a === void 0 ? void 0 : _a.alg) ||
                ((_b = this._protectedHeader) === null || _b === void 0 ? void 0 : _b.alg) ||
                ((_c = this._unprotectedHeader) === null || _c === void 0 ? void 0 : _c.alg), enc, recipient.key, cek, { p2c });
            target.encrypted_key = base64url(encryptedKey);
            if (recipient.unprotectedHeader || parameters)
                target.header = { ...recipient.unprotectedHeader, ...parameters };
        }
        return jwe;
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/dsa_digest.js

function dsaDigest(alg) {
    switch (alg) {
        case 'PS256':
        case 'RS256':
        case 'ES256':
        case 'ES256K':
            return 'sha256';
        case 'PS384':
        case 'RS384':
        case 'ES384':
            return 'sha384';
        case 'PS512':
        case 'RS512':
        case 'ES512':
            return 'sha512';
        case 'EdDSA':
            return undefined;
        default:
            throw new errors_JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/node_key.js




const [node_key_major, node_key_minor] = process.version
    .slice(1)
    .split('.')
    .map((str) => parseInt(str, 10));
const electron = 'electron' in process.versions;
const rsaPssParams = !electron && (node_key_major >= 17 || (node_key_major === 16 && node_key_minor >= 9));
const PSS = {
    padding: external_crypto_namespaceObject.constants.RSA_PKCS1_PSS_PADDING,
    saltLength: external_crypto_namespaceObject.constants.RSA_PSS_SALTLEN_DIGEST,
};
const ecCurveAlgMap = new Map([
    ['ES256', 'P-256'],
    ['ES256K', 'secp256k1'],
    ['ES384', 'P-384'],
    ['ES512', 'P-521'],
]);
function keyForCrypto(alg, key) {
    switch (alg) {
        case 'EdDSA':
            if (!['ed25519', 'ed448'].includes(key.asymmetricKeyType)) {
                throw new TypeError('Invalid key for this operation, its asymmetricKeyType must be ed25519 or ed448');
            }
            return key;
        case 'RS256':
        case 'RS384':
        case 'RS512':
            if (key.asymmetricKeyType !== 'rsa') {
                throw new TypeError('Invalid key for this operation, its asymmetricKeyType must be rsa');
            }
            check_modulus_length(key, alg);
            return key;
        case rsaPssParams && 'PS256':
        case rsaPssParams && 'PS384':
        case rsaPssParams && 'PS512':
            if (key.asymmetricKeyType === 'rsa-pss') {
                const { hashAlgorithm, mgf1HashAlgorithm, saltLength } = key.asymmetricKeyDetails;
                const length = parseInt(alg.slice(-3), 10);
                if (hashAlgorithm !== undefined &&
                    (hashAlgorithm !== `sha${length}` || mgf1HashAlgorithm !== hashAlgorithm)) {
                    throw new TypeError(`Invalid key for this operation, its RSA-PSS parameters do not meet the requirements of "alg" ${alg}`);
                }
                if (saltLength !== undefined && saltLength > length >> 3) {
                    throw new TypeError(`Invalid key for this operation, its RSA-PSS parameter saltLength does not meet the requirements of "alg" ${alg}`);
                }
            }
            else if (key.asymmetricKeyType !== 'rsa') {
                throw new TypeError('Invalid key for this operation, its asymmetricKeyType must be rsa or rsa-pss');
            }
            check_modulus_length(key, alg);
            return { key, ...PSS };
        case !rsaPssParams && 'PS256':
        case !rsaPssParams && 'PS384':
        case !rsaPssParams && 'PS512':
            if (key.asymmetricKeyType !== 'rsa') {
                throw new TypeError('Invalid key for this operation, its asymmetricKeyType must be rsa');
            }
            check_modulus_length(key, alg);
            return { key, ...PSS };
        case 'ES256':
        case 'ES256K':
        case 'ES384':
        case 'ES512': {
            if (key.asymmetricKeyType !== 'ec') {
                throw new TypeError('Invalid key for this operation, its asymmetricKeyType must be ec');
            }
            const actual = get_named_curve(key);
            const expected = ecCurveAlgMap.get(alg);
            if (actual !== expected) {
                throw new TypeError(`Invalid key curve for the algorithm, its curve must be ${expected}, got ${actual}`);
            }
            return { dsaEncoding: 'ieee-p1363', key };
        }
        default:
            throw new errors_JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/hmac_digest.js

function hmacDigest(alg) {
    switch (alg) {
        case 'HS256':
            return 'sha256';
        case 'HS384':
            return 'sha384';
        case 'HS512':
            return 'sha512';
        default:
            throw new errors_JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/env.js
function isCloudflareWorkers() {
    return false;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/lib/crypto_key.js

function unusable(name, prop = 'algorithm.name') {
    return new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
}
function isAlgorithm(algorithm, name) {
    return algorithm.name === name;
}
function getHashLength(hash) {
    return parseInt(hash.name.slice(4), 10);
}
function crypto_key_getNamedCurve(alg) {
    switch (alg) {
        case 'ES256':
            return 'P-256';
        case 'ES384':
            return 'P-384';
        case 'ES512':
            return 'P-521';
        default:
            throw new Error('unreachable');
    }
}
function checkUsage(key, usages) {
    if (usages.length && !usages.some((expected) => key.usages.includes(expected))) {
        let msg = 'CryptoKey does not support this operation, its usages must include ';
        if (usages.length > 2) {
            const last = usages.pop();
            msg += `one of ${usages.join(', ')}, or ${last}.`;
        }
        else if (usages.length === 2) {
            msg += `one of ${usages[0]} or ${usages[1]}.`;
        }
        else {
            msg += `${usages[0]}.`;
        }
        throw new TypeError(msg);
    }
}
function checkSigCryptoKey(key, alg, ...usages) {
    switch (alg) {
        case 'HS256':
        case 'HS384':
        case 'HS512': {
            if (!isAlgorithm(key.algorithm, 'HMAC'))
                throw unusable('HMAC');
            const expected = parseInt(alg.slice(2), 10);
            const actual = getHashLength(key.algorithm.hash);
            if (actual !== expected)
                throw unusable(`SHA-${expected}`, 'algorithm.hash');
            break;
        }
        case 'RS256':
        case 'RS384':
        case 'RS512': {
            if (!isAlgorithm(key.algorithm, 'RSASSA-PKCS1-v1_5'))
                throw unusable('RSASSA-PKCS1-v1_5');
            const expected = parseInt(alg.slice(2), 10);
            const actual = getHashLength(key.algorithm.hash);
            if (actual !== expected)
                throw unusable(`SHA-${expected}`, 'algorithm.hash');
            break;
        }
        case 'PS256':
        case 'PS384':
        case 'PS512': {
            if (!isAlgorithm(key.algorithm, 'RSA-PSS'))
                throw unusable('RSA-PSS');
            const expected = parseInt(alg.slice(2), 10);
            const actual = getHashLength(key.algorithm.hash);
            if (actual !== expected)
                throw unusable(`SHA-${expected}`, 'algorithm.hash');
            break;
        }
        case isCloudflareWorkers() && 'EdDSA': {
            if (!isAlgorithm(key.algorithm, 'NODE-ED25519'))
                throw unusable('NODE-ED25519');
            break;
        }
        case 'ES256':
        case 'ES384':
        case 'ES512': {
            if (!isAlgorithm(key.algorithm, 'ECDSA'))
                throw unusable('ECDSA');
            const expected = crypto_key_getNamedCurve(alg);
            const actual = key.algorithm.namedCurve;
            if (actual !== expected)
                throw unusable(expected, 'algorithm.namedCurve');
            break;
        }
        default:
            throw new TypeError('CryptoKey does not support this operation');
    }
    checkUsage(key, usages);
}
function crypto_key_checkEncCryptoKey(key, alg, ...usages) {
    switch (alg) {
        case 'A128GCM':
        case 'A192GCM':
        case 'A256GCM': {
            if (!isAlgorithm(key.algorithm, 'AES-GCM'))
                throw unusable('AES-GCM');
            const expected = parseInt(alg.slice(1, 4), 10);
            const actual = key.algorithm.length;
            if (actual !== expected)
                throw unusable(expected, 'algorithm.length');
            break;
        }
        case 'A128KW':
        case 'A192KW':
        case 'A256KW': {
            if (!isAlgorithm(key.algorithm, 'AES-KW'))
                throw unusable('AES-KW');
            const expected = parseInt(alg.slice(1, 4), 10);
            const actual = key.algorithm.length;
            if (actual !== expected)
                throw unusable(expected, 'algorithm.length');
            break;
        }
        case 'ECDH':
            if (!isAlgorithm(key.algorithm, 'ECDH'))
                throw unusable('ECDH');
            break;
        case 'PBES2-HS256+A128KW':
        case 'PBES2-HS384+A192KW':
        case 'PBES2-HS512+A256KW':
            if (!isAlgorithm(key.algorithm, 'PBKDF2'))
                throw unusable('PBKDF2');
            break;
        case 'RSA-OAEP':
        case 'RSA-OAEP-256':
        case 'RSA-OAEP-384':
        case 'RSA-OAEP-512': {
            if (!isAlgorithm(key.algorithm, 'RSA-OAEP'))
                throw unusable('RSA-OAEP');
            const expected = parseInt(alg.slice(9), 10) || 1;
            const actual = getHashLength(key.algorithm.hash);
            if (actual !== expected)
                throw unusable(`SHA-${expected}`, 'algorithm.hash');
            break;
        }
        default:
            throw new TypeError('CryptoKey does not support this operation');
    }
    checkUsage(key, usages);
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/get_sign_verify_key.js





function getSignVerifyKey(alg, key, usage) {
    if (key instanceof Uint8Array) {
        if (!alg.startsWith('HS')) {
            throw new TypeError(invalid_key_input(key, ...is_key_like_types));
        }
        return (0,external_crypto_namespaceObject.createSecretKey)(key);
    }
    if (key instanceof external_crypto_namespaceObject.KeyObject) {
        return key;
    }
    if (webcrypto_isCryptoKey(key)) {
        checkSigCryptoKey(key, alg, usage);
        return external_crypto_namespaceObject.KeyObject.from(key);
    }
    throw new TypeError(invalid_key_input(key, ...is_key_like_types, 'Uint8Array'));
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/sign.js






let oneShotSign;
if (external_crypto_namespaceObject.sign.length > 3) {
    oneShotSign = (0,external_util_.promisify)(external_crypto_namespaceObject.sign);
}
else {
    oneShotSign = external_crypto_namespaceObject.sign;
}
const sign_sign = async (alg, key, data) => {
    const keyObject = getSignVerifyKey(alg, key, 'sign');
    if (alg.startsWith('HS')) {
        const hmac = external_crypto_namespaceObject.createHmac(hmacDigest(alg), keyObject);
        hmac.update(data);
        return hmac.digest();
    }
    return oneShotSign(dsaDigest(alg), data, keyForCrypto(alg, keyObject));
};
/* harmony default export */ const runtime_sign = (sign_sign);

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/verify.js






const [verify_major, verify_minor] = process.version
    .slice(1)
    .split('.')
    .map((str) => parseInt(str, 10));
const oneShotCallbackSupported = verify_major >= 16 || (verify_major === 15 && verify_minor >= 13);
let oneShotVerify;
if (external_crypto_namespaceObject.verify.length > 4 && oneShotCallbackSupported) {
    oneShotVerify = (0,external_util_.promisify)(external_crypto_namespaceObject.verify);
}
else {
    oneShotVerify = external_crypto_namespaceObject.verify;
}
const verify = async (alg, key, signature, data) => {
    const keyObject = getSignVerifyKey(alg, key, 'verify');
    if (alg.startsWith('HS')) {
        const expected = await runtime_sign(alg, keyObject, data);
        const actual = signature;
        try {
            return external_crypto_namespaceObject.timingSafeEqual(actual, expected);
        }
        catch {
            return false;
        }
    }
    const algorithm = dsaDigest(alg);
    const keyInput = keyForCrypto(alg, keyObject);
    try {
        return await oneShotVerify(algorithm, data, keyInput, signature);
    }
    catch {
        return false;
    }
};
/* harmony default export */ const runtime_verify = (verify);

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/lib/is_disjoint.js
const is_disjoint_isDisjoint = (...headers) => {
    const sources = headers.filter(Boolean);
    if (sources.length === 0 || sources.length === 1) {
        return true;
    }
    let acc;
    for (const header of sources) {
        const parameters = Object.keys(header);
        if (!acc || acc.size === 0) {
            acc = new Set(parameters);
            continue;
        }
        for (const parameter of parameters) {
            if (acc.has(parameter)) {
                return false;
            }
            acc.add(parameter);
        }
    }
    return true;
};
/* harmony default export */ const is_disjoint = (is_disjoint_isDisjoint);

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/lib/validate_algorithms.js
const validate_algorithms_validateAlgorithms = (option, algorithms) => {
    if (algorithms !== undefined &&
        (!Array.isArray(algorithms) || algorithms.some((s) => typeof s !== 'string'))) {
        throw new TypeError(`"${option}" option must be an array of strings`);
    }
    if (!algorithms) {
        return undefined;
    }
    return new Set(algorithms);
};
/* harmony default export */ const validate_algorithms = (validate_algorithms_validateAlgorithms);

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/jws/flattened/verify.js









async function verify_flattenedVerify(jws, key, options) {
    var _a;
    if (!is_object_isObject(jws)) {
        throw new errors_JWSInvalid('Flattened JWS must be an object');
    }
    if (jws.protected === undefined && jws.header === undefined) {
        throw new errors_JWSInvalid('Flattened JWS must have either of the "protected" or "header" members');
    }
    if (jws.protected !== undefined && typeof jws.protected !== 'string') {
        throw new errors_JWSInvalid('JWS Protected Header incorrect type');
    }
    if (jws.payload === undefined) {
        throw new errors_JWSInvalid('JWS Payload missing');
    }
    if (typeof jws.signature !== 'string') {
        throw new errors_JWSInvalid('JWS Signature missing or incorrect type');
    }
    if (jws.header !== undefined && !is_object_isObject(jws.header)) {
        throw new errors_JWSInvalid('JWS Unprotected Header incorrect type');
    }
    let parsedProt = {};
    if (jws.protected) {
        const protectedHeader = decode(jws.protected);
        try {
            parsedProt = JSON.parse(buffer_utils_decoder.decode(protectedHeader));
        }
        catch {
            throw new errors_JWSInvalid('JWS Protected Header is invalid');
        }
    }
    if (!is_disjoint(parsedProt, jws.header)) {
        throw new errors_JWSInvalid('JWS Protected and JWS Unprotected Header Parameter names must be disjoint');
    }
    const joseHeader = {
        ...parsedProt,
        ...jws.header,
    };
    const extensions = validate_crit(errors_JWSInvalid, new Map([['b64', true]]), options === null || options === void 0 ? void 0 : options.crit, parsedProt, joseHeader);
    let b64 = true;
    if (extensions.has('b64')) {
        b64 = parsedProt.b64;
        if (typeof b64 !== 'boolean') {
            throw new errors_JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
        }
    }
    const { alg } = joseHeader;
    if (typeof alg !== 'string' || !alg) {
        throw new errors_JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
    }
    const algorithms = options && validate_algorithms('algorithms', options.algorithms);
    if (algorithms && !algorithms.has(alg)) {
        throw new errors_JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter not allowed');
    }
    if (b64) {
        if (typeof jws.payload !== 'string') {
            throw new errors_JWSInvalid('JWS Payload must be a string');
        }
    }
    else if (typeof jws.payload !== 'string' && !(jws.payload instanceof Uint8Array)) {
        throw new errors_JWSInvalid('JWS Payload must be a string or an Uint8Array instance');
    }
    let resolvedKey = false;
    if (typeof key === 'function') {
        key = await key(parsedProt, jws);
        resolvedKey = true;
    }
    check_key_type(alg, key, 'verify');
    const data = buffer_utils_concat(buffer_utils_encoder.encode((_a = jws.protected) !== null && _a !== void 0 ? _a : ''), buffer_utils_encoder.encode('.'), typeof jws.payload === 'string' ? buffer_utils_encoder.encode(jws.payload) : jws.payload);
    const signature = decode(jws.signature);
    const verified = await runtime_verify(alg, key, signature, data);
    if (!verified) {
        throw new errors_JWSSignatureVerificationFailed();
    }
    let payload;
    if (b64) {
        payload = decode(jws.payload);
    }
    else if (typeof jws.payload === 'string') {
        payload = buffer_utils_encoder.encode(jws.payload);
    }
    else {
        payload = jws.payload;
    }
    const result = { payload };
    if (jws.protected !== undefined) {
        result.protectedHeader = parsedProt;
    }
    if (jws.header !== undefined) {
        result.unprotectedHeader = jws.header;
    }
    if (resolvedKey) {
        return { ...result, key };
    }
    return result;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/jws/compact/verify.js



async function compactVerify(jws, key, options) {
    if (jws instanceof Uint8Array) {
        jws = buffer_utils_decoder.decode(jws);
    }
    if (typeof jws !== 'string') {
        throw new errors_JWSInvalid('Compact JWS must be a string or Uint8Array');
    }
    const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split('.');
    if (length !== 3) {
        throw new errors_JWSInvalid('Invalid Compact JWS');
    }
    const verified = await verify_flattenedVerify({ payload, protected: protectedHeader, signature }, key, options);
    const result = { payload: verified.payload, protectedHeader: verified.protectedHeader };
    if (typeof key === 'function') {
        return { ...result, key: verified.key };
    }
    return result;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/jws/general/verify.js



async function generalVerify(jws, key, options) {
    if (!isObject(jws)) {
        throw new JWSInvalid('General JWS must be an object');
    }
    if (!Array.isArray(jws.signatures) || !jws.signatures.every(isObject)) {
        throw new JWSInvalid('JWS Signatures missing or incorrect type');
    }
    for (const signature of jws.signatures) {
        try {
            return await flattenedVerify({
                header: signature.header,
                payload: jws.payload,
                protected: signature.protected,
                signature: signature.signature,
            }, key, options);
        }
        catch {
        }
    }
    throw new JWSSignatureVerificationFailed();
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/lib/epoch.js
/* harmony default export */ const lib_epoch = ((date) => Math.floor(date.getTime() / 1000));

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/lib/secs.js
const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const year = day * 365.25;
const REGEX = /^(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)$/i;
/* harmony default export */ const lib_secs = ((str) => {
    const matched = REGEX.exec(str);
    if (!matched) {
        throw new TypeError('Invalid time period format');
    }
    const value = parseFloat(matched[1]);
    const unit = matched[2].toLowerCase();
    switch (unit) {
        case 'sec':
        case 'secs':
        case 'second':
        case 'seconds':
        case 's':
            return Math.round(value);
        case 'minute':
        case 'minutes':
        case 'min':
        case 'mins':
        case 'm':
            return Math.round(value * minute);
        case 'hour':
        case 'hours':
        case 'hr':
        case 'hrs':
        case 'h':
            return Math.round(value * hour);
        case 'day':
        case 'days':
        case 'd':
            return Math.round(value * day);
        case 'week':
        case 'weeks':
        case 'w':
            return Math.round(value * week);
        default:
            return Math.round(value * year);
    }
});

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/lib/jwt_claims_set.js





const normalizeTyp = (value) => value.toLowerCase().replace(/^application\//, '');
const checkAudiencePresence = (audPayload, audOption) => {
    if (typeof audPayload === 'string') {
        return audOption.includes(audPayload);
    }
    if (Array.isArray(audPayload)) {
        return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
    }
    return false;
};
/* harmony default export */ const jwt_claims_set = ((protectedHeader, encodedPayload, options = {}) => {
    const { typ } = options;
    if (typ &&
        (typeof protectedHeader.typ !== 'string' ||
            normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) {
        throw new errors_JWTClaimValidationFailed('unexpected "typ" JWT header value', 'typ', 'check_failed');
    }
    let payload;
    try {
        payload = JSON.parse(buffer_utils_decoder.decode(encodedPayload));
    }
    catch {
    }
    if (!is_object_isObject(payload)) {
        throw new errors_JWTInvalid('JWT Claims Set must be a top-level JSON object');
    }
    const { issuer } = options;
    if (issuer && !(Array.isArray(issuer) ? issuer : [issuer]).includes(payload.iss)) {
        throw new errors_JWTClaimValidationFailed('unexpected "iss" claim value', 'iss', 'check_failed');
    }
    const { subject } = options;
    if (subject && payload.sub !== subject) {
        throw new errors_JWTClaimValidationFailed('unexpected "sub" claim value', 'sub', 'check_failed');
    }
    const { audience } = options;
    if (audience &&
        !checkAudiencePresence(payload.aud, typeof audience === 'string' ? [audience] : audience)) {
        throw new errors_JWTClaimValidationFailed('unexpected "aud" claim value', 'aud', 'check_failed');
    }
    let tolerance;
    switch (typeof options.clockTolerance) {
        case 'string':
            tolerance = lib_secs(options.clockTolerance);
            break;
        case 'number':
            tolerance = options.clockTolerance;
            break;
        case 'undefined':
            tolerance = 0;
            break;
        default:
            throw new TypeError('Invalid clockTolerance option type');
    }
    const { currentDate } = options;
    const now = lib_epoch(currentDate || new Date());
    if ((payload.iat !== undefined || options.maxTokenAge) && typeof payload.iat !== 'number') {
        throw new errors_JWTClaimValidationFailed('"iat" claim must be a number', 'iat', 'invalid');
    }
    if (payload.nbf !== undefined) {
        if (typeof payload.nbf !== 'number') {
            throw new errors_JWTClaimValidationFailed('"nbf" claim must be a number', 'nbf', 'invalid');
        }
        if (payload.nbf > now + tolerance) {
            throw new errors_JWTClaimValidationFailed('"nbf" claim timestamp check failed', 'nbf', 'check_failed');
        }
    }
    if (payload.exp !== undefined) {
        if (typeof payload.exp !== 'number') {
            throw new errors_JWTClaimValidationFailed('"exp" claim must be a number', 'exp', 'invalid');
        }
        if (payload.exp <= now - tolerance) {
            throw new JWTExpired('"exp" claim timestamp check failed', 'exp', 'check_failed');
        }
    }
    if (options.maxTokenAge) {
        const age = now - payload.iat;
        const max = typeof options.maxTokenAge === 'number' ? options.maxTokenAge : lib_secs(options.maxTokenAge);
        if (age - tolerance > max) {
            throw new JWTExpired('"iat" claim timestamp check failed (too far in the past)', 'iat', 'check_failed');
        }
        if (age < 0 - tolerance) {
            throw new errors_JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)', 'iat', 'check_failed');
        }
    }
    return payload;
});

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/jwt/verify.js



async function jwtVerify(jwt, key, options) {
    var _a;
    const verified = await compactVerify(jwt, key, options);
    if (((_a = verified.protectedHeader.crit) === null || _a === void 0 ? void 0 : _a.includes('b64')) && verified.protectedHeader.b64 === false) {
        throw new errors_JWTInvalid('JWTs MUST NOT use unencoded payload');
    }
    const payload = jwt_claims_set(verified.protectedHeader, verified.payload, options);
    const result = { payload, protectedHeader: verified.protectedHeader };
    if (typeof key === 'function') {
        return { ...result, key: verified.key };
    }
    return result;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/jwt/decrypt.js



async function jwtDecrypt(jwt, key, options) {
    const decrypted = await compactDecrypt(jwt, key, options);
    const payload = jwtPayload(decrypted.protectedHeader, decrypted.plaintext, options);
    const { protectedHeader } = decrypted;
    if (protectedHeader.iss !== undefined && protectedHeader.iss !== payload.iss) {
        throw new JWTClaimValidationFailed('replicated "iss" claim header parameter mismatch', 'iss', 'mismatch');
    }
    if (protectedHeader.sub !== undefined && protectedHeader.sub !== payload.sub) {
        throw new JWTClaimValidationFailed('replicated "sub" claim header parameter mismatch', 'sub', 'mismatch');
    }
    if (protectedHeader.aud !== undefined &&
        JSON.stringify(protectedHeader.aud) !== JSON.stringify(payload.aud)) {
        throw new JWTClaimValidationFailed('replicated "aud" claim header parameter mismatch', 'aud', 'mismatch');
    }
    const result = { payload, protectedHeader };
    if (typeof key === 'function') {
        return { ...result, key: decrypted.key };
    }
    return result;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/jwe/compact/encrypt.js

class encrypt_CompactEncrypt {
    constructor(plaintext) {
        this._flattened = new FlattenedEncrypt(plaintext);
    }
    setContentEncryptionKey(cek) {
        this._flattened.setContentEncryptionKey(cek);
        return this;
    }
    setInitializationVector(iv) {
        this._flattened.setInitializationVector(iv);
        return this;
    }
    setProtectedHeader(protectedHeader) {
        this._flattened.setProtectedHeader(protectedHeader);
        return this;
    }
    setKeyManagementParameters(parameters) {
        this._flattened.setKeyManagementParameters(parameters);
        return this;
    }
    async encrypt(key, options) {
        const jwe = await this._flattened.encrypt(key, options);
        return [jwe.protected, jwe.encrypted_key, jwe.iv, jwe.ciphertext, jwe.tag].join('.');
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/jws/flattened/sign.js







class sign_FlattenedSign {
    constructor(payload) {
        if (!(payload instanceof Uint8Array)) {
            throw new TypeError('payload must be an instance of Uint8Array');
        }
        this._payload = payload;
    }
    setProtectedHeader(protectedHeader) {
        if (this._protectedHeader) {
            throw new TypeError('setProtectedHeader can only be called once');
        }
        this._protectedHeader = protectedHeader;
        return this;
    }
    setUnprotectedHeader(unprotectedHeader) {
        if (this._unprotectedHeader) {
            throw new TypeError('setUnprotectedHeader can only be called once');
        }
        this._unprotectedHeader = unprotectedHeader;
        return this;
    }
    async sign(key, options) {
        if (!this._protectedHeader && !this._unprotectedHeader) {
            throw new JWSInvalid('either setProtectedHeader or setUnprotectedHeader must be called before #sign()');
        }
        if (!isDisjoint(this._protectedHeader, this._unprotectedHeader)) {
            throw new JWSInvalid('JWS Protected and JWS Unprotected Header Parameter names must be disjoint');
        }
        const joseHeader = {
            ...this._protectedHeader,
            ...this._unprotectedHeader,
        };
        const extensions = validateCrit(JWSInvalid, new Map([['b64', true]]), options === null || options === void 0 ? void 0 : options.crit, this._protectedHeader, joseHeader);
        let b64 = true;
        if (extensions.has('b64')) {
            b64 = this._protectedHeader.b64;
            if (typeof b64 !== 'boolean') {
                throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
            }
        }
        const { alg } = joseHeader;
        if (typeof alg !== 'string' || !alg) {
            throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
        }
        checkKeyType(alg, key, 'sign');
        let payload = this._payload;
        if (b64) {
            payload = encoder.encode(base64url(payload));
        }
        let protectedHeader;
        if (this._protectedHeader) {
            protectedHeader = encoder.encode(base64url(JSON.stringify(this._protectedHeader)));
        }
        else {
            protectedHeader = encoder.encode('');
        }
        const data = concat(protectedHeader, encoder.encode('.'), payload);
        const signature = await sign(alg, key, data);
        const jws = {
            signature: base64url(signature),
            payload: '',
        };
        if (b64) {
            jws.payload = decoder.decode(payload);
        }
        if (this._unprotectedHeader) {
            jws.header = this._unprotectedHeader;
        }
        if (this._protectedHeader) {
            jws.protected = decoder.decode(protectedHeader);
        }
        return jws;
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/jws/compact/sign.js

class sign_CompactSign {
    constructor(payload) {
        this._flattened = new FlattenedSign(payload);
    }
    setProtectedHeader(protectedHeader) {
        this._flattened.setProtectedHeader(protectedHeader);
        return this;
    }
    async sign(key, options) {
        const jws = await this._flattened.sign(key, options);
        if (jws.payload === undefined) {
            throw new TypeError('use the flattened module for creating JWS with b64: false');
        }
        return `${jws.protected}.${jws.payload}.${jws.signature}`;
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/jws/general/sign.js


class IndividualSignature {
    constructor(sig, key, options) {
        this.parent = sig;
        this.key = key;
        this.options = options;
    }
    setProtectedHeader(protectedHeader) {
        if (this.protectedHeader) {
            throw new TypeError('setProtectedHeader can only be called once');
        }
        this.protectedHeader = protectedHeader;
        return this;
    }
    setUnprotectedHeader(unprotectedHeader) {
        if (this.unprotectedHeader) {
            throw new TypeError('setUnprotectedHeader can only be called once');
        }
        this.unprotectedHeader = unprotectedHeader;
        return this;
    }
    addSignature(...args) {
        return this.parent.addSignature(...args);
    }
    sign(...args) {
        return this.parent.sign(...args);
    }
    done() {
        return this.parent;
    }
}
class GeneralSign {
    constructor(payload) {
        this._signatures = [];
        this._payload = payload;
    }
    addSignature(key, options) {
        const signature = new IndividualSignature(this, key, options);
        this._signatures.push(signature);
        return signature;
    }
    async sign() {
        if (!this._signatures.length) {
            throw new JWSInvalid('at least one signature must be added');
        }
        const jws = {
            signatures: [],
            payload: '',
        };
        for (let i = 0; i < this._signatures.length; i++) {
            const signature = this._signatures[i];
            const flattened = new FlattenedSign(this._payload);
            flattened.setProtectedHeader(signature.protectedHeader);
            flattened.setUnprotectedHeader(signature.unprotectedHeader);
            const { payload, ...rest } = await flattened.sign(signature.key, signature.options);
            if (i === 0) {
                jws.payload = payload;
            }
            else if (jws.payload !== payload) {
                throw new JWSInvalid('inconsistent use of JWS Unencoded Payload Option (RFC7797)');
            }
            jws.signatures.push(rest);
        }
        return jws;
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/jwt/produce.js



class produce_ProduceJWT {
    constructor(payload) {
        if (!isObject(payload)) {
            throw new TypeError('JWT Claims Set MUST be an object');
        }
        this._payload = payload;
    }
    setIssuer(issuer) {
        this._payload = { ...this._payload, iss: issuer };
        return this;
    }
    setSubject(subject) {
        this._payload = { ...this._payload, sub: subject };
        return this;
    }
    setAudience(audience) {
        this._payload = { ...this._payload, aud: audience };
        return this;
    }
    setJti(jwtId) {
        this._payload = { ...this._payload, jti: jwtId };
        return this;
    }
    setNotBefore(input) {
        if (typeof input === 'number') {
            this._payload = { ...this._payload, nbf: input };
        }
        else {
            this._payload = { ...this._payload, nbf: epoch(new Date()) + secs(input) };
        }
        return this;
    }
    setExpirationTime(input) {
        if (typeof input === 'number') {
            this._payload = { ...this._payload, exp: input };
        }
        else {
            this._payload = { ...this._payload, exp: epoch(new Date()) + secs(input) };
        }
        return this;
    }
    setIssuedAt(input) {
        if (typeof input === 'undefined') {
            this._payload = { ...this._payload, iat: epoch(new Date()) };
        }
        else {
            this._payload = { ...this._payload, iat: input };
        }
        return this;
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/jwt/sign.js




class SignJWT extends (/* unused pure expression or super */ null && (ProduceJWT)) {
    setProtectedHeader(protectedHeader) {
        this._protectedHeader = protectedHeader;
        return this;
    }
    async sign(key, options) {
        var _a;
        const sig = new CompactSign(encoder.encode(JSON.stringify(this._payload)));
        sig.setProtectedHeader(this._protectedHeader);
        if (Array.isArray((_a = this._protectedHeader) === null || _a === void 0 ? void 0 : _a.crit) &&
            this._protectedHeader.crit.includes('b64') &&
            this._protectedHeader.b64 === false) {
            throw new JWTInvalid('JWTs MUST NOT use unencoded payload');
        }
        return sig.sign(key, options);
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/jwt/encrypt.js



class EncryptJWT extends (/* unused pure expression or super */ null && (ProduceJWT)) {
    setProtectedHeader(protectedHeader) {
        if (this._protectedHeader) {
            throw new TypeError('setProtectedHeader can only be called once');
        }
        this._protectedHeader = protectedHeader;
        return this;
    }
    setKeyManagementParameters(parameters) {
        if (this._keyManagementParameters) {
            throw new TypeError('setKeyManagementParameters can only be called once');
        }
        this._keyManagementParameters = parameters;
        return this;
    }
    setContentEncryptionKey(cek) {
        if (this._cek) {
            throw new TypeError('setContentEncryptionKey can only be called once');
        }
        this._cek = cek;
        return this;
    }
    setInitializationVector(iv) {
        if (this._iv) {
            throw new TypeError('setInitializationVector can only be called once');
        }
        this._iv = iv;
        return this;
    }
    replicateIssuerAsHeader() {
        this._replicateIssuerAsHeader = true;
        return this;
    }
    replicateSubjectAsHeader() {
        this._replicateSubjectAsHeader = true;
        return this;
    }
    replicateAudienceAsHeader() {
        this._replicateAudienceAsHeader = true;
        return this;
    }
    async encrypt(key, options) {
        const enc = new CompactEncrypt(encoder.encode(JSON.stringify(this._payload)));
        if (this._replicateIssuerAsHeader) {
            this._protectedHeader = { ...this._protectedHeader, iss: this._payload.iss };
        }
        if (this._replicateSubjectAsHeader) {
            this._protectedHeader = { ...this._protectedHeader, sub: this._payload.sub };
        }
        if (this._replicateAudienceAsHeader) {
            this._protectedHeader = { ...this._protectedHeader, aud: this._payload.aud };
        }
        enc.setProtectedHeader(this._protectedHeader);
        if (this._iv) {
            enc.setInitializationVector(this._iv);
        }
        if (this._cek) {
            enc.setContentEncryptionKey(this._cek);
        }
        if (this._keyManagementParameters) {
            enc.setKeyManagementParameters(this._keyManagementParameters);
        }
        return enc.encrypt(key, options);
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/jwk/thumbprint.js





const check = (value, description) => {
    if (typeof value !== 'string' || !value) {
        throw new JWKInvalid(`${description} missing or invalid`);
    }
};
async function calculateJwkThumbprint(jwk, digestAlgorithm = 'sha256') {
    if (!isObject(jwk)) {
        throw new TypeError('JWK must be an object');
    }
    if (digestAlgorithm !== 'sha256' &&
        digestAlgorithm !== 'sha384' &&
        digestAlgorithm !== 'sha512') {
        throw new TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
    }
    let components;
    switch (jwk.kty) {
        case 'EC':
            check(jwk.crv, '"crv" (Curve) Parameter');
            check(jwk.x, '"x" (X Coordinate) Parameter');
            check(jwk.y, '"y" (Y Coordinate) Parameter');
            components = { crv: jwk.crv, kty: jwk.kty, x: jwk.x, y: jwk.y };
            break;
        case 'OKP':
            check(jwk.crv, '"crv" (Subtype of Key Pair) Parameter');
            check(jwk.x, '"x" (Public Key) Parameter');
            components = { crv: jwk.crv, kty: jwk.kty, x: jwk.x };
            break;
        case 'RSA':
            check(jwk.e, '"e" (Exponent) Parameter');
            check(jwk.n, '"n" (Modulus) Parameter');
            components = { e: jwk.e, kty: jwk.kty, n: jwk.n };
            break;
        case 'oct':
            check(jwk.k, '"k" (Key Value) Parameter');
            components = { k: jwk.k, kty: jwk.kty };
            break;
        default:
            throw new JOSENotSupported('"kty" (Key Type) Parameter missing or unsupported');
    }
    const data = encoder.encode(JSON.stringify(components));
    return base64url(await digest(digestAlgorithm, data));
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/jwk/embedded.js



async function EmbeddedJWK(protectedHeader, token) {
    const joseHeader = {
        ...protectedHeader,
        ...token.header,
    };
    if (!isObject(joseHeader.jwk)) {
        throw new JWSInvalid('"jwk" (JSON Web Key) Header Parameter must be a JSON object');
    }
    const key = await importJWK({ ...joseHeader.jwk, ext: true }, joseHeader.alg, true);
    if (key instanceof Uint8Array || key.type !== 'public') {
        throw new JWSInvalid('"jwk" (JSON Web Key) Header Parameter must be a public key');
    }
    return key;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/jwks/local.js



function getKtyFromAlg(alg) {
    switch (typeof alg === 'string' && alg.slice(0, 2)) {
        case 'RS':
        case 'PS':
            return 'RSA';
        case 'ES':
            return 'EC';
        case 'Ed':
            return 'OKP';
        default:
            throw new errors_JOSENotSupported('Unsupported "alg" value for a JSON Web Key Set');
    }
}
function isJWKSLike(jwks) {
    return (jwks &&
        typeof jwks === 'object' &&
        Array.isArray(jwks.keys) &&
        jwks.keys.every(isJWKLike));
}
function isJWKLike(key) {
    return is_object_isObject(key);
}
function clone(obj) {
    if (typeof structuredClone === 'function') {
        return structuredClone(obj);
    }
    return JSON.parse(JSON.stringify(obj));
}
class LocalJWKSet {
    constructor(jwks) {
        this._cached = new WeakMap();
        if (!isJWKSLike(jwks)) {
            throw new JWKSInvalid('JSON Web Key Set malformed');
        }
        this._jwks = clone(jwks);
    }
    async getKey(protectedHeader, token) {
        const { alg, kid } = { ...protectedHeader, ...token.header };
        const kty = getKtyFromAlg(alg);
        const candidates = this._jwks.keys.filter((jwk) => {
            let candidate = kty === jwk.kty;
            if (candidate && typeof kid === 'string') {
                candidate = kid === jwk.kid;
            }
            if (candidate && typeof jwk.alg === 'string') {
                candidate = alg === jwk.alg;
            }
            if (candidate && typeof jwk.use === 'string') {
                candidate = jwk.use === 'sig';
            }
            if (candidate && Array.isArray(jwk.key_ops)) {
                candidate = jwk.key_ops.includes('verify');
            }
            if (candidate && alg === 'EdDSA') {
                candidate = jwk.crv === 'Ed25519' || jwk.crv === 'Ed448';
            }
            if (candidate) {
                switch (alg) {
                    case 'ES256':
                        candidate = jwk.crv === 'P-256';
                        break;
                    case 'ES256K':
                        candidate = jwk.crv === 'secp256k1';
                        break;
                    case 'ES384':
                        candidate = jwk.crv === 'P-384';
                        break;
                    case 'ES512':
                        candidate = jwk.crv === 'P-521';
                        break;
                }
            }
            return candidate;
        });
        const { 0: jwk, length } = candidates;
        if (length === 0) {
            throw new JWKSNoMatchingKey();
        }
        else if (length !== 1) {
            throw new JWKSMultipleMatchingKeys();
        }
        const cached = this._cached.get(jwk) || this._cached.set(jwk, {}).get(jwk);
        if (cached[alg] === undefined) {
            const keyObject = await import_importJWK({ ...jwk, ext: true }, alg);
            if (keyObject instanceof Uint8Array || keyObject.type !== 'public') {
                throw new JWKSInvalid('JSON Web Key Set members must be public keys');
            }
            cached[alg] = keyObject;
        }
        return cached[alg];
    }
}
function createLocalJWKSet(jwks) {
    return LocalJWKSet.prototype.getKey.bind(new LocalJWKSet(jwks));
}

// EXTERNAL MODULE: external "http"
var external_http_ = __nccwpck_require__(685);
// EXTERNAL MODULE: external "https"
var external_https_ = __nccwpck_require__(687);
// EXTERNAL MODULE: external "events"
var external_events_ = __nccwpck_require__(361);
;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/fetch_jwks.js





const fetchJwks = async (url, timeout, options) => {
    let get;
    switch (url.protocol) {
        case 'https:':
            get = external_https_.get;
            break;
        case 'http:':
            get = external_http_.get;
            break;
        default:
            throw new TypeError('Unsupported URL protocol.');
    }
    const { agent, headers } = options;
    const req = get(url.href, {
        agent,
        timeout,
        headers,
    });
    const [response] = (await Promise.race([(0,external_events_.once)(req, 'response'), (0,external_events_.once)(req, 'timeout')]));
    if (!response) {
        req.destroy();
        throw new JWKSTimeout();
    }
    if (response.statusCode !== 200) {
        throw new JOSEError('Expected 200 OK from the JSON Web Key Set HTTP response');
    }
    const parts = [];
    for await (const part of response) {
        parts.push(part);
    }
    try {
        return JSON.parse(buffer_utils_decoder.decode(buffer_utils_concat(...parts)));
    }
    catch {
        throw new JOSEError('Failed to parse the JSON Web Key Set HTTP response as JSON');
    }
};
/* harmony default export */ const fetch_jwks = (fetchJwks);

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/jwks/remote.js




class RemoteJWKSet extends LocalJWKSet {
    constructor(url, options) {
        super({ keys: [] });
        this._jwks = undefined;
        if (!(url instanceof URL)) {
            throw new TypeError('url must be an instance of URL');
        }
        this._url = new URL(url.href);
        this._options = { agent: options === null || options === void 0 ? void 0 : options.agent, headers: options === null || options === void 0 ? void 0 : options.headers };
        this._timeoutDuration =
            typeof (options === null || options === void 0 ? void 0 : options.timeoutDuration) === 'number' ? options === null || options === void 0 ? void 0 : options.timeoutDuration : 5000;
        this._cooldownDuration =
            typeof (options === null || options === void 0 ? void 0 : options.cooldownDuration) === 'number' ? options === null || options === void 0 ? void 0 : options.cooldownDuration : 30000;
        this._cacheMaxAge = typeof (options === null || options === void 0 ? void 0 : options.cacheMaxAge) === 'number' ? options === null || options === void 0 ? void 0 : options.cacheMaxAge : 600000;
    }
    coolingDown() {
        return typeof this._jwksTimestamp === 'number'
            ? Date.now() < this._jwksTimestamp + this._cooldownDuration
            : false;
    }
    fresh() {
        return typeof this._jwksTimestamp === 'number'
            ? Date.now() < this._jwksTimestamp + this._cacheMaxAge
            : false;
    }
    async getKey(protectedHeader, token) {
        if (!this._jwks || !this.fresh()) {
            await this.reload();
        }
        try {
            return await super.getKey(protectedHeader, token);
        }
        catch (err) {
            if (err instanceof JWKSNoMatchingKey) {
                if (this.coolingDown() === false) {
                    await this.reload();
                    return super.getKey(protectedHeader, token);
                }
            }
            throw err;
        }
    }
    async reload() {
        if (this._pendingFetch && isCloudflareWorkers()) {
            return new Promise((resolve) => {
                const isDone = () => {
                    if (this._pendingFetch === undefined) {
                        resolve();
                    }
                    else {
                        setTimeout(isDone, 5);
                    }
                };
                isDone();
            });
        }
        if (!this._pendingFetch) {
            this._pendingFetch = fetch_jwks(this._url, this._timeoutDuration, this._options)
                .then((json) => {
                if (!isJWKSLike(json)) {
                    throw new JWKSInvalid('JSON Web Key Set malformed');
                }
                this._jwks = { keys: json.keys };
                this._jwksTimestamp = Date.now();
                this._pendingFetch = undefined;
            })
                .catch((err) => {
                this._pendingFetch = undefined;
                throw err;
            });
        }
        await this._pendingFetch;
    }
}
function createRemoteJWKSet(url, options) {
    return RemoteJWKSet.prototype.getKey.bind(new RemoteJWKSet(url, options));
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/jwt/unsecured.js





class UnsecuredJWT extends (/* unused pure expression or super */ null && (ProduceJWT)) {
    encode() {
        const header = base64url.encode(JSON.stringify({ alg: 'none' }));
        const payload = base64url.encode(JSON.stringify(this._payload));
        return `${header}.${payload}.`;
    }
    static decode(jwt, options) {
        if (typeof jwt !== 'string') {
            throw new JWTInvalid('Unsecured JWT must be a string');
        }
        const { 0: encodedHeader, 1: encodedPayload, 2: signature, length } = jwt.split('.');
        if (length !== 3 || signature !== '') {
            throw new JWTInvalid('Invalid Unsecured JWT');
        }
        let header;
        try {
            header = JSON.parse(decoder.decode(base64url.decode(encodedHeader)));
            if (header.alg !== 'none')
                throw new Error();
        }
        catch {
            throw new JWTInvalid('Invalid Unsecured JWT');
        }
        const payload = jwtPayload(header, base64url.decode(encodedPayload), options);
        return { payload, header };
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/util/base64url.js

const base64url_encode = encode;
const base64url_decode = decode;

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/util/decode_protected_header.js



function decodeProtectedHeader(token) {
    let protectedB64u;
    if (typeof token === 'string') {
        const parts = token.split('.');
        if (parts.length === 3 || parts.length === 5) {
            ;
            [protectedB64u] = parts;
        }
    }
    else if (typeof token === 'object' && token) {
        if ('protected' in token) {
            protectedB64u = token.protected;
        }
        else {
            throw new TypeError('Token does not contain a Protected Header');
        }
    }
    try {
        if (typeof protectedB64u !== 'string' || !protectedB64u) {
            throw new Error();
        }
        const result = JSON.parse(decoder.decode(base64url(protectedB64u)));
        if (!isObject(result)) {
            throw new Error();
        }
        return result;
    }
    catch {
        throw new TypeError('Invalid Token or Protected Header formatting');
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/util/decode_jwt.js




function decodeJwt(jwt) {
    if (typeof jwt !== 'string')
        throw new JWTInvalid('JWTs must use Compact JWS serialization, JWT must be a string');
    const { 1: payload, length } = jwt.split('.');
    if (length === 5)
        throw new JWTInvalid('Only JWTs using Compact JWS serialization can be decoded');
    if (length !== 3)
        throw new JWTInvalid('Invalid JWT');
    if (!payload)
        throw new JWTInvalid('JWTs must contain a payload');
    let decoded;
    try {
        decoded = base64url(payload);
    }
    catch {
        throw new JWTInvalid('Failed to parse the base64url encoded payload');
    }
    let result;
    try {
        result = JSON.parse(decoder.decode(decoded));
    }
    catch {
        throw new JWTInvalid('Failed to parse the decoded payload as JSON');
    }
    if (!isObject(result))
        throw new JWTInvalid('Invalid JWT Claims Set');
    return result;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/runtime/generate.js





const generate_generate = (0,external_util_.promisify)(external_crypto_namespaceObject.generateKeyPair);
async function generateSecret(alg, options) {
    let length;
    switch (alg) {
        case 'HS256':
        case 'HS384':
        case 'HS512':
        case 'A128CBC-HS256':
        case 'A192CBC-HS384':
        case 'A256CBC-HS512':
            length = parseInt(alg.slice(-3), 10);
            break;
        case 'A128KW':
        case 'A192KW':
        case 'A256KW':
        case 'A128GCMKW':
        case 'A192GCMKW':
        case 'A256GCMKW':
        case 'A128GCM':
        case 'A192GCM':
        case 'A256GCM':
            length = parseInt(alg.slice(1, 4), 10);
            break;
        default:
            throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
    }
    return createSecretKey(random(new Uint8Array(length >> 3)));
}
async function generate_generateKeyPair(alg, options) {
    var _a, _b;
    switch (alg) {
        case 'RS256':
        case 'RS384':
        case 'RS512':
        case 'PS256':
        case 'PS384':
        case 'PS512':
        case 'RSA-OAEP':
        case 'RSA-OAEP-256':
        case 'RSA-OAEP-384':
        case 'RSA-OAEP-512':
        case 'RSA1_5': {
            const modulusLength = (_a = options === null || options === void 0 ? void 0 : options.modulusLength) !== null && _a !== void 0 ? _a : 2048;
            if (typeof modulusLength !== 'number' || modulusLength < 2048) {
                throw new JOSENotSupported('Invalid or unsupported modulusLength option provided, 2048 bits or larger keys must be used');
            }
            const keypair = await generate_generate('rsa', {
                modulusLength,
                publicExponent: 0x10001,
            });
            setModulusLength(keypair.privateKey, modulusLength);
            setModulusLength(keypair.publicKey, modulusLength);
            return keypair;
        }
        case 'ES256':
            return generate_generate('ec', { namedCurve: 'P-256' });
        case 'ES256K':
            return generate_generate('ec', { namedCurve: 'secp256k1' });
        case 'ES384':
            return generate_generate('ec', { namedCurve: 'P-384' });
        case 'ES512':
            return generate_generate('ec', { namedCurve: 'P-521' });
        case 'EdDSA': {
            switch (options === null || options === void 0 ? void 0 : options.crv) {
                case undefined:
                case 'Ed25519':
                    return generate_generate('ed25519');
                case 'Ed448':
                    return generate_generate('ed448');
                default:
                    throw new JOSENotSupported('Invalid or unsupported crv option provided, supported values are Ed25519 and Ed448');
            }
        }
        case 'ECDH-ES':
        case 'ECDH-ES+A128KW':
        case 'ECDH-ES+A192KW':
        case 'ECDH-ES+A256KW':
            const crv = (_b = options === null || options === void 0 ? void 0 : options.crv) !== null && _b !== void 0 ? _b : 'P-256';
            switch (crv) {
                case undefined:
                case 'P-256':
                case 'P-384':
                case 'P-521':
                    return generate_generate('ec', { namedCurve: crv });
                case 'X25519':
                    return generate_generate('x25519');
                case 'X448':
                    return generate_generate('x448');
                default:
                    throw new JOSENotSupported('Invalid or unsupported crv option provided, supported values are P-256, P-384, P-521, X25519, and X448');
            }
        default:
            throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/key/generate_key_pair.js

async function generate_key_pair_generateKeyPair(alg, options) {
    return generate(alg, options);
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/key/generate_secret.js

async function generate_secret_generateSecret(alg, options) {
    return generate(alg, options);
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/node/esm/index.js






























;// CONCATENATED MODULE: ./src/token.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const ISSUER = 'https://token.actions.githubusercontent.com';
const AUDIENCE = process.env.AUDIENCE;
const GITHUB_JWKS_URL = 'https://token.actions.githubusercontent.com/.well-known/jwks';
function extractClaims(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const JWKS = createRemoteJWKSet(new URL(GITHUB_JWKS_URL));
        const { payload, protectedHeader } = yield jwtVerify(token, JWKS, {
            issuer: ISSUER,
            audience: AUDIENCE,
        });
        console.log(protectedHeader);
        return payload;
    });
}

;// CONCATENATED MODULE: ./src/index.ts
var src_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





function getInput() {
    return JSON.parse(external_fs_.readFileSync('payload.json').toString());
}
function handler() {
    return src_awaiter(this, void 0, void 0, function* () {
        const payload = getInput();
        const matchedPolicy = get(payload.action);
        const claims = yield extractClaims(payload.client_payload.token);
        const allowed = authorization_allowed(claims, matchedPolicy);
        if (!allowed) {
            core.setFailed('Not allowed to execute the requested workflow.');
        }
    });
}
;
handler();

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map