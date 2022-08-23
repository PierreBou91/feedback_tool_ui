import { useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next/types";
import { UserComment } from "types/types";

type Props = {
  id: string;
};

const Feedback = (props: Props) => {
  const feedback = useQuery([props.id], async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/feedbacks/" + props.id
    );
    return await response.json();
  });

  const comments = useQuery([props.id, "comments"], async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/comments?feedbackId=" + props.id
    );
    return await response.json();
  });

  if (feedback.status === "success") {
    return (
      <div className="container">
        <h1>{feedback.data.title}</h1>
        <h2>{feedback.data.createdAt}</h2>
        <h2>{feedback.data.status}</h2>
        <p>{feedback.data.description}</p>
        <h3>Comments:</h3>
        {comments.status === "success" ? (
          <div>
            {comments.data.map((comment: UserComment) => (
              <div key={comment.id}>
                <h3>Author is {comment.author.name}</h3>
                <p>{comment.message}</p>
                {comment.attachmentLink !== null ? (
                  <img src={comment.attachmentLink} />
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
};

export default Feedback;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // id of the page has to be in getServerSideProps because it's a dynamic route and the router is undefined before hydration
  // check https://nextjs.org/docs/api-reference/next/router at the query: object definition for more info
  //
  // There probably is a more satisfying workaround by setting a loading state an the page should rerender after
  // the query parameter of the router is provided (post hydration)
  // see the last line of the Caveat section of this page: https://nextjs.org/docs/routing/dynamic-routes

  const id = context.query.id;

  return {
    props: {
      id: id,
    },
  };
};
