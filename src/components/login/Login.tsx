import React, { useState, FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAuthStore from '../../state/state';
import { useNavigate } from 'react-router-dom';

const mainClass = 'form';

const SERVER_URL = 'http://localhost:3000/users';

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {login} = useAuthStore();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${SERVER_URL}/${email}`)
        .then((res: any) => {
          return res.json()
        })
        .then((resp: any) => {
          if (Object.keys(resp || {}).length === 0) {
            toast.error('Please enter correct email');
          } else {
            if (resp.password === password) {
              toast.success('Login successfully');
              localStorage.setItem('accessToken', resp.id);
              login();
              navigate('/');
            } else {
              toast.success('Please enter correct password');
            }
          }
        })
        .catch((err) => {
          toast.error(`Login failed due to ${err.message}`);
        })
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
  };

  if (mutation.isPending) return <p>Loading...</p>;

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className={mainClass}>
          <div className={`${mainClass}__item`}>
            <label htmlFor="exampleInputEmail1">
              Email address
            </label>
            <input
              type="email"
              className="input"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={`${mainClass}__item`}>
            <label htmlFor="exampleInputPassword1">
              Password
            </label>
            <input
              type="password"
              className="input"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
    </>
)};

export default Login;
