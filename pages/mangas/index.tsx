import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Card from "../../components/Card";
import { Datum, GetMangas } from "../../mangaTypes";
import { motion } from "framer-motion";
import { Categories } from "../../components/Categories";

const content = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

const title = {
  initial: { y: -20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const inputs = {
  initial: { y: -20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const Mangas: NextPage<{ mangas: Datum[] }> = ({ mangas }) => {
  console.log(mangas);
  return (
    <motion.section
      exit={{ opacity: 0 }}
      className='relative text-gray-700 body-font'
    >
      <motion.div
        variants={content}
        animate='animate'
        initial='initial'
        className='container px-5 py-24 mx-auto'
      >
        <motion.div
          variants={title}
          className='flex flex-col w-full mb-12 text-center'
        >
        <div>
            <Categories />
        </div>
          <div className='grid grid-cols-4 gap-4'>
            {mangas.map((manga) => (
              <div className='p-8' key={manga.title}>
                <Link href={`/composers/${manga.mal_id}`}>
                  <a>
                    <article
                      className='mx-auto max-w-sm shadow-xl bg-cover bg-center min-h-150 transform duration-500 hover:-translate-y-2 cursor-pointer group'
                      style={{
                        backgroundImage: `url(${manga.images.jpg.image_url})`,
                      }}
                    >
                      <div className='bg-black bg-opacity-20 min-h-150 px-10 flex flex-wrap flex-col pt-96 hover:bg-opacity-75 transform duration-300'>
                        <h1 className='text-white text-3xl mb-5 transform translate-y-20 group-hover:translate-y-0 duration-300'>
                          {manga.title}
                        </h1>
                        <div className='w-16 h-2 bg-orange-500 rounded-full mb-5 transform translate-y-20 group-hover:translate-y-0 duration-300'></div>
                        <p className='opacity-0 text-white text-xl group-hover:opacity-80 transform duration-500'>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Maxime, beatae!
                        </p>
                      </div>
                    </article>
                  </a>
                </Link>
              </div>
            ))}

            {/*  */}
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("https://api.jikan.moe/v4/top/manga");
  const { data }: GetMangas = await res.json();

  return {
    props: {
      mangas: data,
    },
  };
};

export default Mangas;

// export const getStaticProps: GetStaticProps = async (context) => {
//     const res = await fetch("https://api.jikan.moe/v4/top/anime");
//     const { data }: GetAnimes = await res.json();

//     return {
//     props: {
//         topAnimes: data,
//     }

// }
