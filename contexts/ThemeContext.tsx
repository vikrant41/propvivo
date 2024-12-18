import { createContext, ReactElement, useEffect, useState } from "react";
import useStorage from "../lib/useStorage";

export const MyThemeContext = createContext({
  isDarkTheme: false,
  toggleThemeHandler: () => {},
});
const uStorage = useStorage();
interface ThemePropsInterface {
  children?: JSX.Element | Array<JSX.Element>;
}

export function MyThemeContextProvider(
  props: ThemePropsInterface
): ReactElement {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  useEffect(() => initialThemeHandler());

  function isLocalStorageEmpty(): boolean {
    return !uStorage.getItem("isDarkTheme");
  }

  function initialThemeHandler(): void {
    if (isLocalStorageEmpty()) {
      uStorage.setItem("isDarkTheme", `false`);
      setIsDarkTheme(false);
    } else {
      const isDarkTheme: boolean = JSON.parse(uStorage.getItem("isDarkTheme")!);
      isDarkTheme && document!.querySelector("html")!.classList.add("dark");
      setIsDarkTheme(() => {
        return isDarkTheme;
      });
    }
  }

  function toggleThemeHandler(): void {
    const isDarkTheme: boolean = JSON.parse(uStorage.getItem("isDarkTheme")!);
    setIsDarkTheme(!isDarkTheme);
    toggleDarkClassToBody();
    setValueToLocalStorage();
  }

  function toggleDarkClassToBody(): void {
    document!.querySelector("html")!.classList.toggle("dark");
  }

  function setValueToLocalStorage(): void {
    uStorage.setItem("isDarkTheme", `${!isDarkTheme}`);
  }

  return (
    <MyThemeContext.Provider value={{ isDarkTheme, toggleThemeHandler }}>
      {props.children}
    </MyThemeContext.Provider>
  );
}

export default MyThemeContextProvider;
