import { AppBar, Tab, Tabs, Input } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";

import styles from "./NavigationTabs.css";

interface NavigationTabsProps {
    isDone: boolean;
    todoCount: number;
    doneCount: number;
    valueSearch: string;
    onChangeSearch: (value: string) => void;
}

export function NavigationTabs({
    isDone,
    todoCount,
    doneCount,
    valueSearch,
    onChangeSearch,
}: NavigationTabsProps): JSX.Element {
    const history = useHistory();

    const handleChange = (event: any, tabIndex: number) => {
        history.push(tabIndex === 1 ? "/done" : "/todo");
    };

    const handleChangeSearch = (event: any) => {
        onChangeSearch(event.target.value);
    };

    return (
        <AppBar position="static" className={styles.appBar}>
            <Tabs value={Number(isDone)} onChange={handleChange}>
                <Tab label={<div>TODO {todoCount}</div>} />
                <Tab label={<div> DONE {doneCount}</div>} />
            </Tabs>
            <div className={styles.grow} />
            <Input placeholder="Поиск" value={valueSearch} onChange={handleChangeSearch} />
        </AppBar>
    );
}
