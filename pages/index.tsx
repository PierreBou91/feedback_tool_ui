import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "styles/Home.module.css";

interface Feedback {
  id: string;
  companyId: string;
  company: Company;
  title: string;
  description: string;
  attachmentLink: string;
  isCritical: string;
  status: string;
  feedbackType: string;
  comments: string[];
  createdAt: string;
  updatedAt: string;
  closedAt: string;
}

interface Company {
  id: string;
  name: string;
  hubspotLink: string;
  notionLink: string;
  createdAt: string;
  updatedAt: string;
}

const Home: NextPage = () => {
  const feedbacks = useQuery(["feedbacks"], async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/feedbacks"
    );
    return await response.json();
  });
  const router = useRouter();

  return (
    <div className="container">
      {feedbacks.status === "success" &&
        feedbacks.data.map((feedback: Feedback) => (
          <div key={feedback.id} className={styles.feedback}>
            <Link href={router.pathname + "feedbacks/" + feedback.id}>
              <a>
                <h3>{feedback.title}</h3>
                <p>
                  {feedback.createdAt} - {feedback.company.name}
                </p>
                <p>{feedback.description}</p>
              </a>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Home;
