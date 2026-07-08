import { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";
import { X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useSignup } from "../hooks/auth";
import { useToaster } from "../hooks/toast";

const Signup = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const signup = useSignup();
  const toast = useToaster();

  const [credientials, setCredientials] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, []);

  useEffect(() => {
    document.title = "Login - SnapNest";
  }, []);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setCredientials((prevCredientials) => ({
      ...prevCredientials,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    let userName = credientials.userName.trim();
    let email = credientials.email.trim().toLowerCase();
    let password = credientials.password.trim();
    if (!userName || !email || !password) {
      return toast("Please fill in all fields.", "danger");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return toast("Please enter a valid email address.", "danger");
      
    }
    if (password.length < 6) {
      return toast("Password must be at least 6 characters long.", "danger");
      
    }

    setLoading(true);
    const res = await signup(userName, email, password);
    setLoading(false);
    if (res) {
      return toast(res, "danger");
      
    } else {
      toast("Signup successful!", "success");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-black text-white py-5">
      <div className="container px-3">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10">
            <div className="card border-0 shadow-lg overflow-hidden rounded-4">
              <div className="row g-0">
                <div className="col-lg-5 d-none d-lg-flex flex-column justify-content-between p-5 bg-dark text-white">
                  <div>
                    <h2 className="h3 fw-bold mb-3">Welcome to SnapNest</h2>
                  </div>
                  <div>
                    <p className="small text-white-50 mb-0">
                      Join SnapNest and unlock seamless collaboration with
                      enterprise-grade security and performance.
                    </p>
                  </div>
                </div>

                <div className="col-lg-7 p-5 bg-black text-white">
                  <div className="mb-4 text-center">
                    <h1 className="h4 fw-semibold mb-2">Create Your Account</h1>
                    <p className="text-white-50 mb-0">
                      Get started in minutes and access your workspace.
                    </p>
                  </div>

                  <form onSubmit={handleSignup}>
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
                        Username
                      </label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control form-control-lg bg-secondary bg-opacity-10 text-white border-secondary rounded-3"
                        id="email"
                        placeholder="name@example.com"
                        value={credientials.email}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="email" className="text-white-50">
                        Email address
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
                        "Create Account"
                      )}
                    </button>

                    <div className="text-center">
                      <p className="small text-white-50 mb-0">
                        Already have an account?{" "}
                        <Link
                          to="/login"
                          className="btn btn-link text-white p-0 small"
                        >
                          Sign In
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
  );
};

export default Signup;
