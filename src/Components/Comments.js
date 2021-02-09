import { Button, Comment, Form, Header, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const Comments = ({ id = 0, type }) => {
  const [comments, setComments] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getComments();
  }, []);

  const getComments = () => {
    let request = {
      base_url: "https://react-yazi-yorum.herokuapp.com",
      endpoint: "",
    };

    switch (type) {
      case "POST_COMMENTS":
        request.endpoint = `/posts/${id}/comments`;
        break;
      case "LATEST_COMMENTS":
        request.endpoint = "/posts/latest-comments";
        break;
    }

    axios
      .get(request.base_url + request.endpoint)
      .then(({ data }) => setComments(data))
      .catch((err) => alert(err))
      .finally(() => setIsLoading(false));
  };

  const sendComment = () => {
    axios
      .post(`https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`, {
        display_name: commentInputs.name,
        body: commentInputs.content,
      })
      .catch((err) => alert(err))
      .finally(() => {
        getComments();
      });
  };

  const deleteComment = (comment_id) => {
    axios
      .delete(
        `https://react-yazi-yorum.herokuapp.com/posts/${id}/comments/${comment_id}`
      )
      .catch((err) => alert(err))
      .finally(() => getComments());
  };

  return (
    <Segment loading={isLoading} style={{ marginBottom: 500 }}>
      <Comment.Group style={{ margin: "auto" }}>
        <Header as="h3" dividing>
          {type === "LATEST_COMMENTS" && "Son "}Yorumlar
        </Header>

        {comments.map((comment) => (
          <Comment key={comment.id}>
            <Comment.Avatar
              src={
                "https://react.semantic-ui.com/images/avatar/small/jenny.jpg"
              }
            />
            <Comment.Content>
              <Comment.Author as="a">{comment.display_name}</Comment.Author>
              <Comment.Metadata>
                <div>{moment(comment.created_at).fromNow()}</div>
              </Comment.Metadata>
              <Comment.Text>{comment.body}</Comment.Text>
              {type === "POST_COMMENTS" && (
                <Comment.Actions>
                  <Button
                    circular
                    icon="trash"
                    onClick={() => deleteComment(comment.id)}
                  />
                </Comment.Actions>
              )}
            </Comment.Content>
          </Comment>
        ))}

        {type === "POST_COMMENTS" && (
          <Form reply>
            <Form.Input
              value={commentInputs.name}
              id="name"
              onChange={(e) =>
                setCommentInputs({
                  ...commentInputs,
                  [e.target.id]: e.target.value,
                })
              }
            />
            <Form.TextArea
              style={{ height: 80 }}
              value={commentInputs.content}
              id="content"
              onChange={(e) =>
                setCommentInputs({
                  ...commentInputs,
                  [e.target.id]: e.target.value,
                })
              }
            />
            <Button
              content="Yorum Yap"
              labelPosition="left"
              icon="edit"
              primary
              onClick={() => sendComment()}
            />
          </Form>
        )}
      </Comment.Group>
    </Segment>
  );
};

export default Comments;
