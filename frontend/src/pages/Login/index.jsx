import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { Footer, Loader } from "../../components";
import "../shared/Shared.css";
import { SecondaryBtn } from "../../components";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.auth);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = { email, password };

    dispatch(login(userData))
      .unwrap()
      .then((user) => {
        toast.success(`Logged in as ${user.name}`);
        navigate("/dashboard");
      })
      .catch(toast.error);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section className="pt-24 pb-10 text-center text-primary">
        <h1 className="text-3xl font-bold mb-2">Sign In</h1>
        <p className="text-accent">Please log in to Sammy-Kioko Events</p>
      </section>

      <section className="flex justify-center items-center px-4 pb-20">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6 border"
        >
          <div className="form-group">
            <input
              type="email"
              className="form-control w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter password"
              required
            />
          </div>
         <div className="form-group flex justify-center">
  <button
    type="submit"
    className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
  >
    Sign In
  </button>
</div>

          <div className="text-center">
            <span className="text-primary">Don't have an account? </span>
            <Link
              to={"/register"}
              className="text-primary font-semibold hover:text-accent"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </section>

      <Footer />
    </>
  );
}

export default Login;
