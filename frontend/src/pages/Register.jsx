import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function Register() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);  

  useEffect(() => {
    if(isError){
      toast.error(message)
    }
    
    // Redirect if logged in 
    if(isSuccess || user){
      navigate('/');
    }
    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch]);


  const onChange = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if(password !== password2){
      toast.error('Passwords do not match');
    }else{
      const userData = {
        name,
        email,
        password
      }
      dispatch(register(userData));
    }
  }

  if(isLoading){
    return <Spinner />
  }

  return <>
    <section className="heading">
      <h1>
        <FaUser /> Register
      </h1>

      <p>Please create an account</p>
    </section>

    <div className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" id="name" name="name" value={name} onChange={onChange} placeholder="Enter your name" className="form-control" required />
        </div>
        <div className="form-group">
          <input type="email" id="email" name="email" value={email} onChange={onChange} placeholder="Enter your email" className="form-control" required/>
        </div>
        <div className="form-group">
          <input type="password" name="password" value={password} onChange={onChange} placeholder="Enter password" className="form-control" required/>
        </div>
        <div className="form-group">
          <input type="password" name="password2" value={password2} onChange={onChange} placeholder="Confirm password" className="form-control" required/>
        </div>
        <div className="form-group">
          <button className="btn btn-block" disabled={isLoading}>
            Submit
          </button>
        </div>
      </form>
    </div>
  </>
}

export default Register;