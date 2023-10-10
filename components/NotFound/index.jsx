import Link from 'next/link';
import { memo } from 'react';

const NotFound = () => {
   return (
      <div className="not-found">
         <h1>Movies not found</h1>
         <p>The page you are looking for does not exist.</p>
         <Link href="/">
            Go back to home
         </Link>
      </div>
   );
}

export default memo(NotFound);