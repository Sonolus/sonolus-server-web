export const digest = async (buffer: ArrayBuffer) =>
    [...new Uint8Array(await crypto.subtle.digest('SHA-1', buffer))]
        .map((x) => x.toString(16).padStart(2, '0'))
        .join('')
