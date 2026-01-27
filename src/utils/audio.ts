export const getAudioInfo = (buffer: ArrayBuffer) =>
    new Promise<{ length: number } | undefined>((resolve) => {
        const blob = new Blob([buffer])
        const src = URL.createObjectURL(blob)

        const audio = new Audio(src)
        audio.onloadedmetadata = () => {
            URL.revokeObjectURL(src)
            resolve({
                length: audio.duration,
            })
        }
        audio.onerror = () => {
            URL.revokeObjectURL(src)
            resolve(undefined)
        }

        audio.src = src
    })
