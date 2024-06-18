import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
const SERVER_URL = 'http://localhost:3000/posts'

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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

  useEffect(() => {
    post?.title && setTitle(post?.title)
    post?.content && setContent(post?.content)
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
    },
  })

  const mutationDelete = useMutation({
    mutationFn: (newPost: {}) => {
      return fetch(`${SERVER_URL}/${slug}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation.mutate({ title: title, content: content, published_date: post.published_date})
  };

  if (mutation.isPending || mutationDelete.isPending) return <p>Loading...</p>;

  return (
    <div>
      <main className='main'>
        {mutation.isError || mutationDelete.isError ? (
          <div>oops... something went wrong</div>
        ) : null}

        {mutation.isSuccess ? <div>Post added! <Link to={`/post/${slug}`}>Go back to the post</Link></div> : null}

        {mutationDelete.isSuccess ? <div>Post deleted! <Link to={`/`}>Go back to all posts</Link></div> : null}

        <button onClick={mutationDelete.mutate}>Delete post</button>

        {!mutationDelete.isSuccess ? (
          <>
            <h2 className='heading'>Edit post</h2>
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
                Edit Post
              </button>
            </form>
          </>
        ) : null}
      </main>
    </div>
  );
};

export default EditPost;
