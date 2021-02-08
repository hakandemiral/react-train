import axios from "axios";
import { useState } from "react";
import { Button } from "semantic-ui-react";
import { FullModal } from "./";
import { Redirect } from "react-router-dom";

const DeleteButton = ({ id }) => {
  const [modal, setModal] = useState(false);
  const [redirect, setRedirect] = useState("");

  const deletePost = () => {
    axios
      .delete(`https://react-yazi-yorum.herokuapp.com/posts/${id}`)
      .then((res) => {
        handleModal(false);
        setRedirect(<Redirect to="/" />);
      })
      .catch((err) => alert(`Silinemedi: ${err}`));
  };

  const handleModal = (isOpen) => {
    setModal(isOpen);
  };

  return (
    <>
      {redirect}
      {modal && (
        <FullModal
          isOpen={modal}
          handleModal={handleModal}
          deletePost={deletePost}
        />
      )}
      <Button onClick={() => setModal(true)} color="red">
        Sil
      </Button>
    </>
  );
};

export default DeleteButton;
