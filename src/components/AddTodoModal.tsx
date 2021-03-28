import React from "react";

import { TodoItem } from "../TodoApp";

interface AddTodoModalProps {
    onCancelAdd: () => void;
    onAddTodo: (item: TodoItem) => void;
}

interface AddTodoModalState {
    title: string;
    description: string;
}

export class AddTodoModal extends React.Component<AddTodoModalProps, AddTodoModalState> {
    public state: AddTodoModalState = {
        title: "",
        description: "",
    };

    public render(): JSX.Element {
        return (
            <div>
                <div>
                    Заголовок:
                    <input type="text" value={this.state.title} onChange={this.handleChangeTitle} />
                </div>

                <div>
                    Описание:
                    <input type="text" value={this.state.description} onChange={this.handleChangeDescription} />
                </div>
                <div>
                    <button onClick={this.props.onCancelAdd}>отмена</button>
                    <button onClick={this.handleAddClick}>отправить</button>
                </div>
            </div>
        );
    }
    private readonly handleChangeTitle = (event: any) => this.setState({ title: event.target.value });
    private readonly handleChangeDescription = (event: any) => this.setState({ description: event.target.value });
    private readonly handleAddClick = () =>
        this.props.onAddTodo({
            title: this.state.title,
            description: this.state.description,
            isDone: false,
        });
}
