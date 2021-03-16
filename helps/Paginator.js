import * as React from "react";
import Pagination from "react-bootstrap/Pagination";
const Paginator = (props) => {
    let items = null;
    const getItems = (startNumber, endNumber) => {
        const items = [];
        for (let number = startNumber; number <= endNumber; number++) {
            items.push(React.createElement(Pagination.Item, { key: number, onClick: () => props.changePageHandler(number), active: number === props.currentPage }, number));
        }
        return items;
    };
    if (props.totalPages <= 6) {
        items = getItems(1, props.totalPages);
    }
    else {
        if (props.currentPage <= 3) {
            items = getItems(1, 4);
            items.push(React.createElement(Pagination.Ellipsis, null));
            items = items.concat(getItems(props.totalPages, props.totalPages));
        }
        else if (props.currentPage > 3 && props.currentPage < props.totalPages - 3) {
            items = getItems(1, 1);
            items.push(React.createElement(Pagination.Ellipsis, null));
            items = items.concat(getItems(props.currentPage - 1, props.currentPage - 1));
            items = items.concat(getItems(props.currentPage, props.currentPage));
            items = items.concat(getItems(props.currentPage + 1, props.currentPage + 1));
            items.push(React.createElement(Pagination.Ellipsis, null));
            items = items.concat(getItems(props.totalPages, props.totalPages));
        }
        else {
            items = getItems(1, 1);
            items.push(React.createElement(Pagination.Ellipsis, null));
            items = items.concat(getItems(props.totalPages - 3, props.totalPages));
        }
    }
    return (React.createElement(Pagination, null,
        props.currentPage > 1 &&
            React.createElement(Pagination.Prev, { onClick: () => props.changePageHandler(props.currentPage - 1) }),
        items,
        props.currentPage < props.totalPages &&
            React.createElement(Pagination.Next, { onClick: () => props.changePageHandler(props.currentPage + 1) })));
};
export default Paginator;