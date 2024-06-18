import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import Header from '../header/Header';

const SERVER_URL = 'http://localhost:3000/posts';

const mainClass = 'form';

const EditPost = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>('');
  const navigate = useNavigate();

  const { slug } = useParams();

  const {data} = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch(`${SERVER_URL}?id=${slug}`).then((res) =>
        res.json(),
      ),
  })

  const post = useMemo(() => {
    return data && data[0];
  }, [data])

  useEffect(() => {
    post?.title && setTitle(post?.title);
    post?.content && setContent(post?.content);
  }, [post]);

  const mutation = useMutation({
    mutationFn: (newPost: {}) => {
      return fetch(`${SERVER_URL}/${slug}`, {
        method: "PUT",
        body: JSON.stringify(newPost),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r: any) => {
          toast.success('Post edited!');
          navigate(`/post/${slug}`, {replace: true});
        })
        .catch((err) => {
          toast.error(`Post editing failed due to ${err.message}`);
        })
    },
  })

  const mutationDelete = useMutation({
    mutationFn: () => {
      return fetch(`${SERVER_URL}/${slug}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r: any) => {
          toast.success('Post deleted!');
          navigate(`/`, {replace: true});
        })
        .catch((err) => {
          toast.error(`Post deleting failed due to ${err.message}`);
        })
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({
      title: title,
      content: content,
      published_date: post.published_date
    });
  };

  if (mutation.isPending || mutationDelete.isPending) return <p>Loading...</p>;

  return (
    <div className="main">
      <Header />
      <div className="container">
        <form className={mainClass} onSubmit={handleSubmit}>
          <div className={`${mainClass}__header`}>
            <h2>Edit post</h2>
            <button
              className="button button_bordered"
              onClick={mutationDelete.mutate}>
              Delete post
            </button>
          </div>
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
              required
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
              required
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button className="button" type='submit'>
            Edit Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
