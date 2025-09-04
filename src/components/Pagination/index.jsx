

export default function Pagination({ totalTodos, perPage, pagination, currentPage,getPages }) {


  const pages = getPages(totalTodos, perPage, currentPage)

  return (
    <>
      {pages.map((el, idx) =>
        el === "..." ?
        <span key={idx}>...</span>:
        <button key={idx}
          style={{color: el === currentPage ? "white" : "gray",
            fontWeight: el === currentPage ? "bold" : "normal"
          }}
          onClick={() => pagination(el)}>{el}</button>
      )} <br />


    </>
  );

}
