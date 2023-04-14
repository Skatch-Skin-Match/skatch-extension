import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  totalPages: any;
}

const Pagination = (props: PaginationProps) => {
  const { setCurrentPage, currentPage, totalPages } = props;

  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const pageNumberLimit = 3;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  useEffect(() => {
    pageNumberLimit + 1 === totalPages
      ? setmaxPageNumberLimit(totalPages)
      : setmaxPageNumberLimit(pageNumberLimit);
  }, [totalPages]);

  return (
    <>
      {totalPages > 1 ? (
        <nav aria-label="Page navigation example">
          <ul className="flex-center list-style-none gap-3">
            <li>
              <button
                className={
                  (currentPage === 1 ? "opacity-50 " : "opacity-100 ") +
                  "page-link relative block p-2 rounded-full border border-gray-400/40 bg-transparent outline-none transition-all duration-300 text-white hover:bg-blue-600 focus:shadow-none"
                }
                onClick={handlePrevbtn}
                disabled={currentPage === 1}
              >
                <FaChevronLeft />
              </button>
            </li>
            {minPageNumberLimit >= 1 ? <BsThreeDots className="text-md text-white" /> : ""}

            {pages.map((page) => {
              if (page < maxPageNumberLimit + 1 && page > minPageNumberLimit) {
                return (
                  <>
                    <li key={page}>
                      <button
                        className={
                          (currentPage === page
                            ? "bg-blue-600 "
                            : "bg-transparent border border-gray-400/40 ") +
                          "rounded-full text-base px-[9px] py-[2px] border-0 bg-transparent outline-none transition-all duration-300 text-white hover:bg-blue-600 focus:shadow-none"
                        }
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    </li>
                  </>
                );
              }
            })}

            {pages.length > maxPageNumberLimit ? (
              <BsThreeDots className="text-md text-white" />
            ) : (
              ""
            )}

            <li>
              <button
                className={
                  (currentPage === totalPages ? "opacity-50 " : "opacity-100 ") +
                  " relative block p-2 rounded-full border border-gray-400/40 bg-transparent outline-none transition-all duration-300 text-white hover:bg-blue-600 focus:shadow-none"
                }
                onClick={handleNextbtn}
                disabled={currentPage === totalPages}
              >
                <FaChevronRight />
              </button>
            </li>
          </ul>
        </nav>
      ) : (
        <></>
      )}
    </>
  );
};

export default Pagination;
