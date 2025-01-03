export const getOpenInSonolusUrl = (fullPath: string) =>
    `https://open.sonolus.com/${window.location.host}${import.meta.env.BASE_URL}${fullPath.slice(1)}`
