import { memo } from "react"
import ReactPaginate from "react-paginate"
import Icon from '../../public/assets/Icons'

const Pagination = ({ forcePage, pageCount, onPageChange }) => {
   return (
      <ReactPaginate
         breakLabel="..."
         pageCount={pageCount}
         pageRangeDisplayed={2}
         marginPagesDisplayed={2}
         containerClassName={'pagination-container'}
         breakClassName={'pagination-item'}
         pageClassName={'pagination-item'}
         previousClassName={'pagination-item'}
         nextClassName={'pagination-item'}
         activeClassName={'active_page'}
         onPageChange={onPageChange}
         forcePage={forcePage}
         renderOnZeroPageCount={null}
         nextLabel={<Icon icon="chevron-right" width={22} height={22} />}
         previousLabel={<Icon icon="chevron-left" width={22} height={22} />}
      />
   )
}

export default memo(Pagination)