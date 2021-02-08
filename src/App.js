import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { Heading } from "./Components";
import Routes from "./routes";

const App = () => {
  return (
    <Router>
        <Heading />
        <Container textAlign="center">
          <Routes />
        </Container>
    </Router>
  );
};

export default App;
