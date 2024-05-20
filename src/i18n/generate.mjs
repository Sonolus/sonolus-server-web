import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs'

const baseUrl = 'https://api-venus.sonolus.com'
const i18n = {
    meta: {
        name: '',
        title: '',
    },
    common: {
        separator: '',
        more: '',
        on: '',
        off: '',
        search: '',
        multiField: {
            selected: '',
            allSelected: '',
            selectAll: '',
            selectNone: '',
        },
    },
    clients: {
        customServer: {
            server: {
                info: { loading: '', error: '' },
            },
            room: {
                info: { loading: '', error: '' },
                list: { loading: '', error: '' },
                details: { loading: '', error: '' },
            },
            post: {
                info: { loading: '', error: '' },
                list: { loading: '', error: '' },
                details: { loading: '', error: '' },
            },
            playlist: {
                info: { loading: '', error: '' },
                list: { loading: '', error: '' },
                details: { loading: '', error: '' },
            },
            level: {
                info: { loading: '', error: '' },
                list: { loading: '', error: '' },
                details: { loading: '', error: '' },
            },
            replay: {
                info: { loading: '', error: '' },
                list: { loading: '', error: '' },
                details: { loading: '', error: '' },
            },
            skin: {
                info: { loading: '', error: '' },
                list: { loading: '', error: '' },
                details: { loading: '', error: '' },
            },
            background: {
                info: { loading: '', error: '' },
                list: { loading: '', error: '' },
                details: { loading: '', error: '' },
            },
            effect: {
                info: { loading: '', error: '' },
                list: { loading: '', error: '' },
                details: { loading: '', error: '' },
            },
            particle: {
                info: { loading: '', error: '' },
                list: { loading: '', error: '' },
                details: { loading: '', error: '' },
            },
            engine: {
                info: { loading: '', error: '' },
                list: { loading: '', error: '' },
                details: { loading: '', error: '' },
            },
        },
    },
    routes: {
        server: {
            home: {
                multiplayer: '',
                post: '',
                playlist: '',
                level: '',
                replay: '',
                skin: '',
                background: '',
                effect: '',
                particle: '',
                engine: '',
            },
            search: { title: '' },
            infos: {
                advanced: '',
                room: { title: '' },
                post: { title: '' },
                playlist: { title: '' },
                level: { title: '' },
                replay: { title: '' },
                skin: { title: '' },
                background: { title: '' },
                effect: { title: '' },
                particle: { title: '' },
                engine: { title: '' },
            },
            lists: {
                searchOption: '',
                room: { title: '' },
                post: { title: '' },
                playlist: { title: '' },
                level: { title: '' },
                replay: { title: '' },
                skin: { title: '' },
                background: { title: '' },
                effect: { title: '' },
                particle: { title: '' },
                engine: { title: '' },
            },
            details: {
                tags: { title: '' },
                description: { title: '' },
                playlist: {
                    levels: { title: '' },
                },
            },
        },
        jumpToPage: {
            title: '',
            page: {
                placeholder: '',
            },
            jump: '',
        },
    },
}

const locales = readdirSync('./src/i18n').filter((name) =>
    statSync(`./src/i18n/${name}`).isDirectory(),
)

const localizations = Object.fromEntries(
    await Promise.all(
        locales.map((locale) =>
            fetch(`${baseUrl}/localizations/${locale}.json`)
                .then((response) => response.json())
                .then((data) => [locale, data]),
        ),
    ),
)

for (const locale of locales) {
    const localization = localizations[locale]

    const texts = Object.fromEntries(
        localization
            .filter((entry) => entry.key.startsWith('Texts.'))
            .map((entry) => [entry.key.substring(6), entry.value]),
    )

    writeFileSync(
        `./src/i18n/generated-${locale}.ts`,
        [
            `const web = ${JSON.stringify(
                JSON.parse(readFileSync(`./src/i18n/${locale}/web.json`).toString()),
                null,
                4,
            )} as const`,
            'const app = {',
            ...walk(localization),
            '} as const',
            `const texts = ${JSON.stringify(texts, null, 4)} as const`,
            '',
            'export const i18n = {',
            '    ...web,',
            '    ...app,',
            '    texts,',
            '}',
            'export type I18n = typeof i18n',
        ].join('\n'),
    )
}

function walk(localization, obj = i18n, parentPath = '', level = 1, lines = []) {
    const indent = '    '.repeat(level)

    for (const key in obj) {
        const value = obj[key]
        const path = (parentPath ? `${parentPath}.` : '') + capitalize(key)

        if (typeof value === 'object') {
            lines.push(`${indent}${key}: {`)
            walk(localization, value, path, level + 1, lines)
            lines.push(`${indent}},`)
            continue
        }

        const textEN = localizations['en'].find((entry) => entry.key === path).value
        const text = localization.find((entry) => entry.key === path)?.value || textEN
        const argumentCount = getArgumentCount(textEN)
        lines.push(`${indent}${key}: ${getValue(text, argumentCount)},`)
    }

    return lines
}

function capitalize(text) {
    return text[0].toUpperCase() + text.substring(1)
}

function getArgumentCount(text) {
    for (let i = 0; ; i++) {
        if (!text.includes(`{${i}}`)) return i
    }
}

function getValue(text, argumentCount) {
    if (!argumentCount) return JSON.stringify(text)

    const range = [...new Array(argumentCount).keys()]
    return `(${range.map((i) => `a${i}: string`).join(', ')}) => ${JSON.stringify(text)}${range
        .map((i) => `.replace('{${i}}', a${i})`)
        .join('')}`
}
