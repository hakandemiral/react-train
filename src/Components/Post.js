import api from "../api";
import moment from "moment";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Header, Segment, Button } from "semantic-ui-react";
import { DeleteButton, PostForm, Comments } from "./";

const Post = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    api()
      .get(`/posts/${id}`)
      .then(({ data }) => {
        setPost(data);
        setIsLoading(false);
      })
      .catch((err) => alert(err));
  }, [isEditing, id]);

  const editingHandle = (value) => setIsEditing(value);

  return (
<>
<Segment loading={isLoading} size="small" style={{ minHeight: 100 }}>
      {isEditing ? (
        <PostForm
          initialValue={{ content: post.content, title: post.title }}
          editingHandle={editingHandle}
          postId={id}
          isNewPost={false}
        />
      ) : (
        <>
          <div>
            <Header>{post.title}</Header>
            <div>{post.content}</div>
            <div>{moment(post.created_at).fromNow()}</div>
          </div>
          <div style={{ marginTop: 20 }}>
            <Link to="/">
              <Button>Geri</Button>
            </Link>
            <DeleteButton id={post.id} />
            <Button onClick={() => editingHandle(true)} color="blue">
              Düzenle
            </Button>
          </div>
        </>
      )}
    </Segment>
    <Comments id={id} type="POST_COMMENTS"/>
</>
  );
};

export default Post;
