const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul
        className="flex items-center justify-center gap-[12px]"
        style={{ listStyleType: "none" }}
      >
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`bg-black text-white text-[15px] md:text-[18px] text-center w-[38px] xl:w-[52px] py-[7px] md:py-[6px] xl:py-[13px] rounded-[10px] ${
              currentPage === number ? "active" : ""
            }`}
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
