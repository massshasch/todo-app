import { Fab, withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
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
    classes: { fab: string };
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

class TodoAppInternal extends React.Component<TodoAppProps, TodoAppState> {
    public state: TodoAppState = {
        openModal: false,
        todos: [],
        valueSearch: "",
    };
    public componentDidMount() {
        this.setState({
            todos: JSON.parse(localStorage.getItem("todos") || "[]"),
        });
    }

    public render(): JSX.Element {
        const { todos } = this.state;
        const filteredTodos = todos
            .map((item, index) => ({ item: item, index: index }))
            .filter(x => x.item.isDone === this.props.isDone && filterBySearchValue(x.item, this.state.valueSearch));

        return (
            <div style={{ margin: 10 }}>
                <TextField
                    size="small"
                    label="Поиск"
                    variant="outlined"
                    value={this.state.valueSearch}
                    onChange={this.handleChangeSearch}
                />

                <NavigationTabs
                    isDone={this.props.isDone}
                    todoCount={todos.filter(x => !x.isDone && filterBySearchValue(x, this.state.valueSearch)).length}
                    doneCount={todos.filter(x => x.isDone && filterBySearchValue(x, this.state.valueSearch)).length}
                />

                {filteredTodos
                    .map(x => (
                        <div
                            key={x.index}
                            style={{
                                maxWidth: 345,
                                marginBottom: 15,
                                marginTop: 15,
                            }}>
                            <TodoCard item={x.item} onDoneClick={() => this.handleDoneClick(x.index)} />
                        </div>
                    ))
                    .slice(this.props.offset, this.props.offset + this.props.count)}
                {!this.props.isDone && (
                    <Fab
                        color="primary"
                        aria-label="add"
                        className={this.props.classes.fab}
                        onClick={this.handleAddClick}>
                        <AddIcon />
                    </Fab>
                )}
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
    private readonly handleAddTodo = (item: TodoItem) => {
        localStorage.setItem("todos", JSON.stringify([...this.state.todos, item]));
        this.setState({
            todos: [...this.state.todos, item],
            openModal: false,
        });
    };

    private readonly handleDoneClick = (index: number) => {
        localStorage.setItem(
            "todos",
            JSON.stringify([
                ...this.state.todos.slice(0, index),
                { ...this.state.todos[index], isDone: true },
                ...this.state.todos.slice(index + 1),
            ])
        );
        this.setState({
            todos: [
                ...this.state.todos.slice(0, index),
                { ...this.state.todos[index], isDone: true },
                ...this.state.todos.slice(index + 1),
            ],
        });
    };
}

export const TodoApp = withStyles(theme => ({
    fab: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}))(TodoAppInternal);
