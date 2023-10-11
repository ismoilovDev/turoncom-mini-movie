import { memo } from "react"
import ReactPaginate from "react-paginate"
import ReactPaginate from 'react-paginate'
import Icon from '../../public/assets/Icons'

const Pagination = ({ forcePage, pageCount, onPageChange }) => {
   return (
      <ReactPaginate
         nextLabel={<Icon icon="chevron-right" width={22} height={22} />}
         previousLabel={<Icon icon="chevron-left" width={22} height={22} />}
         breakLabel="..."
         pageCount={pageCount}
         pageRangeDisplayed={5}
         marginPagesDisplayed={2}
         containerClassName={'pagination-container'}
         pageClassName={'pagination-item'}
         breakClassName={'pagination-item'}
         previousClassName={'pagination-item'}
         nextClassName={'pagination-item'}
         activeClassName={'active_page'}
         onPageChange={onPageChange}
         forcePage={forcePage}
         renderOnZeroPageCount={null}
      />
   )
}

export default memo(Pagination)