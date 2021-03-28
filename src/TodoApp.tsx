import React from "react";

import { AddTodoModal } from "./components/AddTodoModal";
import { NavigationTabs } from "./components/NavigationTabs";
import { TodoCard } from "./components/TodoCard";

export interface TodoItem {
    title: string;
    description: string;
    isDone: boolean;
}

interface TodoAppProps {
    isDone: boolean;
}

interface TodoAppState {
    openModal: boolean;
    todos: TodoItem[];
}

export class TodoApp extends React.Component<TodoAppProps, TodoAppState> {
    public state: TodoAppState = {
        openModal: false,
        todos: [
            { title: "blablabla1", description: "ohno", isDone: false },
            { title: "blablabla2", description: "ohno", isDone: false },
            { title: "blablabla3", description: "ohno", isDone: true },
            { title: "lastday", description: "bye", isDone: false },
        ],
    };

    public render(): JSX.Element {
        const { todos } = this.state;
        return (
            <div>
                <NavigationTabs
                    isDone={this.props.isDone}
                    todoCount={todos.filter(x => !x.isDone).length}
                    doneCount={todos.filter(x => x.isDone).length}
                />
                {todos
                    .map((item, index) => ({ item: item, index: index }))
                    .filter(x => x.item.isDone === this.props.isDone)
                    .map(x => (
                        <TodoCard item={x.item} key={x.index} onDoneClick={() => this.handleDoneClick(x.index)} />
                    ))}
                {!this.props.isDone && <button onClick={this.handleAddClick}>ADD</button>}
                {this.state.openModal && (
                    <AddTodoModal onCancelAdd={this.handleCancelAdd} onAddTodo={this.handleAddTodo} />
                )}
            </div>
        );
    }

    private readonly handleAddClick = () => this.setState({ openModal: true });
    private readonly handleCancelAdd = () => this.setState({ openModal: false });
    private readonly handleAddTodo = (item: TodoItem) => this.setState({ todos: [...this.state.todos, item] });
    private readonly handleDoneClick = (index: number) =>
        this.setState({
            todos: [
                ...this.state.todos.slice(0, index),
                { ...this.state.todos[index], isDone: true },
                ...this.state.todos.slice(index + 1),
            ],
        });
}
