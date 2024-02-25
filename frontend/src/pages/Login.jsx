import { useEffect, useState } from "react"
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

function Login(){

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const {email, password} = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth);

  useEffect(() => {
    if(isError){
      toast.error(message);
    }

    if(isSuccess || user){
      navigate('/');
    }

    dispatch(reset());
  }, [user, isLoading, isError, isSuccess, message]);

  const onChange = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email, 
      password
    }
    dispatch(login(userData));
  };

  if(isLoading){
    return <Spinner/>
  }

  return <>
  <section className="heading">
    <h1>
      <FaSignInAlt /> Login
    </h1>
    <p>Please log in to get support</p>
  </section>

  <div className="form">
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <input type="email" id="email" name="email" value={email} onChange={onChange} placeholder="Enter your email" className="form-control" required/>
      </div>
      <div className="form-group">
        <input type="password" name="password" value={password} onChange={onChange} placeholder="Enter password" className="form-control" required/>
      </div>
      <div className="form-group">
        <button className="btn btn-block">
          Submit
        </button>
      </div>
    </form>
  </div>
</>
}

export default Login;