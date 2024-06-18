import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AiTwotoneLike, AiTwotoneDislike } from "react-icons/ai";
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '../header/Header';

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
    <div>
      <Header />
      <header className='details_header'>
        <h1 className='details_heading'>{post?.title}</h1>
        <div className='post_details'>
          <div>
            <p className='details_date'>Posted on {post.published_date}</p>
          </div>
          <div className='reactions-group'>
            <Link to={`/post/edit/${slug}`} className='reactBtn'>
              Edit post
            </Link>
          </div>
        </div>
      </header>
      <main className='details_body'>
        {post.content}
      </main>
    </div>
  );
};

export default Post;
