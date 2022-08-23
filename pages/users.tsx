import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "styles/Users.module.css";

type Props = {};

const Users = (props: Props) => {
  const users = useQuery(["users"], async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/users/"
    );
    return await response.json();
  });
  const router = useRouter();

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
    </div>
  );
};

export default Users;
