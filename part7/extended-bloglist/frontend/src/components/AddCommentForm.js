import React, { useState } from "react";

const AddCommentForm = ({ createComment, blogId }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const addComment = async (event) => {
    event.preventDefault();
    try {
      createComment({
        blogId: blogId,
        comment: comment
      });
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <div className="addCommentFormDiv">
      <form onSubmit={addComment}>
        <div>
          Comment:
          <input
            id="Comment"
            type="text"
            value={comment}
            name="Comment"
            onChange={handleCommentChange}
          />
        </div>
        <button id="create-button" type="submit">
          add comment
        </button>
      </form>
    </div>
  );
};

export default AddCommentForm;
