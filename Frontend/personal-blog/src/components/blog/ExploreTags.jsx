import React, { use, useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance.js";

const ExploreTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axiosInstance.get("/blogs/tags");
        setTags(response.data);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchTags();
  });

  return <div>
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold mb-4">Explore Tags</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="list-disc pl-5 space-y-2">
          {tags.map((tag,index) => (
             <span key={index} className="bg-gray-100 text-sm px-3 py-1 rounded-full">
             {tag}
           </span>

           
          ))}
        </ul>
      )}
    </div>
  </div>;
};

export default ExploreTags;
