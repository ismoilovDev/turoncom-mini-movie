import Link from 'next/link';

export default function Custom404() {
   return (
      <div className="custom-404">
         <h1>404 - Page Not Found</h1>
         <p>The page you are looking for does not exist.</p>
         <Link href="/">
            <a>Go back to homepage</a>
         </Link>
      </div>
   );
}
