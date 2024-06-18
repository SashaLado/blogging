import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AiTwotoneLike, AiTwotoneDislike } from "react-icons/ai";
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '../header/Header';
import './Post.scss';

const mainClass = 'post';

const SERVER_URL = 'http://localhost:3000/posts'

const Post = () => {
  const { slug } = useParams();

  const {data, isLoading} = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch(`${SERVER_URL}?id=${slug}`).then((res) =>
        res.json(),
      ),
  })

  const post = useMemo(() => {
    return data && data[0]
  }, [data])

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <div className={mainClass}>
        <div className="container">
          <div className={`${mainClass}__header`}>
            <h1 className={`${mainClass}__title`}>{post?.title}</h1>
            <div className="reactions-group">
              <Link to={`/post/edit/${slug}`} className="button button_bordered">
                Edit post
              </Link>
            </div>
          </div>
          <main className={`${mainClass}__main`}>
            <p className={`${mainClass}__date`}>
              Posted on {post.published_date}
            </p>
            {post.content}
          </main>
        </div>
      </div>
    </>
  );
};

export default Post;
