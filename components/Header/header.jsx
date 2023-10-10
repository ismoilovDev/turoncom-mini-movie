import { memo, useMemo } from 'react'
import Link from 'next/link'

const Header = () => {

   const navLinks = useMemo(() => {
      return [
         { name: 'Телеканалы', link: '/', id: 1 },
         { name: 'Фильмы', link: '/', id: 2 },
         { name: 'Сериалы', link: '/', id: 3 },
         { name: 'Детям', link: '/', id: 4 }
      ]
   }, [])

   return (
      <header className="header">
         <div className="header-links container">
            <Link href="/">
               Logo
            </Link>
            <div className="menus">
               {
                  navLinks.map(item => (
                     <Link key={item.id} href={item.link}>
                        {item.name}
                     </Link>
                  ))
               }
            </div>
            {/* <Icon icon={'search'} width={24} height={24} className="search-icon" /> */}
            <div className="auth">
               <Link href="/">
                  Вход
               </Link>
               <Link href="/">
                  Регистрация
               </Link>
            </div>
         </div>
      </header>
   )
}

export default memo(Header)
