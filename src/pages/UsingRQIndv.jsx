import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { getIndvApiData } from "../api/Api";

export const UsingRqIndv = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);

  const featchData = async () => {
    try {
      const res = await getIndvApiData(id);
      return res.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["posts"],
    queryFn: featchData,
  });

  if (isPending) return <h1>Loading......</h1>;
  if (error) return "An error has occored" + error.message;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full hover:shadow-xl transition-all duration-300">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
          Post ID: {data.id}
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-snug">
          {data.title}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">{data.body}</p>

        <button
          onClick={handleGoBack}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full shadow-md transition-colors duration-200"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};
