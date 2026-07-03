import React from "react";

const Login = () => {
  return (
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
                      Sign in to your account
                    </h1>
                    <p className="text-white-50 mb-0">
                      Enter your credentials to continue to the dashboard.
                    </p>
                  </div>

                  <form>
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control form-control-lg bg-secondary bg-opacity-10 text-white border-secondary rounded-3"
                        id="email"
                        placeholder="name@example.com"/>
                      <label htmlFor="email" className="text-white-50">
                        Email address
                      </label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        className="form-control form-control-lg bg-secondary bg-opacity-10 text-white border-secondary rounded-3"
                        id="password"
                        placeholder="Password"/>
                      <label htmlFor="password" className="text-white-50">
                        Password
                      </label>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rememberMe"/>
                        <label
                          className="form-check-label text-white-50"
                          htmlFor="rememberMe">
                          Remember me
                        </label>
                      </div>
                      <button
                        type="button"
                        className="btn btn-link text-white-50 p-0 small">
                        Forgot password?
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-lg w-100 mb-3 rounded-3">
                      Sign In
                    </button>

                    <div className="text-center">
                      <p className="small text-white-50 mb-0">
                        Need an account?{" "}
                        <button
                          type="button"
                          className="btn btn-link text-white p-0 small">
                          Sign up
                        </button>
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

export default Login;
