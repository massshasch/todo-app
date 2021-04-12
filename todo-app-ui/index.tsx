import React from "react";
import ReactDom from "react-dom";
import { Switch, Redirect, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import { TodoApp } from "./src/TodoApp";

interface PagingState {
    offset: number;
    count: number;
}

function parseQuery(query: string): PagingState {
    const params = new URLSearchParams(query);
    return {
        offset: parseInt(params.get("offset") || "0"),
        count: parseInt(params.get("count") || "5"),
    };
}

function TodoAppEntryPoint() {
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    path="/todo"
                    render={props => <TodoApp isDone={false} {...parseQuery(props.location.search)} />}
                />
                <Route path="/done" render={props => <TodoApp isDone {...parseQuery(props.location.search)} />} />
                <Route exact path="/">
                    <Redirect to="/todo" />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

ReactDom.render(<TodoAppEntryPoint />, document.getElementById("content"));
