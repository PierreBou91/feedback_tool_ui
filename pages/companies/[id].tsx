import { useQuery } from "@tanstack/react-query";

type Props = {
  id: string;
};

const Company = (props: Props) => {
  const company = useQuery([props.id], async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/companies/" + props.id
    );
    return await response.json();
  });

  if (company.status === "success") {
    return (
      <div className="container">
        <h1>{company.data.name}</h1>
        <h2>{company.data.createdAt}</h2>
      </div>
    );
  }
};

export default Company;

export async function getServerSideProps(context: any) {
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
}
