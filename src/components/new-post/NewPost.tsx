import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import Header from '../header/Header';
const SERVER_URL = 'http://localhost:3000/posts'

const mainClass = 'form';

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
    <div className="main">
      <Header />
      <form className={mainClass} onSubmit={handleSubmit}>
        <h2 className="heading">Create new post</h2>
        <div className={`${mainClass}__item`}>
          <label htmlFor="title" className="label">
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
          <label htmlFor="content" className="label">
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
  );
};

export default EditPost;
