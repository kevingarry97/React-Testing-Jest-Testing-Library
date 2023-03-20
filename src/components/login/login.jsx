import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({username: '', password: ''});
    const [user, setUser] = useState({})

    const handleChange = ({target}) => {
        setData({...data, [target.name]: target.value});
    }

    const handleClick = async (e) => {
        setLoading(true)
        e.preventDefault();

        try {
            const {data} = await axios.get("https://jsonplaceholder.typicode.com/users/1");
            setUser(data)
        } catch (err) {
            setError(true)
        }
        setLoading(false);
    }

  return (
    <div className="container">
        <span className='user'>{user.name}</span>
      <form>
        <input
          type="text"
          placeholder="username"
          name='username'
          value={data.username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name='password'
          value={data.password}
          onChange={handleChange}
        />
        <button disabled={!data.username || !data.password} onClick={handleClick}>
          {loading ? 'Please Wait' : 'Login'}
        </button>
        <span
          data-testid="error"
          style={{ visibility: error ? "visible" : "hidden" }}
        >
          Something went wrong!
        </span>
      </form>
    </div>
  )
}

export default Login