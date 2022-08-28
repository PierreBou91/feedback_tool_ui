type Props = {
  pages: number;
  onClick: any;
};

const PagePicker = (props: Props) => {
  // Convert a number to a list of 1 to the number of props.pages
  const pages = Array.from(Array(props.pages).keys());

  return (
    <>
      {pages.map((page) => (
        <button key={page + 1} onClick={(event) => props.onClick(page + 1)}>
          {page + 1}
        </button>
      ))}
    </>
  );
};

export default PagePicker;
