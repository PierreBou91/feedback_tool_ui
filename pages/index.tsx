import { useQuery } from "@tanstack/react-query";
import PagePicker from "components/PagePicker";
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
    return await response.json();
  });

  const router = useRouter(); // router for pathname in onClick of each feedback

  const handlePageClick = (event: number) => {
    skip.current = take.current * (event - 1);
    feedbacks.refetch();
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
        {feedbackCount.status === "success" && (
          <PagePicker
            pages={feedbackCount.data / take.current}
            onClick={handlePageClick}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
