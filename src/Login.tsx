import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    navigate("/chat");
  };

  const getUsername = () => {
    setLoading(true);
    try {
      const username = localStorage.getItem("username");

      return username;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (getUsername()) {
      navigate("/chat");
    } else {
      return;
    }
  });

  if (loading) {
    return <p>Loading .....</p>;
  }
  return (
    <main className="main-container">
      <div className="main-content">
        <h1 className="header-text">Stark Chat</h1>

        <form onSubmit={handleSubmit} className="form">
          <label className="form-label" htmlFor="username">
            username
          </label>
          <input
            type="text"
            placeholder="enter a username"
            name="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
