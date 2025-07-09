export default function formatSessionDuration(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    const pad = (n: number) => String(n).padStart(2, '0');

    return h > 0
        ? `${pad(h)}:${pad(m)}:${pad(s)}`
        : `${pad(m)}:${pad(s)}`;
}