import React from "react";

const CommentForm = ({ inputData, onChange, onSubmit, submitting }) => (
  <form onSubmit={onSubmit}>
    <textarea
      value={inputData}
      onChange={onChange}
      placeholder="Add a comment..."
      className="input w-full p-2 bg-gray-200 border-none rounded"
      rows={3}
    />
    <button
      type="submit"
      disabled={!inputData.trim() || submitting}
      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
    >
      {submitting ? "Submitting..." : "Submit"}
    </button>
  </form>
);

export default CommentForm;
