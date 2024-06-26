import React, { useState, FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../state/state';

const mainClass = 'form';

const SERVER_URL = 'http://localhost:3000/users';

const Registr = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const {login} = useAuthStore();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: any) => {
      return fetch(SERVER_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r: any) => {
          toast.success('Registered successfully');
          localStorage.setItem('accessToken', data?.id);
          login();
          navigate('/');
        })
        .catch((err) => {
          toast.error(`Registration failed due to ${err.message}`);
        })
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {email, name, password, id: email};
    mutation.mutate(data);
  };

  if (mutation.isPending) return <p>Loading...</p>;

  return (
    <>
      <div className="container">
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className={mainClass}
        >
          <div className={`${mainClass}__item`}>
            <label htmlFor="exampleInputPassword1">
              User name
            </label>
            <input
              type="text"
              value={name}
              autoComplete="false"
              className="input"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={`${mainClass}__item`}>
            <label htmlFor="exampleInputEmail1">
              Email address
            </label>
            <input
              type="email"
              className="input"
              id="exampleInputEmail1"
              value={email}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
    </>
  )
};

export default Registr;
