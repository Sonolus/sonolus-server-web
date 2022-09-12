import axios from 'axios'
import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs'

const baseURL = 'https://api-venus.sonolus.com'
const i18n = {
    meta: {
        name: '',
        title: '',
    },
    common: {
        loading: '',
        on: '',
        off: '',
        cancel: '',
        search: '',
        more: '',
    },
    clients: {
        customServer: {
            serverInfo: {
                loading: '',
                error: '',
            },
            level: {
                list: {
                    loading: '',
                    error: '',
                },
                details: {
                    loading: '',
                    error: '',
                },
            },
            skin: {
                list: {
                    loading: '',
                    error: '',
                },
                details: {
                    loading: '',
                    error: '',
                },
            },
            background: {
                list: {
                    loading: '',
                    error: '',
                },
                details: {
                    loading: '',
                    error: '',
                },
            },
            effect: {
                list: {
                    loading: '',
                    error: '',
                },
                details: {
                    loading: '',
                    error: '',
                },
            },
            particle: {
                list: {
                    loading: '',
                    error: '',
                },
                details: {
                    loading: '',
                    error: '',
                },
            },
            engine: {
                list: {
                    loading: '',
                    error: '',
                },
                details: {
                    loading: '',
                    error: '',
                },
            },
        },
    },
    routes: {
        jumpToPage: {
            title: '',
            page: '',
            pagePlaceholder: '',
            jump: '',
        },
        server: {
            home: {
                levels: '',
                skins: '',
                backgrounds: '',
                effects: '',
                particles: '',
                engines: '',
            },
            search: {
                title: '',
            },
            itemDetails: {
                description: {
                    title: '',
                },
                recommended: {
                    title: '',
                },
            },
            levelList: {
                title: '',
            },
            skinList: {
                title: '',
            },
            backgroundList: {
                title: '',
            },
            effectList: {
                title: '',
            },
            particleList: {
                title: '',
            },
            engineList: {
                title: '',
            },
        },
    },
}

const locales = readdirSync('./src/i18n').filter((name) =>
    statSync(`./src/i18n/${name}`).isDirectory()
)

const localizations = Object.fromEntries(
    // @ts-ignore
    await Promise.all(
        locales.map((locale) =>
            axios
                .get(`/localizations/${locale}.json`, { baseURL })
                .then((response) => [locale, response.data])
        )
    )
)

for (const locale of locales) {
    const localization = localizations[locale]

    const getTexts = (type) =>
        JSON.stringify(collect(localization, `Texts.${type}.`))

    writeFileSync(
        `./src/i18n/generated-${locale}.ts`,
        [
            `const web = ${readFileSync(
                `./src/i18n/${locale}/web.json`
            )} as const`,
            'const app = {',
            ...walk(localization),
            '} as const',
            `const names = ${getTexts('Name')} as Record<string, string>`,
            `const values = ${getTexts('Value')} as Record<string, string>`,
            `const placeholders = ${getTexts(
                'Placeholder'
            )} as Record<string, string>`,
            '',
            'export const i18n = {',
            '    ...web,',
            '    ...app,',
            '    getName: (a0: string) => names[a0] || a0,',
            '    getValue: (a0: string) => values[a0] || a0,',
            '    getPlaceholder: (a0: string) => placeholders[a0] || a0,',
            '}',
            'export type I18n = typeof i18n',
        ].join('\n')
    )
}

function collect(localization, prefix) {
    return Object.fromEntries(
        localization
            .filter((entry) => entry.key.startsWith(prefix))
            .map((entry) => [entry.key.substring(prefix.length), entry.value])
    )
}

function walk(
    localization,
    obj = i18n,
    parentPath = '',
    level = 1,
    lines = []
) {
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

        const textEN = localizations['en'].find(
            (entry) => entry.key === path
        ).value
        const text =
            localization.find((entry) => entry.key === path)?.value || textEN
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
    return `(${range
        .map((i) => `a${i}: string`)
        .join(', ')}) => ${JSON.stringify(text)}${range.map(
        (i) => `.replace('{${i}}', a${i})`
    )}`
}
