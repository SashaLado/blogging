import React from 'react';
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import Header from '../header/Header';
import './Home.scss';

const SERVER_URL = 'http://localhost:3000/posts';

const mainClass = 'list';

const Home = () => {
  const {data, isLoading} = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch(SERVER_URL).then((res) =>
        res.json(),
      ),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <Header />
      <main className={mainClass}>
        <div className={`${mainClass}__container container`}>
          {data?.map((post: any, idx: number) => (
            <Link key={idx} to={`/post/${post?.id}`} className={`${mainClass}__item`}>
              <h2 className={`${mainClass}__title`}>
                {post?.title}
              </h2>
              <span className={`${mainClass}__date`}>Published at: {post?.published_date}</span>
              <p className={`${mainClass}__content`}>
                {post?.content?.slice(0, 300)}
                {post?.content?.length > 300 && '...'}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
