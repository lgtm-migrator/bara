/**
 * Create filesystem stream at specific directory path.
 * @param {string} dir Which directory to observe the events.
 * @return {BaraStream}
 */
export declare const streamFs2: (dir: string, onEvent?: ((payload: any) => void) | undefined) => void;
export default streamFs2;
