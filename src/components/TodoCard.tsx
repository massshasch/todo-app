import React from "react";

import { TodoItem } from "../TodoApp";

interface TodoCardProps {
    item: TodoItem;
    onDoneClick: () => void;
}

export function TodoCard(props: TodoCardProps): JSX.Element {
    return (
        <div>
            <h2>{props.item.title}</h2>
            <div>{props.item.description}</div>
            {!props.item.isDone && <button onClick={props.onDoneClick}>ГОТОВО</button>}
        </div>
    );
}
