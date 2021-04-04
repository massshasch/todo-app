import { AppBar, Tab, Tabs } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";

interface NavigationTabsProps {
    isDone: boolean;
    todoCount: number;
    doneCount: number;
}

export function NavigationTabs({ isDone, todoCount, doneCount }: NavigationTabsProps): JSX.Element {
    const history = useHistory();

    const handleChange = (event: any, tabIndex: number) => {
        history.push(tabIndex === 1 ? "/done" : "/todo");
    };

    return (
        <AppBar position="static">
            <Tabs value={Number(isDone)} onChange={handleChange}>
                <Tab label={<div>TODO {todoCount}</div>} />
                <Tab label={<div> DONE {doneCount}</div>} />
            </Tabs>
        </AppBar>
    );
}
