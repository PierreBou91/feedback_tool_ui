import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import styles from "styles/Home.module.css";
import { Feedback } from "types/types";

const Home: NextPage = () => {
  const skip = useRef(0); // skip/take = the page number
  const take = useRef(10); // take = the number of items per page

  // total count of feedkbacks, usefull for pagination
  const feedbackCount = useQuery(["feedbackCount"], async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/feedbacks/count"
    );
    const data = await response.json();
    return data;
  });

  // feedbacks fetch for the current page
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

  const router = useRouter(); // router for pathname in onClick of each feedback

  // returns an array with the number of pages. This is used for the map function in the pagination
  // there might be a better way to do this
  const pagesArray = () => {
    let pages: number[] = [];
    for (let i = 1; i <= feedbackCount.data / take.current; i++) {
      pages.push(i);
    }
    return pages;
  };

  // onClick of the page buttons
  const handlePageClick = (e: React.MouseEvent<HTMLElement>) => {
    const page = e.target as HTMLInputElement;
    if (page.textContent !== null) {
      skip.current = take.current * (parseInt(page.textContent) - 1);
      feedbacks.refetch();
    } else {
      throw new Error(
        "page.textContent is null, you might have changed the html button to another element, you need to explore e.target to get the page number"
      );
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
                <p>{feedback.status}</p>
              </a>
            </Link>
          </div>
        ))}
      <div>
        {feedbackCount.status === "success" &&
          pagesArray().map((page: number) => (
            <button key={page} onClick={handlePageClick}>
              {page}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Home;
