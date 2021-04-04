import { Pagination } from "@material-ui/lab";
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
            <Pagination
                count={Math.ceil(props.totalCount / props.count)}
                color="primary"
                page={Math.ceil(props.offset / props.count) + 1}
                onChange={(event, value) =>
                    history.push(
                        `${history.location.pathname}?offset=${(value - 1) * props.count}&count=${props.count}`
                    )
                }
            />
        </div>
    );
}
