import Document, { Head, Html, Main, NextScript } from 'next/document'

class CustomDocument extends Document {
  render(): JSX.Element {
    console.log('Document is Running')
    return (
      <Html lang="ko">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument
