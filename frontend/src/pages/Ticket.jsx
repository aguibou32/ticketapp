import { useSelector, useDispatch } from 'react-redux';
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice';
import BackButton from '../components/BackButton';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

function Ticket() {
  const { ticket, isError, message, isLoading, isSuccess } = useSelector((state) => state.tickets);
  const { ticketId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
  }, [dispatch, ticketId, isError, message]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success('Ticket Closed');

    
    navigate('/tickets');
  }

  if (isLoading || !ticket) {
    return <Spinner />;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        {ticket.status !== 'closed' && <button onClick={onTicketClose} className='btn btn-block btn-danger'>Close</button>}
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>{ticket.status}</span>
        </h2>
        <h3>{ticket.product}</h3>
        <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
    </div>
  );
}

export default Ticket;
