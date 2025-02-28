# Sonolus Server Web

A lean and beautiful web SPA client for Sonolus servers, with multiple languages, server content showcase, and links to open content in Sonolus.

## Links

- [Sonolus Website](https://sonolus.com)
- [Sonolus Wiki](https://wiki.sonolus.com)

## Building

### Install Dependencies

```
npm install
```

### Generate I18n

```
npm generate-i18n
```

### Customize

- Edit `.env`
- Edit `public/favicon.ico`
- Edit `public/thumbnail.png`

### Build for Production

```
npm run build
```

## Deployment

Simply serve contents of `dist` under root of Sonolus server.

## `.env`

### `VITE_BASE_URL`

Must have trailing `/`.

### `VITE_WEB_AUTH`

Enable web auth with `VITE_WEB_AUTH=true`.

## Web Auth

To support web auth, server needs to implement the following endpoints:

### `POST /sonolus/web/authenticate/[hash]`

[Sonolus external authentication](https://wiki.sonolus.com/custom-server-specs/misc/external-authentication.html) endpoint.

### `POST /sonolus/web/authenticate`

Request body:

```json
{
    "key": "..."
}
```

Server should calculate SHA1 digest of key, and respond if the corresponding external authentication is found.

Response body:

```json
{
    "title": "User#1234",
    "session": "...",
    "expiration": ...
}
```
