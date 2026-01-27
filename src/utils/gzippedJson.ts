export const isGzippedJson = async (buffer: ArrayBuffer) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!DecompressionStream) return true

    try {
        const blob = new Blob([buffer])
        const stream = new DecompressionStream('gzip')
        const response = new Response(blob.stream().pipeThrough(stream))
        await response.json()
        return true
    } catch {
        return false
    }
}
