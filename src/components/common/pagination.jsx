import React from "react";
import _ from 'lodash';

const Pagination = (props) => {
    const { itemsCount, pageSize, currentPage, onPageChange } = props;
    // console.log(currentPage);
    const pageCounts = Math.ceil(itemsCount / pageSize); 
    if(pageCounts === 1) return null;
    const pages = _.range(1, pageCounts + 1);

    return ( 
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pages.map(page => (
                    <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
                        <a onClick={() => onPageChange(page)} className="page-link" href="#">{page}</a>
                    </li>
                ))}
                
            </ul>
        </nav>
    );
}
 
export default Pagination;