import { useRouter } from 'next/router'
import ReactPaginate from 'react-paginate'
import { BASE_URl, SECRET_TOKEN } from '../config'
import MovieItem from '../components/MovieItem'
import Icon from '../public/assets/Icons'
import NotFound from '../components/NotFound'

export default function Home({ data }) {
  const router = useRouter()

  const handlePageClick = ({ selected }) => {
    router.push({
      query: { page: selected + 1 }
    })
  }

  if (!data?.movies) {
    return <NotFound />
  }

  const { movies } = data
  const pageCount = Math.ceil(data?.total / 20)
  
  return (
    <div className="home">
      <h5 className="section-title">Фильмы</h5>
      <div className="movies-list">
        {
          movies?.length > 0 ?
            movies.map(item => (
              <MovieItem key={item.id} data={item} />
            )) :
            <p className="data-not-found">Movies not found</p>
        }
      </div>
      <div className="pagination-wrapper">
        <ReactPaginate
          nextLabel={<Icon icon="chevron-right" width={22} height={22} />}
          previousLabel={<Icon icon="chevron-left" width={22} height={22} />}
          pageCount={pageCount}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          containerClassName={'pagination-container'}
          pageClassName={'pagination-item'}
          breakClassName={'pagination-item'}
          previousClassName={'pagination-item'}
          nextClassName={'pagination-item'}
          activeClassName={'active_page'}
          onPageChange={handlePageClick}
          forcePage={Number(router.query.page) - 1 || 0}
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  )
}

export async function getServerSideProps({ query }) {
  let page = query?.page || 1
  const response = await fetch(`${BASE_URl}/movie-list?page=${page}&items=20`, {
    headers: {
      'secret-token': SECRET_TOKEN,
      'Content-Type': 'application/json'
    }
  })
  const { data } = await response.json()
  return {
    props: {
      data
    }
  }
}
