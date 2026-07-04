import { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { useLogin } from "../hooks/auth";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const login = useLogin();

  const [credientials, setCredientials] = useState({
    userName: "",
    password: "",
    rememberMe: false,
  });
  const [show, setShow] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    text: "",
    type: "",
  });
  const [isLoading, setLoading] = useState(false);

  

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, []);

  useEffect(() => {
    console.log("Credientials updated:", credientials);
  }, [credientials]);

  useEffect(() => {
    if (toastMessage.text && toastMessage.type) {
      setShow(true);
    }
  }, [toastMessage]);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setCredientials((prevCredientials) => ({
      ...prevCredientials,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let userName = credientials.userName.trim();
    let password = credientials.password.trim();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userName)) {
      userName = userName.toLowerCase();
    }
    if (!userName || !password) {
      setToastMessage({
        text: "Please fill in all fields.",
        type: "error",
      });
      return;
    }

    setLoading(true);

    const res = await login(userName, password, credientials.rememberMe);

    setLoading(false);

    if (res) {
      setToastMessage({
        text: res,
        type: "error",
      });
    } else {
      setToastMessage({
        text: "Login Successful!",
        type: "success",
      });
    }
  };
  return (
    <>
      <Toast
        show={show}
        onClose={() => setShow(false)}
        delay={3000}
        autohide
        style={{ top: "20px", right: "20px", zIndex: 9999 }}
        className={`position-fixed end-0 m-3 ${toastMessage.type === "success" ? "bg-success" : "bg-danger"}`}
      >
        <Toast.Body>
          <div className="w-100 d-flex align-items-center justify-content-between">
            <div className="text-light">{toastMessage.text}</div>
            <X
              size={20}
              onClick={() => setShow(false)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </Toast.Body>
      </Toast>

      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-black text-white py-5">
        <div className="container px-3">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className="card border-0 shadow-lg overflow-hidden rounded-4">
                <div className="row g-0">
                  <div className="col-lg-5 d-none d-lg-flex flex-column justify-content-between p-5 bg-dark text-white">
                    <div>
                      <h2 className="h3 fw-bold mb-3">
                        Welcome back to SnapNest
                      </h2>
                    </div>
                    <div>
                      <p className="small text-white-50 mb-0">
                        Secure access to your workspace with a modern login
                        experience built for reliability and speed.
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-7 p-5 bg-black text-white">
                    <div className="mb-4 text-center">
                      <h1 className="h4 fw-semibold mb-2">
                        Login to your account
                      </h1>
                      <p className="text-white-50 mb-0">
                        Enter your credentials to continue to the dashboard.
                      </p>
                    </div>

                    <form onSubmit={handleLogin}>
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control form-control-lg bg-secondary bg-opacity-10 text-white border-secondary rounded-3"
                          id="userName"
                          placeholder="Username"
                          value={credientials.userName}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="userName" className="text-white-50">
                          Username or Email
                        </label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control form-control-lg bg-secondary bg-opacity-10 text-white border-secondary rounded-3"
                          id="password"
                          placeholder="Password"
                          value={credientials.password}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="password" className="text-white-50">
                          Password
                        </label>
                      </div>

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="rememberMe"
                            checked={credientials.rememberMe}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label text-white-50"
                            htmlFor="rememberMe"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg w-100 mb-3 rounded-3"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div
                            className="spinner-border spinner-border-sm"
                            style={{ width: "1rem", height: "1rem" }}
                          />
                        ) : (
                          "Login"
                        )}
                      </button>

                      <div className="text-center">
                        <p className="small text-white-50 mb-0">
                          Need an account?{" "}
                          <Link to="/signup" className="text-white fw-semibold">
                            Sign up
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
