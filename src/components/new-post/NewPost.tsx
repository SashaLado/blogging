import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Header from '../header/Header';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const SERVER_URL = 'http://localhost:3000/posts'

const mainClass = 'form';

const generateId = (title: string): string => {
  return title ? title.toLowerCase().split(' ').join('-') : '';
}

const EditPost = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (newPost: {}) => {
      return fetch(SERVER_URL, {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r: any) => {
          toast.success('Post added!');
          navigate('/');
        })
        .catch((err) => {
          toast.error(`Post adding failed due to ${err.message}`);
        })
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({
      id: generateId(title),
      title: title,
      content: content,
      published_date: new Date().toISOString().split('T')[0]
    });
  };

  if (mutation.isPending) return <p>Loading...</p>;

  return (
    <div className="main">
      <Header />
      <div className="container">
        <form className={mainClass} onSubmit={handleSubmit}>
          <h2>Create new post</h2>
          <div className={`${mainClass}__item`}>
            <label htmlFor="title">
              Title
            </label>
            <input
              type="text"
              className="input"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={`${mainClass}__item`}>
            <label htmlFor="content">
              Content
            </label>
            <textarea
              rows={10}
              className="input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button className="button" type="submit">
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
