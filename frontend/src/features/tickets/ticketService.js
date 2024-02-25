import axios from 'axios';

const API_URL = 'api/tickets/';

// Create a ticket
const createTicket = async (ticketData, token) => {
  // console.log(ticketData);

  const config = {
    headers: {
      Authorization: `Bearer ${token} `
    }
  }

  const response = await axios.post(API_URL, ticketData, config);
  // console.log(response);

  return response.data;
}

// Get user tickets
const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token} `
    }
  }

  const response = await axios.get(API_URL, config);
  // console.log(response.data);

  return response.data;
}

const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token} `
    }
  };

  try {
    const response = await axios.get(`${API_URL}${ticketId}`, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching ticket:', error);
    throw error;
  }
};

const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token} `
    }
  };

  try {
    const response = await axios.put(`${API_URL}${ticketId}`,{status:'closed'}  , config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching ticket:', error);
    throw error;
  }
};

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket
}

export default ticketService;