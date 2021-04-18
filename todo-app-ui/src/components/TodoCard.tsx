import { Button, Card, CardActions, CardContent, Typography } from "@material-ui/core";
import React from "react";

import { TodoItem } from "../api";

interface TodoCardProps {
    item: TodoItem;
    onDoneClick: () => void;
}

export function TodoCard(props: TodoCardProps): JSX.Element {
    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.item.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.item.description}
                </Typography>
            </CardContent>
            {!props.item.isDone && (
                <CardActions>
                    <Button color="primary" onClick={props.onDoneClick}>
                        ГОТОВО
                    </Button>
                </CardActions>
            )}
        </Card>
    );
}
