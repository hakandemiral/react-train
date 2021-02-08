import React from "react";
import { Posts, Post, PostForm } from "./Components";
import { Route, Switch } from "react-router-dom";

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Posts} />
    <Route path="/posts/new" exact component={PostForm} />
    <Route path="/posts/:id" exact component={Post} />
  </Switch>
);

export default Routes;
