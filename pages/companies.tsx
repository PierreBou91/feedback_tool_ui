import { useQuery } from "@tanstack/react-query";
import PagePicker from "components/PagePicker";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import styles from "styles/Companies.module.css";
import { Company } from "types/types";

type Props = {};

const Companies: NextPage = (props: Props) => {
  const skip = useRef(0); // skip/take = the page number
  const take = useRef(10); // take = the number of items per page

  // total count of companies, usefull for pagination
  const companyCount = useQuery(["companyCount"], async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/companies/count"
    );
    return await response.json();
  });

  const companies = useQuery(["companies"], async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        "/companies?take=" +
        take.current +
        "&skip=" +
        skip.current
    );
    return await response.json();
  });
  const router = useRouter();

  // onClick of the page buttons
  const handlePageClick = (event: number) => {
    skip.current = take.current * (event - 1);
    companies.refetch();
  };

  return (
    <div className="container">
      {companies.status === "success" &&
        companies.data.map((company: Company) => (
          <div key={company.id} className={styles.company}>
            <Link href={router.pathname + "/" + company.id}>
              <a>
                <h3>{company.name}</h3>
                <p>{company.createdAt.toString()}</p>
              </a>
            </Link>
          </div>
        ))}
      <div>
        {companyCount.status === "success" &&
        companyCount.data / take.current > 1 ? (
          <PagePicker
            pages={companyCount.data / take.current}
            onClick={handlePageClick}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Companies;
