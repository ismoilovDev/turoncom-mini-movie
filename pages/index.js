import { BASE_URl, SECRET_TOKEN } from '@/config'
import { useRouter } from 'next/router'
import ReactPaginate from 'react-paginate'
import Icon from 'public/assets/Icons'
import MovieItem from '@/components/MovieItem'

export default function Home({ data }) {
  const router = useRouter()

  const handleChanges = ({ selected }) => {
    router.push({
      query: { page: selected + 1 }
    })
  }

  if (!data?.movies) {
    return <p className="data-not-found">Movies not found</p>
  }

  const { movies } = data
  const pageCount = Math.ceil(data?.total_items / 18)

  return (
    <div className="home">
      <h5 className="title">Фильмы</h5>
      <div className="movies-wrapper">
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
          previousLabel={<Icon icon="chevron-left" width={20} height={20} />}
          nextLabel={<Icon icon="chevron-right" width={20} height={20} />}
          pageCount={pageCount}
          pageRangeDisplayed={3}
          marginPagesDisplayed={3}
          containerClassName={'custom-pagination'}
          pageClassName={'pagination-item'}
          breakClassName={'pagination-item'}
          previousClassName={'pagination-item'}
          nextClassName={'pagination-item'}
          activeClassName={'active'}
          onPageChange={handleChanges}
          forcePage={Number(router.query.page) - 1 || 0}
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
  console.log(data)
  return {
    props: {
      data
    }
  }
}
