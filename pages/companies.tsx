import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "styles/Companies.module.css";

type Props = {};

const Companies = (props: Props) => {
  const companies = useQuery(["companies"], async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/companies/"
    );
    return await response.json();
  });
  const router = useRouter();

  return (
    <div className="container">
      {companies.status === "success" &&
        companies.data.map((company: any) => (
          <div key={company.id} className={styles.company}>
            <Link href={router.pathname + "/" + company.id}>
              <a>
                <h3>{company.name}</h3>
                <p>{company.createdAt}</p>
              </a>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Companies;
