import React from "react";

const BoardContent = ({ content }) => {
  return (
    <div>
      <div className="min-h-[60vh] bg-white p-4 rounded-3xl shadow-md">
        {content ? (
          <p
            style={{ whiteSpace: "pre-wrap" }}
            className="size-font-xs text-gray-700"
          >
            {content}
          </p>
        ) : (
          <p className="text-gray-400 text-center">내용이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default BoardContent;
