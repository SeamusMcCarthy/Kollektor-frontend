import { useState, useEffect, useContext } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import {
  // getComments as getCommentsApi,
  // createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "./api";
import useHttpClient from "../shared/hooks/http-hook";
import AuthContext from "../shared/contexts/auth-context";

const Comments = ({ commentsUrl, currentUserId, comments, entryId }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );

  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          // new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          new Date(a.dateAdded).getTime() - new Date(b.dataAdded).getTime()
      );

  const addComment = async (text, parentId = null) => {
    console.log("Entry Id in comments = " + text);
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/v1/comment/${entryId}`,
        "POST",
        JSON.stringify({
          body: text,
          parentId,
          creator: auth.userId,
          dateAdded: new Date().toISOString(),
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setBackendComments([responseData, ...backendComments]);
      setActiveComment(null);
    } catch (e) {}
  };

  const updateComment = (text, commentId) => {
    updateCommentApi(text).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };

  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi().then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };

  useEffect(() => {
    // getCommentsApi().then((data) => {
    //   setBackendComments(data);
    // });
    setBackendComments(comments);
  }, [comments]);

  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-title">Write comment</div>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
            entryId={entryId}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
