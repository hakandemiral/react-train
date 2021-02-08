import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router-dom";

import { Button, Form, Message } from "semantic-ui-react";

const PostForm = ({ initialValue = {title:"", content:""}, editingHandle, postId, isNewPost = true }) => {
  const [post, setPost] = useState(initialValue);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [redirect, setRedirect] = useState("");

  const handlePost = (e) => {
    setPost({ ...post, [e.target.id]: e.target.value });
  };

  const editPost = () => {
    if (post.title === initialValue.title ||
      post.content === initialValue.content) {
        return false;
    }

    setIsLoading(true);
    axios
      .put(`https://react-yazi-yorum.herokuapp.com/posts/${postId}`, {
        title: post.title,
        content: post.content,
      })
      .then((res) => {
        setIsSuccess(true);
      })
      .catch((err) => {
        setIsSuccess(false);
        setErrMsg(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const newPost = () => {
    axios.post("https://react-yazi-yorum.herokuapp.com/postsd/",{
      title: post.title,
      content: post.content
    })
    .then(({data : { id }}) => {
      setIsSuccess(true);
      setRedirect(<Redirect to={`/posts/${id}`}/>);
    })
    .catch((err) => {
      console.log(err)
      setIsSuccess(false);
      setErrMsg(err.toString());
    })
  }

  return (
    <div>
      {redirect}
      <Form loading={isLoading} success={isSuccess} error={errMsg}>
        <Form.Field>
          <label htmlFor="title">Title</label>
          <input
            label="Başlık"
            id="title"
            value={post.title}
            onChange={(e) => handlePost(e)}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="content">İçerik</label>
          <textarea
            rows="10"
            label="İçerik"
            id="content"
            value={post.content}
            onChange={(e) => handlePost(e)}
          />
        </Form.Field>
        <Message
          success
          header="Başarılı"
          content="Başarıyla kaydedildi"
          onChange={(e) => handlePost(e)}
        />
        <Message error header="Hata" content={errMsg} />
        <Button onClick={() => {
          if(isNewPost){
            setRedirect(<Redirect to="/" />);
          }else{
            editingHandle(false)
            }
          }}>Geri</Button>
        <Button onClick={() => {
          if(isNewPost){ newPost() }
          else{ editPost()}
        }}>Kaydet</Button>
      </Form>
    </div>
  );
};

export default PostForm;
