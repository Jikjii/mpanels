// components/Layout/Header.tsx
import React from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import { motion } from "framer-motion";

const Header = () => {
  const { user } = useUser();
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  let easing = [0.6, 0.05, 0.01, 0.99];

  const fadeInUp = {
    hidden: { opacity: 0 },
    initial: {
      y: 60,
      opacity: 1,
      transition: { duration: 0.6, ease: easing },
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 1,
        ease: easing,
      },
    },
  };

  return (
    <>
      <motion.div
        initial='hidden'
        animate='animate'
        exit={{ opacity: 0 }}
        variants={fadeInUp}
        className='roboto-regular mx-auto flex max-w-[100rem] flex-col px-4 pt-4 text-[#ffffff] md:flex-row md:items-center md:justify-between md:px-6 lg:px-8'
      >
        <div className='flex flex-row items-center justify-between p-4'>
          <a
            href='/'
            className='focus:shadow-outline rounded-lg text-lg font-semibold tracking-widest focus:outline-none'
          >
            <h2 className='text-4xl tracking-tighter'>MPanel</h2>
          </a>
          <button
            className='cursor-pointer px-3 leading-none outline-none focus:outline-none md:hidden'
            type='button'
            aria-label='button'
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#fff'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='3' y1='12' x2='21' y2='12'></line>
              <line x1='3' y1='6' x2='21' y2='6'></line>
              <line x1='3' y1='18' x2='21' y2='18'></line>
            </svg>
          </button>
        </div>
        <div
          className={
            "mt-3 flex-grow items-start md:flex lg:mt-0" +
            (navbarOpen ? " flex" : " hidden")
          }
        >
          <div className='flex-col pl-4 text-xl md:flex-grow md:pl-0'>
            {user ? (
              <ul className='flex flex-grow flex-wrap items-center justify-end gap-6 space-x-6 pr-4'>
                <li>
                  <Link href='/animes'>
                    <a className='text-lg'>Anime</a>
                  </Link>
                </li>
                <li>
                  <Link href='/mangas'>
                    <a className='text-lg'>Mangas</a>
                  </Link>
                </li>
                <li>
                  <Link href='/panels'>
                    <a className='text-lg'>Panels</a>
                  </Link>
                </li>

                <li>
                  <Link href='/api/auth/logout'>
                    <a className='rounded-md border-2 bg-white px-4 py-3 text-lg text-black'>Logout</a>
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className='flex flex-grow flex-wrap items-center justify-end gap-6 space-x-6 pr-4'>
                <li>
                  <Link href='/api/auth/login'>
                    <a className='rounded-md border-2 bg-white px-4 py-3 text-lg text-black'>
                      Login
                    </a>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </motion.div>
    </>

    // <header className="text-gray-600 body-font">
    //   <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    //     <Link href="/">
    //       <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
    //         <svg
    //           className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full"
    //           fill="none"
    //           stroke="currentColor"
    //           viewBox="0 0 24 24"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    //           ></path>
    //         </svg>
    //       </a>
    //     </Link>
    //     <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
    //       {user ? (

    //         <div className="flex items-center space-x-5">
    //           <Link href="/animes">
    //             <a className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
    //               Animes
    //             </a>
    //           </Link>
    //           <Link href="/api/auth/logout">
    //             <a className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
    //               Logout
    //             </a>
    //           </Link>
    //           <img alt="profile" className="rounded-full w-12 h-12" src={user.picture} />
    //         </div>
    //       ) : (
    //         <Link href="/api/auth/login">
    //           <a className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
    //             Login
    //           </a>
    //         </Link>
    //       )}
    //     </nav>
    //   </div>
    // </header>
  );
};

export default Header;
