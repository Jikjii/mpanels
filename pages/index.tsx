// /pages/index.tsx
import Head from "next/head";
import { gql, useQuery, useMutation } from "@apollo/client";
import Link from "next/link";
import { Panel } from "../components/Panel";
import Landing from "../components/Landing";
import { Hero } from "../components/Hero";
import { motion } from 'framer-motion';
import React from "react";

const AllPanelsQuery = gql`
  query allPanelsQuery($first: Int, $after: String) {
    panels(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          # index
          imageUrl
          url
          title
          category
          description
          id
        }
      }
    }
  }
`;

// here

const content = (isFirstMount) => ({
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: isFirstMount ? 2.8 : 0 },
  },
});

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

const products = {
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
// here

function Home({ isFirstMount}) {
  const { data, loading, error, fetchMore } = useQuery(AllPanelsQuery, {
    variables: { first: 2 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const { endCursor, hasNextPage } = data.panels.pageInfo;

  return (
    <div>
      <Head>
        <title>MPanels</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* from here */}
      <motion.section exit={{ opacity: 0 }}>
      {isFirstMount && <InitialTransition />}

      <motion.div
        initial="initial"
        animate="animate"
        variants={content(isFirstMount)}
        className="space-y-12"
      >
        <motion.h1 variants={title} className="text-6xl font-black text-center">
          Welcome to tailstore!
        </motion.h1>

        <motion.section variants={products} className="text-gray-700 body-font">
      {/* to here */}
      {/* delete if needed */}
      <div>
      
        
        <Landing /> 
      </div>
      <div>
        <Hero />
      </div>
      {/* delete if needed */}
      <div className='container mx-auto max-w-5xl my-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {data?.panels.edges.map(({ node }) => (
            <Panel
              title={node.title}
              category={node.category}
              url={node.url}
              id={node.id}
              description={node.description}
              imageUrl={node.imageUrl}
            />
          ))}
        </div>
        {hasNextPage ? (
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded my-10'
            onClick={() => {
              fetchMore({
                variables: { after: endCursor },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                  fetchMoreResult.panels.edges = [
                    ...prevResult.panels.edges,
                    ...fetchMoreResult.panels.edges,
                  ];
                  return fetchMoreResult;
                },
              });
            }}
          >
            more
          </button>
        ) : (
          <p className='my-10 text-center font-medium'>
            You've reached the end!{" "}
          </p>
        )}
      </div>
      </motion.section>
      </motion.div>
    </motion.section>
    </div>
  );
}

export default Home;


const blackBox = {
  initial: {
    height: "100%",
    bottom: 0,
  },
  animate: {
    height: 0,
    transition: {
      when: "afterChildren",
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

const textContainer = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 0,
    transition: {
      duration: 0.3,
      when: "afterChildren",
    },
  },
};

const text = {
  initial: {
    y: 40,
  },
  animate: {
    y: 80,
    transition: {
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

const InitialTransition = () => {
  // Scroll user to top to avoid showing the footer
  // React.useState(() => {
  //   typeof windows !== "undefined" && window.scrollTo(0, 0);
  // }, []);

  return (
    <motion.div
      className="absolute z-50 flex items-center justify-center w-full bg-black"
      initial="initial"
      animate="animate"
      variants={blackBox}
      onAnimationStart={() => document.body.classList.add("overflow-hidden")}
      onAnimationComplete={() =>
        document.body.classList.remove("overflow-hidden")
      }
    >
      <motion.svg variants={textContainer} className="absolute z-50 flex">
        <pattern
          id="pattern"
          patternUnits="userSpaceOnUse"
          width={750}
          height={800}
          className="text-white"
        >
          <rect className="w-full h-full fill-current" />
          <motion.rect
            variants={text}
            className="w-full h-full text-gray-600 fill-current"
          />
        </pattern>
        <text
          className="text-4xl font-bold"
          textAnchor="middle"
          x="50%"
          y="50%"
          style={{ fill: "url(#pattern)" }}
        >
          mpanel
        </text>
      </motion.svg>
    </motion.div>
  );
};