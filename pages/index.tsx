import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import styles from "styles/Home.module.css";
import { Feedback } from "types/types";

const Home: NextPage = () => {
  const skip = useRef(0);
  const take = useRef(10);

  const feedbackCount = useQuery(["feedbackCount"], async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/feedbacks/count"
    );
    const data = await response.json();
    return data;
  });

  const pagesArray = () => {
    let pages: number[] = [];
    for (let i = 1; i <= feedbackCount.data / take.current; i++) {
      pages.push(i);
    }
    return pages;
  };

  const feedbacks = useQuery(["feedbacks"], async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        "/feedbacks?take=" +
        take.current +
        "&skip=" +
        skip.current
    );
    const data = await response.json();
    return data;
  });
  const router = useRouter();

  const pageChange = (e: React.MouseEvent<HTMLElement>) => {
    const page = e.target as HTMLInputElement;
    if (page.textContent !== null) {
      skip.current = take.current * (parseInt(page.textContent) - 1);
      feedbacks.refetch();
    }
  };

  return (
    <div className="container">
      {feedbacks.status === "success" &&
        feedbacks.data.map((feedback: Feedback) => (
          <div key={feedback.id} className={styles.feedback}>
            <Link href={router.pathname + "feedbacks/" + feedback.id}>
              <a>
                <h3>{feedback.title}</h3>
                {/* <p>{feedback.createdAt + "-" + feedback.company.name}</p> */}
                {/* <p>{feedback.description}</p> */}
              </a>
            </Link>
          </div>
        ))}
      <div>
        {feedbackCount.status === "success" &&
          pagesArray().map((page: number) => (
            <button key={page} onClick={pageChange}>
              {page}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Home;
