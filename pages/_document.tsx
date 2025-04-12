import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
// import { GA_TRACKING_ID } from "../lib/gtag";
import "regenerator-runtime/runtime";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return await Document.getInitialProps(ctx);
  }
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <title>
            Homeowners Association and Condo Management Company in Seattle |
            Community Association Management
          </title>
          <link rel="shortcut icon" href="./favicon.ico" />
          {/* <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} /> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
