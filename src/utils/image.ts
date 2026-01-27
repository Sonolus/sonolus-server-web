export const getImageInfo = (buffer: ArrayBuffer) =>
    new Promise<{ width: number; height: number } | undefined>((resolve) => {
        const blob = new Blob([buffer])
        const src = URL.createObjectURL(blob)

        const img = new Image()
        img.onload = () => {
            URL.revokeObjectURL(src)
            resolve({
                width: img.naturalWidth,
                height: img.naturalHeight,
            })
        }
        img.onerror = () => {
            URL.revokeObjectURL(src)
            resolve(undefined)
        }

        img.src = src
    })
