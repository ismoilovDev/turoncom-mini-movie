import { useRouter } from 'next/router'
import { BASE_URl, PER_PAGE, SECRET_TOKEN } from '../config'
import MovieItem from '../components/MovieItem'
import NotFound from '../components/NotFound'
import Pagination from '../components/Pagination/pagination'

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

  return (
    <div className="home">
      <h5 className="section-title">Фильмы</h5>
      {
        movies?.length > 0 ?
          <div className="movies-list">
            {
              movies.map(item => (
                <MovieItem key={item.id} data={item} />
              ))
            }
          </div> :
          < NotFound />
      }
      <div className="pagination-wrapper">
        <Pagination
          forcePage={Number(router.query.page) - 1 || 0}
          pageCount={Math.ceil(data?.total / PER_PAGE)}
          onPageChange={handlePageClick}
        />
      </div>
    </div>
  )
}

export async function getServerSideProps({ query }) {
  let page = query?.page || 1
  const response = await fetch(`${BASE_URl}/movie-list?page=${page}&items=${PER_PAGE}`, {
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
