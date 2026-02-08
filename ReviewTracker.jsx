import React, { useState } from "react";

const ReviewTracker = ({ pageName = "Page" }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  const submit = () => {
    if (rating === 0) return;
    setReviews([...reviews, { rating, comment }]);
    setRating(0);
    setComment("");
  };

  return (
    <div className="p-6 bg-gray-100 rounded">
      <h3 className="font-bold mb-2">Reviews – {pageName}</h3>

      <div className="flex gap-1 mb-2">
        {[1,2,3,4,5].map((n) => (
          <button
            key={n}
            onClick={() => setRating(n)}
            className={`px-2 ${
              rating >= n ? "bg-yellow-400" : "bg-gray-300"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border w-full p-2 mb-2"
      />

      <button
        onClick={submit}
        className="bg-blue-600 text-white px-3 py-1"
      >
        Submit
      </button>

      {reviews.map((r, i) => (
        <div key={i} className="mt-2 border-t">
          {"⭐".repeat(r.rating)} {r.comment}
        </div>
      ))}
    </div>
  );
};

export default ReviewTracker;
