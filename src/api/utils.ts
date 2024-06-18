import { useQuery } from '@tanstack/react-query';

const SERVER_URL = 'http://localhost:3000/posts'

export const fetchAllPosts = (query?: string, type?: string) => {
  query ? (query = `?${query}`) : (query = '')
  // fetch(`${SERVER_URL}${query}`)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     setLoading(false);
  //     setPosts(type === 'POST' ? data[0] : data);
  //   })
  //   .catch((err) => console.error(err));

  // return useQuery({
  //   queryKey: ['repoData'],
  //   queryFn: () =>
  //     fetch(`${SERVER_URL}${query}`).then((res) =>
  //       res.json(),
  //     ),
  // })
};

export const fetchPostContent = (id: string, type: string) => fetchAllPosts(`id=${id}`, type)
