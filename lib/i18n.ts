export function localizeUrl(url: string, locale: string): string {
    if (locale == "en" || url.startsWith("http")) {
        return url;
    }
    return `/${locale}` + (url.startsWith("/") ? url : `/${url}`);
}

const knownLocales = {
    en: "en-US",
    es: "es-ES",
};

export function getCMSLocale(locale: string): string {
    return knownLocales[locale] || knownLocales.en;
}
