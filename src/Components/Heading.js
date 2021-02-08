import { Link } from "react-router-dom";
import { Header, Icon } from "semantic-ui-react";

const Heading = () => (
  <Link to="/">
    <Header as="h2" style={{ margin: "3%" }}>
      <Icon name="settings" />
      <Header.Content>React Yazı/Yorum</Header.Content>
    </Header>
  </Link>
);

export default Heading;
