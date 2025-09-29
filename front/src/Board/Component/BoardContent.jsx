import React from "react";

const BoardContent = ({ content }) => {
  return (
    <div>
      <div className="min-h-[60vh] bgWtoB p-4 rounded-xl shadow-md">
        {content ? (
          <p
            style={{ whiteSpace: "pre-wrap" }}
            className="text-gray-700 dark:text-gray-200"
          >
            {content}
          </p>
        ) : (
          <p className="text-gray-400 dark:text-gray-200 text-center">
            내용이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default BoardContent;
