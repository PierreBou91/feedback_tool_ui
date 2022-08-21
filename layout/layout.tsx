import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "styles/Layout.module.css";

type Props = {
  children: React.ReactNode;
};

interface NavigationItem {
  id: string;
  title: string;
  href: string;
  target?: string;
  rel?: string;
}

const placeholder: NavigationItem[] = [
  {
    id: "493476d7-366a-4ca8-98a1-26e4ca2e7c41",
    title: "Feedbacks",
    href: "/",
  },
  {
    id: "6aef6bcb-0207-49c9-9cb2-568ac52d9a44",
    title: "Companies",
    href: "/companies",
  },
  {
    id: "a2cb551e-2962-44c6-8750-422c070de9c2",
    title: "Users",
    href: "/users",
  },
];

const Layout = (props: Props) => {
  const navigation = useQuery(["navigation"], async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/navigation"
    );
    return response.json();
  });

  return (
    <>
      <Head>
        <title>Customer Feedback</title>
        <meta name="description" content="Proprietary app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={`${styles.header} container`}>
          <nav className={`${styles.topNav}`}>
            {navigation.status === "loading" ? (
              placeholder.map((item) => {
                return (
                  <Link href={item.href} key={item.id}>
                    <a target={item.target} rel={item.rel}>
                      {item.title}
                    </a>
                  </Link>
                );
              })
            ) : navigation.status === "error" ? ( // Maybe find a better way to handle errors
              <div>Error...</div>
            ) : navigation.status === "success" ? (
              navigation.data.map((item: NavigationItem) => {
                return (
                  <Link key={item.id} href={item.href}>
                    <a target={item.target} rel={item.rel}>
                      {item.title}
                    </a>
                  </Link>
                );
              })
            ) : null}
          </nav>
        </div>
        {props.children}
      </main>
    </>
  );
};

export default Layout;
