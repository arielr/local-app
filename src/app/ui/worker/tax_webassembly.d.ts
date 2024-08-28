/* tslint:disable */
/* eslint-disable */
/**
* @param {File} file
* @returns {Promise<ArrayBuffer>}
*/
export function read_file_as_array_buffer(file: File): Promise<ArrayBuffer>;
/**
* @param {Uint8Array} csv_data
* @param {number} chunk_size
* @returns {number}
*/
export function split_csv(csv_data: Uint8Array, chunk_size: number): number;
/**
* @param {number} income
* @returns {number}
*/
export function calculate_tax(income: number): number;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly read_file_as_array_buffer: (a: number) => number;
  readonly split_csv: (a: number, b: number, c: number) => number;
  readonly calculate_tax: (a: number) => number;
  readonly __wbindgen_export_0: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h6eb6ee2061272fcc: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__h8ca1f537275f6509: (a: number, b: number, c: number, d: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
