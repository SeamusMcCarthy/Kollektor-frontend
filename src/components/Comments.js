import React, { useState, useEffect, useContext } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import useHttpClient from "../shared/hooks/http-hook";
import AuthContext from "../shared/contexts/auth-context";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import { Typography } from "@mui/material";

const Comments = ({ commentsUrl, currentUserId, comments, entryId }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const [expanded, setExpanded] = React.useState(false);
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
          new Date(a.dateAdded).getTime() - new Date(b.dataAdded).getTime()
      );

  const addComment = async (text, parentId) => {
    try {
      const pId = parentId ? parentId : null;
      const responseData = await sendRequest(
        `http://localhost:5000/api/v1/comment/${entryId}`,
        "POST",
        JSON.stringify({
          body: text,
          parentId: pId,
          creator: auth.userId,
          dateAdded: new Date().toISOString(),
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setBackendComments([responseData.comment, ...backendComments]);
      setActiveComment(null);
    } catch (e) {}
  };

  const updateComment = async (text, commentId) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/v1/comment/${commentId}`,
        "PATCH",
        JSON.stringify({
          body: text,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment._id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    } catch (e) {}
  };

  const deleteComment = async (commentId) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/v1/comment/${commentId}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (e) {}

    const updatedBackendComments = backendComments.filter(
      (backendComment) => backendComment._id !== commentId
    );
    setBackendComments(updatedBackendComments);
  };

  useEffect(() => {
    setBackendComments(comments);
  }, [comments]);

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="comments">
      <div style={{ display: "flex" }}>
        <Typography variant="h5">Comments</Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {auth.userId && <div className="comment-form-title">Write comment</div>}
        {auth.userId && (
          <CommentForm submitLabel="Write" handleSubmit={addComment} />
        )}

        <div className="comments-container">
          {rootComments.map((rootComment) => (
            <Comment
              key={rootComment._id}
              comment={rootComment}
              replies={getReplies(rootComment._id)}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
              deleteComment={deleteComment}
              updateComment={updateComment}
              currentUserId={auth.userId}
              parentId={null}
              entryId={entryId}
            />
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default Comments;
