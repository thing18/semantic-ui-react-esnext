
const hasDocument = typeof document === 'object' && document !== null;
const hasWindow = typeof window === 'object' && window !== null && window.self === window;

const isBrowser = () => isBrowser.override != null ? isBrowser.override : hasDocument && hasWindow;

isBrowser.override = null;

export { isBrowser };
