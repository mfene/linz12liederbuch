import Link from "next/link";

export default function Layout({ children }: { children: JSX.Element }) {
  const links = [
    ["Live", "live"],
    ["Songlist", "songs"],
  ];
  const linkElems = links.map((link) => (
    <li key={link[1]} className="navigation-item">
      <Link href={`/${link[1]}`}>
        <a className="navigation-link">{link[0]}</a>
      </Link>
    </li>
  ));
  return (
    <div className="wrapper">
      <nav className="navigation">
        <div className="container">
          <Link href="/">
            <a className="navigation-link">
              <h1 className="title">Linz12 Liederbuch</h1>
            </a>
          </Link>
          <ul className="navigation-list float-right">{linkElems}</ul>
        </div>
      </nav>
      <main className="container">{children}</main>
    </div>
  );
}
