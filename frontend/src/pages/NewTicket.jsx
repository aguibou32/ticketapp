import { FaNotesMedical } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTicket, reset } from '../features/tickets/ticketSlice';
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";

function NewTicket() {

  const [formData, setFormData] = useState({
    product: 'iPhone', // We adding iPhone as default value because even though it looks selected on dropdown, it not selected, if you submit the form as it is, it will throw an error. It only works without selecting the iPhone if we set default value. As it is without a default value, the iPhone looks selected but it is not.
    description: ''
  })
  const { product, description } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(state => state.tickets);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
      navigate('/tickets');
    }

    dispatch(reset());

  }, [dispatch, navigate, isLoading, isError, isSuccess, message]);

  const onChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const ticketData = {
      product,
      description
    };

    // dispatch(createTicket(ticketData)); // Same as bellow
    dispatch(createTicket({ product, description }));
  }

  if (isLoading) {
    return <Spinner />
  }

  return <>

    <BackButton url='/' />

    <section className="heading">
      <h1><FaNotesMedical />Add Ticket</h1>
      <p>Fill in the form to add a ticket</p>
    </section>

    <div className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" value={user.name} disabled />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" value={user.email} disabled />
        </div>

        <div className="form-group">
          <select className="form-control" name="product" id="product" onChange={onChange} value={product}>
            <option value="iPhone">iPhone</option>
            <option value="Macbook Pro">Macbook Pro </option>
            <option value="iPad">iPad</option>
            <option value="iPod">iPod</option>
            <option value="Apple Watch">Apple Watch</option>
          </select>
        </div>
        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            name="description"
            id="description"
            onChange={onChange}
            value={description}
            placeholder="Description">
          </textarea>


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

export default NewTicket;