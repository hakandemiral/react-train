import { useEffect, useState } from "react";
import { List, Segment, Button } from "semantic-ui-react";
import moment from "moment";
import axios from "axios";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://react-yazi-yorum.herokuapp.com/posts")
      .then(({ data }) => {
        setPosts(data);
      })
      .catch((err) => alert(err))
      .finally(() => {
        setIsLoading(false);
      })
  }, []);

  return (
    <>
      <Segment loading={isLoading} size="small" style={{ minHeight: 100 }}>
        <List divided relaxed>
          {posts.map((post) => (
              <List.Item key={post.id}>
                <List.Icon
                  name="chess queen"
                  size="large"
                  verticalAlign="middle"
                />
                <List.Content>
                  <Link to={`/posts/${post.id}`}>
                    <List.Header as="a">{post.title}</List.Header>
                    <List.Description as="a">
                      {moment(post.created_at).fromNow()}
                    </List.Description>
                  </Link>
                </List.Content>
              </List.Item>
            ))}
        </List>
      </Segment>
      <Link to="/posts/new">
        <Button>Yeni Post Ekle</Button>
      </Link>
    </>
  );
};

export default Posts;
