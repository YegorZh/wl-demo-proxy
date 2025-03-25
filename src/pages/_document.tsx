import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          src={`${process.env.NEXT_PUBLIC_UNIT_URL}/release/latest/components.js`}
          strategy="beforeInteractive"
        />
      </body>
    </Html>
  );
}
