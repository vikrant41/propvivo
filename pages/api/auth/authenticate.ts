import type { NextApiRequest, NextApiResponse } from "next";
import UseAuthenticate from "../../../lib/auth";
// import logger from "../../../lib/logger";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { logIn, logOut } = UseAuthenticate();
    if (req.method.toUpperCase() == "POST") {
        const { email, password } = req.body;
        try {
            const result = await logIn(email, password, res);
            //await res.unstable_revalidate("/pages/components/shorttopnav");
            return res.status(200).json(result);
        } catch (error) {
            // logger.debug(error);
            return res.status(500).json({ error });
        }
    } else if (req.method.toUpperCase() == "HEAD") {
        logOut(res);
        return res.status(200).send({});
    } else {
        return res.status(403).send({});
    }
}
