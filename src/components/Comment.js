import CommentForm from "./CommentForm";
import Avatar from "@mui/material/Avatar";
import "./Item.css";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId,
  currentUserId,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment._id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment._id &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.dateAdded) > fiveMinutes;
  const canDelete =
    // currentUserId === comment.creator.id && replies.length === 0 && timePassed;
    currentUserId === comment.creator._id && replies.length === 0;
  const canReply = Boolean(currentUserId);
  // const canEdit = currentUserId === comment.creator.id && timePassed;
  const canEdit = currentUserId === comment.creator._id;
  console.log(
    "Just before ParentId check : " + comment.creator.id + " " + comment._id
  );
  console.log("Comment: ParentId = " + parentId + " " + comment._id);
  const replyId = parentId ? parentId : comment._id;
  console.log("replyid : " + replyId);
  const dateAdded = new Date(comment.dateAdded).toLocaleDateString();
  return (
    <div key={comment._id} className="comment">
      <div className="user-item__image">
        <Avatar
          src={`http://localhost:5000/${comment.creator.image}`}
          alt={comment.creator.name}
          sx={{ width: 60, height: 60 }}
        />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.creator.name}</div>
          <div>{dateAdded}</div>
        </div>
        {!isEditing && <div className="comment-text">{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment._id)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment._id, type: "replying" })
              }
            >
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment._id, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment._id)}
            >
              Delete
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment._id}
                replies={[]}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
