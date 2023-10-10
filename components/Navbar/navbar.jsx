import { memo, useMemo } from 'react'
import Link from 'next/link'

const Navbar = () => {

   const navLinks = useMemo(() => {
      return [
         { name: 'Фильмы', link: '/', id: 1 },
         { name: 'Сериалы', link: '/', id: 2 },
      ]
   }, [])

   return (
      <nav className="navbar">
         <div className="navbar-links">
            <Link href="/" className='logo'>
               <span>MOVIE</span>
            </Link>
            <div className="navbar-link">
               {
                  navLinks.map(item => (
                     <Link key={item.id} href={item.link}>
                        {item.name}
                     </Link>
                  ))
               }
            </div>
         </div>
         <div className="auth">
            <Link href="/">
               Вход
            </Link>
            <Link href="/">
               Регистрация
            </Link>
         </div>
      </nav>
   )
}

export default memo(Navbar)
