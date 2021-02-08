import { Button, Header, Icon, Modal } from "semantic-ui-react";

const FullModal = ({ isOpen, handleModal, deletePost }) => {
  return (
    <Modal
      basic
      onClose={() => handleModal(false)}
      onOpen={() => handleModal(true)}
      open={isOpen}
      size="small"
    >
      <Header icon>
        <Icon name="trash" />
        Silinsin mi?
      </Header>
      <Modal.Content>
        <p style={{ textAlign: "center" }}>
          Bu post tamamen silinecektir onaylıyor musunuz?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" onClick={() => handleModal(false)}>
          <Icon name="remove" /> Hayır
        </Button>
        <Button
          color="green"
          onClick={() => {
            deletePost();
          }}
        >
          <Icon name="checkmark" /> Evet
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default FullModal;
