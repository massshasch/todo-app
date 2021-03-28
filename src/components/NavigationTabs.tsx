import React from "react";
import { useHistory } from "react-router";

interface NavigationTabsProps {
    isDone: boolean;
    todoCount: number;
    doneCount: number;
}

export function NavigationTabs({ isDone, todoCount, doneCount }: NavigationTabsProps): JSX.Element {
    const history = useHistory();
    return (
        <div>
            <button disabled={!isDone} onClick={() => history.push("/todo")}>
                TODO {todoCount}
            </button>
            <button disabled={isDone} onClick={() => history.push("/done")}>
                DONE {doneCount}
            </button>
        </div>
    );
}
