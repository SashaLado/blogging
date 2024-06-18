import React, { useCallback, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { fetchAllPosts } from '../../api/utils';
import { useQuery } from '@tanstack/react-query';

const SERVER_URL = 'http://localhost:3000/posts'

const Home = () => {
  const {data, isLoading} = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch(SERVER_URL).then((res) =>
        res.json(),
      ),
  })

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <nav className='navbar'>
        <Link to='/' className='logo'>
          <h2>MyBlog</h2>
        </Link>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to='/post/new' className='newPostBtn'>
            New Post
          </Link>
        </div>
      </nav>
      <main className='main'>
        <h2 className='heading'>Latest Posts</h2>
        <div className='posts_container'>
          {data?.map((post: any, idx: number) => (
            <Link key={idx} to={`/post/${post?.id}`} className='post'>
              <h2 className='post_title'>
                {post?.title}
              </h2>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
