import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deletePost, getApiData, UpdatePost } from "../api/Api";
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

  // Delete Posts
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
      queryClient.setQueryData(["posts", pageNumber], (curElem) => {
        return curElem.filter((post) => post.id !== id);
      });
    },
  });

  //Update Posts
  const [inputData, setInputData] = useState({
    title: "",
    body: "",
    id: null,
  });

  const handleInputFields = (e) => {
    setInputData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateMutation = useMutation({
    mutationFn: (inputData) => UpdatePost(inputData),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["posts", pageNumber], (curElem) => {
        return curElem.map((curPost) =>
          curPost.id === variables.id ? data.data : curPost
        );
      });
      setInputData({
        title: "",
        body: "",
        id: null,
      });
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputData.id !== null) {
      updateMutation.mutate(inputData);
    } else {
      console.log("Add post:", inputData);
    }
  };

  const handleUpdateButton = (id, body, title) => {
    setInputData({ title, body, id });
  };

  //handle error and loading
  if (isPending) return <h1>Loading......</h1>;
  if (error) return "An error has occored" + error.message;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-gray-900">
        Using Tanstack/React Query
      </h1>

      {/* input Field */}
      <form
        onSubmit={handleFormSubmit}
        className="max-w-4xl mx-auto flex items-center gap-4 bg-white p-4 rounded-lg shadow-md mb-4 "
      >
        <input
          type="text"
          placeholder="Title..."
          value={inputData.title}
          name="title"
          onChange={handleInputFields}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="text"
          placeholder="Body..."
          value={inputData.body}
          name="body"
          onChange={handleInputFields}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition"
        >
          Add
        </button>
      </form>

      {/* main */}
      <ul className="space-y-4 list-none text-gray-700">
        {Array.isArray(data) &&
          data.map(({ id, body, title }) => {
            return (
              <div
                key={id}
                className="block bg-white p-4 rounded shadow hover:shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200"
              >
                <NavLink to={`/usingrq/${id}`}>
                  <p className="font-medium text-lg mb-1 text-gray-900">
                    #{id}
                  </p>
                  <p className="font-semibold text-xl mb-1">{title}</p>
                  <p className="text-gray-600">{body}</p>
                </NavLink>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white mt-4 px-4 py-2 rounded"
                  onClick={() => deleteMutation.mutate(id)}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white mt-4 mx-3 px-4 py-2 rounded"
                  onClick={() => handleUpdateButton(id, body, title)}
                >
                  Update
                </button>
              </div>
            );
          })}
      </ul>

      {/* Pagination  */}
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
