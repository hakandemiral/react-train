import api from "../api";
import { useState } from "react";
import { Button } from "semantic-ui-react";
import { FullModal } from "./";
import { useHistory } from "react-router-dom";

const DeleteButton = ({ id }) => {
  const history = useHistory();
  const [modal, setModal] = useState(false);

  const deletePost = () => {
    api()
      .delete(`/posts/${id}`)
      .then((res) => {
        handleModal(false);
        history.push("/")
      })
      .catch((err) => alert(`Silinemedi: ${err}`));
  };

  const handleModal = (isOpen) => {
    setModal(isOpen);
  };

  return (
    <>
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
