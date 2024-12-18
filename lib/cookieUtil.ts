// import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
// import logger from "./logger";

interface ICookieUtil {
    getCookie: (request: NextApiRequest, name: string) => string;
    addCookie: (response: NextApiResponse, name: string, value: string, options?: Record<string, unknown>) => void;
    removeCookie: (response: NextApiResponse, name: string) => void;
    parseCookie: (cookies: string, name: string) => string;
}
const CookieUtil = (): ICookieUtil => {
    const ttl: number = 30; // time to live in minutes
    const cookieOptions = {
        httpOnly: true,
        expires: (() => {
            return new Date(new Date().getTime() + ttl * 60 * 1000);
        })(),
        //maxAge: ttl * 60, // in seconds, not needed if expires is set
        path: "/",
        sameSite: "Strict",
        secure: process.env.NODE_ENV === "production",
    };

    const getCookie = (request: NextApiRequest, name: string): string => {
        return request.cookies.name;
    };

    const addCookie = (response: NextApiResponse, name: string, value: string, options: Record<string, any> = {}): void => {
        if (response) {
            const stringValue = typeof value === "object" ? `j:${JSON.stringify(value)}` : String(value);
            const base64Encoded = Buffer.from(stringValue, "utf-8").toString("base64");
            const hasOptions = typeof options !== "undefined" && Object.keys(options).length > 0;
            // TODO: closure doesn't regenerate in declaration, setting expiration date explicitly
            cookieOptions.expires = new Date(new Date().getTime() + ttl * 60 * 1000);

            // logger.debug("expires: %j, options: %j, default options: %j", cookieOptions.expires, options, cookieOptions);
            // response.setHeader("Set-Cookie", serialize(name, String(base64Encoded), hasOptions ? options : cookieOptions));
        }
    };

    const removeCookie = (response: NextApiResponse, name: string): void => {
        addCookie(response, name, "", {
            ...cookieOptions,
            expires: new Date(0), // expire cookie
            //maxAge: 0,
        });
    };

    const parseCookie = (cookies: string = "", name: string): string => {
        const parts = cookies.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    };

    return {
        getCookie,
        addCookie,
        removeCookie,
        parseCookie,
    };
};
export default CookieUtil;
