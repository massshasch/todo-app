import React from "react";

import { AddTodoModal } from "./components/AddTodoModal";
import { NavigationTabs } from "./components/NavigationTabs";
import { Paging } from "./components/Paging";
import { TodoCard } from "./components/TodoCard";

export interface TodoItem {
    title: string;
    description: string;
    isDone: boolean;
}

interface TodoAppProps {
    isDone: boolean;
    offset: number;
    count: number;
}

interface TodoAppState {
    openModal: boolean;
    todos: TodoItem[];
    valueSearch: string;
}

function filterBySearchValue(item: TodoItem, searchValue: string) {
    return item.title.indexOf(searchValue) > -1 || item.description.indexOf(searchValue) > -1;
}
export class TodoApp extends React.Component<TodoAppProps, TodoAppState> {
    public state: TodoAppState = {
        openModal: false,
        todos: [
            { title: "blablabla1", description: "ohno", isDone: false },
            { title: "blablabla2", description: "ohno", isDone: false },
            { title: "blablabla2", description: "ohno", isDone: false },
            { title: "blablabla2", description: "ohno", isDone: false },
            { title: "blablabla2", description: "ohno", isDone: false },
            { title: "blablabla2", description: "ohno", isDone: false },
            { title: "blablabla2", description: "ohno", isDone: false },
            { title: "blablabla2", description: "ohno", isDone: false },
            { title: "blablabla2", description: "ohno", isDone: false },
            { title: "blablabla2", description: "ohno", isDone: false },
            { title: "blablabla2", description: "ohno", isDone: false },
            { title: "blablabla2", description: "ohno", isDone: false },
            { title: "blablabla2", description: "ohno", isDone: false },
            { title: "blablabla2", description: "ohno", isDone: false },
            { title: "blablabla3", description: "ohno", isDone: true },
            { title: "blablabla3", description: "ohno", isDone: true },
            { title: "blablabla3", description: "ohno", isDone: true },
            { title: "blablabla3", description: "ohno", isDone: true },
            { title: "blablabla3", description: "ohno", isDone: true },
            { title: "blablabla3", description: "ohno", isDone: true },
            { title: "blablabla3", description: "ohno", isDone: true },
            { title: "blablabla3", description: "ohno", isDone: true },
            { title: "blablabla3", description: "ohno", isDone: true },
            { title: "blablabla3", description: "ohno", isDone: true },
            { title: "blablabla3", description: "ohno", isDone: true },
            { title: "blablabla3", description: "ohno", isDone: true },
            { title: "blablabla3", description: "ohno", isDone: true },
            { title: "lastday", description: "bye", isDone: false },
        ],
        valueSearch: "",
    };

    public render(): JSX.Element {
        const { todos } = this.state;
        const filteredTodos = todos
            .map((item, index) => ({ item: item, index: index }))
            .filter(x => x.item.isDone === this.props.isDone && filterBySearchValue(x.item, this.state.valueSearch));
        return (
            <div>
                <input type="text" value={this.state.valueSearch} onChange={this.handleChangeSearch} />

                <NavigationTabs
                    isDone={this.props.isDone}
                    todoCount={todos.filter(x => !x.isDone && filterBySearchValue(x, this.state.valueSearch)).length}
                    doneCount={todos.filter(x => x.isDone && filterBySearchValue(x, this.state.valueSearch)).length}
                />
                {filteredTodos
                    .map(x => (
                        <TodoCard item={x.item} key={x.index} onDoneClick={() => this.handleDoneClick(x.index)} />
                    ))
                    .slice(this.props.offset, this.props.offset + this.props.count)}
                {!this.props.isDone && <button onClick={this.handleAddClick}>ADD</button>}
                {this.state.openModal && (
                    <AddTodoModal onCancelAdd={this.handleCancelAdd} onAddTodo={this.handleAddTodo} />
                )}
                <Paging offset={this.props.offset} count={this.props.count} totalCount={filteredTodos.length} />
            </div>
        );
    }

    private readonly handleAddClick = () => this.setState({ openModal: true });
    private readonly handleCancelAdd = () => this.setState({ openModal: false });
    private readonly handleChangeSearch = (event: any) => this.setState({ valueSearch: event.target.value });
    private readonly handleAddTodo = (item: TodoItem) =>
        this.setState({
            todos: [...this.state.todos, item],
            openModal: false,
        });

    private readonly handleDoneClick = (index: number) =>
        this.setState({
            todos: [
                ...this.state.todos.slice(0, index),
                { ...this.state.todos[index], isDone: true },
                ...this.state.todos.slice(index + 1),
            ],
        });
}
