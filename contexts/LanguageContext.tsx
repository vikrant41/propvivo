import { createContext, ReactElement, useEffect, useState } from "react";
import useStorage from "../lib/useStorage";
// import { IntlProvider } from "react-intl";
import English from "../messages/en.json";
import Spanish from "../messages/es.json";

const MyLanguageContext = createContext({
  locale: "en",
  toggleLocaleHandler: (locale: string) => {},
});
const uStorage = useStorage();
interface LanguagePropsInterface {
  children?: JSX.Element | Array<JSX.Element>;
}

export function MyLanguageContextProvider(
  props: LanguagePropsInterface
): ReactElement {
  const [locale, setLocale] = useState("en");
  useEffect(() => initialLocaleHandler());
  const messages = locale === "en" ? English : Spanish;

  function isLocalStorageEmpty(): boolean {
    return !uStorage.getItem("locale");
  }

  function initialLocaleHandler(): void {
    if (isLocalStorageEmpty()) {
      uStorage.setItem("locale", "en");
      setLocale("en");
    } else {
      const locale: string = uStorage.getItem("locale");
      setLocale(locale);
    }
  }

  function toggleLocaleHandler(locale: string): void {
    setLocale(locale);
    setValueToLocalStorage(locale);
  }

  function setValueToLocalStorage(locale: string): void {
    uStorage.setItem("locale", locale);
  }

  return (
    <MyLanguageContext.Provider value={{ locale: locale, toggleLocaleHandler }}>
      {/* <IntlProvider messages={messages} locale={locale}> */}
        {props.children}
      {/* </IntlProvider> */}
    </MyLanguageContext.Provider>
  );
}

export default MyLanguageContext;
