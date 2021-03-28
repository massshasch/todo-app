import React from "react";
import ReactDom from "react-dom";
import { Switch, Redirect, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import { TodoApp } from "./src/TodoApp";

function TodoAppEntryPoint() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/todo" render={() => <TodoApp isDone={false} />} />
                <Route path="/done" render={() => <TodoApp isDone />} />
                <Route exact path="/">
                    <Redirect to="/todo" />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

ReactDom.render(<TodoAppEntryPoint />, document.getElementById("content"));
