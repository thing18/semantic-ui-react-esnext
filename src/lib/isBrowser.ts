
const hasDocument = typeof document === 'object' && document !== null;
const hasWindow = typeof window === 'object' && window !== null && window.self === window;

interface IsBrowser {
    (): boolean;
    override: any;
}

const isBrowser: IsBrowser = () => isBrowser.override != null
    ? isBrowser.override
    : hasDocument && hasWindow;

isBrowser.override = null;

export { isBrowser };
