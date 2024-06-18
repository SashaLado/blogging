import React, { useState, FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAuthStore from '../../state/state';
import { useNavigate } from 'react-router-dom';

const SERVER_URL = 'http://localhost:3000/users'

const Login = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const {login} = useAuthStore()
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${SERVER_URL}/${email}`)
        .then((res: any) => {
          return res.json()
        })
        .then((resp: any) => {
          if (Object.keys(resp || {}).length === 0) {
            toast.error('Please enter correct email')
          } else {
            if (resp.password === password) {
              toast.success('Login successfully')
              localStorage.setItem('accessToken', resp.id);
              login()
              navigate('/')
            } else {
              toast.success('Please enter correct password')
            }
          }
        })
        .catch((err) => {
          toast.error(`Login failed due to ${err.message}`)
        })
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation.mutate()
  };

  if (mutation.isPending) return <p>Loading...</p>;

  return (
    <>
      <div className="card my_login_card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
)};

export default Login;
