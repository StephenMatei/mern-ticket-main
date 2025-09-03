import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../features/auth/authSlice"; // <-- change to register
import { Footer, Loader } from "../../components";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

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

    if (password !== password2) {
      toast.error("Passwords do not match");
      return;
    }

    const userData = { name, email, password };

    dispatch(register(userData))
      .unwrap()
      .then((user) => {
        toast.success(`Welcome, ${user.name}!`);
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
        <h1 className="text-3xl font-bold mb-2">Sign Up</h1>
        <p className="text-accent">Create an account with Sammy-Kioko Events</p>
      </section>

      <section className="flex justify-center items-center px-4 pb-20">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6 border"
        >
          <div className="form-group">
            <input
              type="text"
              className="form-control w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
              required
            />
          </div>
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
          <div className="form-group">
            <input
              type="password"
              className="form-control w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirm password"
              required
            />
          </div>

          <div className="form-group flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-full shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
            >
              Sign Up
            </button>
          </div>

          <div className="text-center">
            <span className="text-primary">Already have an account? </span>
            <Link
              to={"/login"}
              className="text-primary font-semibold hover:text-accent"
            >
              Sign In
            </Link>
          </div>
        </form>
      </section>

      <Footer />
    </>
  );
}

export default SignUp;
