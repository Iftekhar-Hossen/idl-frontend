import '../styles/globals.css'

import Layout from "@/components/layout"
import localFont from 'next/font/local'
import { Roboto } from "next/font/google"
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
})
const saolDisplay = localFont({
  src: [
    {
      path: '../public/fonts/SaolDisplay/SaolDisplay-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/SaolDisplay/SaolDisplay-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/fonts/SaolDisplay/SaolDisplay-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/SaolDisplay/SaolDisplay-SemiboldItalic.ttf',
      weight: '600',
      style: 'italic',
    },

  ],
  variable: "--font-saol"
})

export default function App({ Component, pageProps }) {
  return (
      <Layout >
        <main className={`${saolDisplay.variable} ${roboto.variable}`}> <Component  {...pageProps} /></main>
      </Layout>

  );
}
