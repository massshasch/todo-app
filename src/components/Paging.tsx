import React from "react";
import { useHistory } from "react-router";

interface PagingProps {
    offset: number;
    count: number;
    totalCount: number;
}
export function Paging(props: PagingProps): JSX.Element {
    const history = useHistory();
    console.log(history.location);
    return (
        <div>
            <button
                disabled={props.offset - props.count < 0}
                onClick={() =>
                    history.push(
                        `${history.location.pathname}?offset=${props.offset - props.count}&count=${props.count}`
                    )
                }>
                предыдущая
            </button>
            <button
                disabled={props.offset + props.count >= props.totalCount}
                onClick={() =>
                    history.push(
                        `${history.location.pathname}?offset=${props.offset + props.count}&count=${props.count}`
                    )
                }>
                следующая
            </button>
        </div>
    );
}
