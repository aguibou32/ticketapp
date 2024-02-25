import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTickets, reset } from '../features/tickets/ticketSlice';
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TicketItem from "../components/TicketItem";

function Tickets() {
  const { tickets, isError, message, isLoading, isSuccess } = useSelector((state) => state.tickets);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    }
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getTickets());

  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return <>
    <BackButton url='/' />
    <h1>Tickets</h1>

    <div className="tickets">
      <div className="ticket-headings">
        <div>Date</div>
        <div>Product</div>
        <div>Status</div>
        <div></div>
      </div>
      {tickets.map(ticket => {
        return <TicketItem key={ticket._id}  ticket={ticket} />
      })}
    </div>
  </>


}

export default Tickets;