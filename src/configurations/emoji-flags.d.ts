declare module 'emoji-flags' {
    const flags: {
        name(countryName: string): { code: string; name: string; emoji: string } | undefined;
        data: Array<{ code: string; name: string; emoji: string }>;
    };
    export default flags;
}