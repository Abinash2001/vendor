import React from "react";
import Link from "next/link";

export default function Pagination({
  page,
  //   prevPage,
  //   pageNumber,
  //   nextPage,
  totalPages,
}) {
  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;

  const pageNumber = [];
  const offsetNumber = 3;
  for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    if (i > 0 && i <= totalPages) {
      pageNumber.push(i);
    }
  }
  return (
    <>
      <div className="flex justify-center border-t-2 border-gray-200 p-2">
        <div className="flex w-1/2 justify-between">
          {
            //pagination start here
            page === 1 ? (
              <div className="opacity-50 cursor-not-allowed p-2">Previous</div>
            ) : (
              <Link href={`?page=${prevPage}`}>
                <div className="cursor-pointer p-2">Previous</div>
              </Link>
            )
          }
          <div className="flex gap-2">
            {pageNumber.map((number) => (
              <Link key={number} href={`?page=${number}`}>
                <div
                  className={`cursor-pointer ${
                    page === number ? "bg-gray-200 p-2 rounded" : "p-2"
                  }`}
                >
                  {number}
                </div>
              </Link>
            ))}
          </div>
          {
            page === totalPages ? (
              <div className="opacity-50 cursor-not-allowed p-2">Next</div>
            ) : (
              <Link href={`?page=${nextPage}`}>
                <div className="cursor-pointer p-2">Next</div>
              </Link>
            )
            //pagination end here
          }
        </div>
      </div>
    </>
  );
}
