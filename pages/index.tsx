import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import styles from "styles/Home.module.css";
import { Feedback } from "types/types";

const Home: NextPage = () => {
  const numberOfMoreAsked = useRef(0);

  const feedbacks = useQuery(["feedbacks"], async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/feedbacks"
    );
    return await response.json();
  });
  const router = useRouter();

  const handleMore = () => {
    numberOfMoreAsked.current++;
  };

  return (
    <div className="container">
      {feedbacks.status === "success" &&
        feedbacks.data.map((feedback: Feedback) => (
          <div key={feedback.id} className={styles.feedback}>
            <Link href={router.pathname + "feedbacks/" + feedback.id}>
              <a>
                <h3>{feedback.title}</h3>
                <p>{feedback.createdAt + "-" + feedback.company.name}</p>
                {/* <p>{feedback.description}</p> */}
              </a>
            </Link>
          </div>
        ))}
      <button onClick={handleMore}>More Plz</button>
    </div>
  );
};

export default Home;
