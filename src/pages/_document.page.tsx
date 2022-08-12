import { ColorModeScript } from "@chakra-ui/react";
// eslint-disable-next-line @next/next/no-document-import-in-page
import NextDocument, { Head, Html, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/ZeroCompany.svg" />
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
