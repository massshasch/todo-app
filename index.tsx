import React from "react";
import ReactDom from "react-dom";
import { Switch, Redirect, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

function TodoAppEntryPoint() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/todo" render={() => <div />} />
                <Route path="/done" render={() => <div />} />
                <Route exact path="/">
                    <Redirect to="/todo" />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

ReactDom.render(<TodoAppEntryPoint />, document.getElementById("content"));
