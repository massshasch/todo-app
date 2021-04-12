import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import React from "react";

import { TodoItem } from "../TodoApp";

interface AddTodoModalProps {
    onCancelAdd: () => void;
    onAddTodo: (item: TodoItem) => void;
}

interface AddTodoModalState {
    title: string;
    description: string;
    errorOpen: boolean;
}
export class AddTodoModal extends React.Component<AddTodoModalProps, AddTodoModalState> {
    public state: AddTodoModalState = {
        title: "",
        description: "",
        errorOpen: false,
    };

    public render(): JSX.Element {
        return (
            <Dialog onClose={this.props.onCancelAdd} open>
                <DialogTitle>Добавить TODO</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Заголовок"
                        fullWidth
                        value={this.state.title}
                        onChange={this.handleChangeTitle}
                        error={this.state.errorOpen}
                        helperText={this.state.errorOpen && "Заполните поле"}
                    />

                    <TextField
                        margin="dense"
                        label="Детали"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        value={this.state.description}
                        onChange={this.handleChangeDescription}
                        variant="outlined"
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.props.onCancelAdd} color="primary">
                        отмена
                    </Button>
                    <Button onClick={this.handleAddClick} color="primary">
                        отправить
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
    private readonly handleChangeTitle = (event: any) => this.setState({ title: event.target.value });
    private readonly handleChangeDescription = (event: any) => this.setState({ description: event.target.value });
    private readonly handleAddClick = () => {
        if (this.state.title) {
            this.props.onAddTodo({
                title: this.state.title,
                description: this.state.description,
                isDone: false,
            });
        } else {
            this.setState({ errorOpen: true });
        }
    };


}
