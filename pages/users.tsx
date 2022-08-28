import { useQuery } from "@tanstack/react-query";
import PagePicker from "components/PagePicker";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import styles from "styles/Users.module.css";

type Props = {};

const Users: NextPage = (props: Props) => {
  const skip = useRef(0); // skip/take = the page number
  const take = useRef(10); // take = the number of items per page

  // total count of users, usefull for pagination
  const userCount = useQuery(["userCount"], async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/users/count"
    );
    const data = await response.json();
    return data;
  });

  const users = useQuery(["users"], async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        "/users?take=" +
        take.current +
        "&skip=" +
        skip.current
    );
    return await response.json();
  });

  const router = useRouter(); // router for pathname in onClick of each user

  // onClick of the page buttons
  const handlePageClick = (event: number) => {
    skip.current = take.current * (event - 1);
    users.refetch();
  };

  return (
    <div className="container">
      {users.status === "success" &&
        users.data.map((user: any) => (
          <div key={user.id} className={styles.user}>
            <Link href={router.pathname + "/" + user.id}>
              <a>
                <h3>{user.name}</h3>
                <p>{user.createdAt}</p>
              </a>
            </Link>
          </div>
        ))}
      <div>
        {userCount.status === "success" && userCount.data / take.current > 1 ? (
          <PagePicker
            pages={userCount.data / take.current}
            onClick={handlePageClick}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Users;
