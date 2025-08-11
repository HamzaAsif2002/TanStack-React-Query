import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getApiData } from "../api/Api";
import { NavLink } from "react-router";
import { useState } from "react";

export const UsingRQ = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const fetchApi = async () => {
    try {
      const res = await getApiData(pageNumber);
      return res.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["posts", pageNumber],
    queryFn: fetchApi,
    placeholderData: keepPreviousData,
    // staleTime: 10000,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,
  });

  if (isPending) return <h1>Loading......</h1>;
  if (error) return "An error has occored" + error.message;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-gray-900">
        Using Tanstack/React Query
      </h1>

      <ul className="space-y-4 list-none text-gray-700">
        {Array.isArray(data) &&
          data.map(({ id, body, title }) => {
            return (
              <NavLink
                key={id}
                to={`/usingrq/${id}`}
                className="block bg-white p-4 rounded shadow hover:shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200"
              >
                <p className="font-medium text-lg mb-1 text-gray-900">#{id}</p>
                <p className="font-semibold text-xl mb-1">{title}</p>
                <p className="text-gray-600">{body}</p>
              </NavLink>
            );
          })}
      </ul>

      <div className="flex items-center justify-center space-x-6 my-6">
        <button
          disabled={pageNumber === 0}
          onClick={() => setPageNumber((prev) => prev - 3)}
          className={`px-4 py-2 rounded-md font-medium transition ${
            pageNumber === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          Prev
        </button>

        <p className="text-lg font-semibold">{pageNumber / 3 + 1}</p>

        <button
          onClick={() => setPageNumber((prev) => prev + 3)}
          className="px-4 py-2 rounded-md font-medium bg-blue-600 hover:bg-blue-700 text-white transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};
