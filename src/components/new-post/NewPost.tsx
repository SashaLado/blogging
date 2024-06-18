import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import Header from '../header/Header';
const SERVER_URL = 'http://localhost:3000/posts'

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const mutation = useMutation({
    mutationFn: (newPost: {}) => {
      return fetch(SERVER_URL, {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
          "Content-Type": "application/json",
        },
      })
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation.mutate({ title: title, content: content, published_date: new Date().toISOString().split('T')[0]})
  };

  if (mutation.isPending) return <p>Loading...</p>;

  return (
    <div>
      <Header />
      <main className='main'>
        {mutation.isError ? (
          <div>oops... something went wrong</div>
        ) : null}

        {mutation.isSuccess ? <div>Post added! <Link to={`/`}>Go back to all posts</Link></div> : null}

        <h2 className='heading'>Create new post</h2>
        <form className='newPost_form' onSubmit={handleSubmit}>
          <label htmlFor='title' className='label'>
            Title
          </label>
          <input
            type='text'
            className='newPost_title'
            id='title'
            name='title'
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor='content' className='label'>
            Content
          </label>
          <textarea
            rows={10}
            className='newPost_content'
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
          />
          <button className='newPostBtn submitBtn' type='submit'>
            Create Post
          </button>
        </form>
      </main>
    </div>
  );
};

export default EditPost;
