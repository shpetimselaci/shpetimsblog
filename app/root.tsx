import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData
} from "remix";
import type { LinksFunction } from "remix";
import { H } from 'highlight.run';

import globalStylesUrl from "~/styles/global.css";
import darkStylesUrl from "~/styles/dark.css";
import { useEffect } from "react";
// https://remix.run/api/app#links
export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStylesUrl },
    {
      rel: "stylesheet",
      href: darkStylesUrl,
    }
  ];
};


type RootData = { HIGHLIGHT_ID?: string, NODE_ENV: string }
export function loader() {
  return {
    HIGHLIGHT_ID: process.env.HIGHLIGHT_ID,
    NODE_ENV: process.env.NODE_ENV
  }
}

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Please screenshot this and send it to me?
          </p>
        </div>
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title
}: {
  children: React.ReactNode;
  title?: string;
}) {
  let data = useLoaderData<RootData>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#232e53"/>
        <meta name="msapplication-TileColor" content="#232e53"/>
        <meta name="theme-color" content="#232e53"/>
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {data?.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  let data = useLoaderData<RootData>();

  useEffect(() => {
    H.init(data?.HIGHLIGHT_ID, {
      environment: data.NODE_ENV === 'development' ? 'development' : 'production',
      enableStrictPrivacy: false,
    });
  }, []);
  return (
    <div className="app">
      <header className="header">
        <div className="container header-content">
          <Link to="/" title="Remix" className="header-home-link">
            <Logo />
          </Link>
          <nav aria-label="Main navigation" className="header-nav">
            <ul>
              <li>
                <a href="https://standardresume.co/r/wgOdAuE_0xC_tqFT7dVTu" target="_blank" >Resume</a>
              </li>
              <li>
                <a href="#" aria-disabled>Posts</a>
              </li>
              
            </ul>
          </nav>
        </div>
      </header>
      <main className="main">
        {children}
      </main>
      <footer className="footer">
        <div className="container footer-content">
          <p>&copy; Shpëtim Selaci, built with <a href="https://remix.run" target="_blank">Remix</a>.</p>
        </div>
      </footer>
    </div>
  );
}

function Logo() {
  return (
    <h1>Shpëtim Selaci</h1>
  );
}
