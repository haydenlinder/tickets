import React from 'react';
import TicketQuery from './ticket_query';
import TicketTableContainer from './ticket_table_container';

const TicketIndex = () => (
  <div className="ticket-index-container">
    <TicketQuery />
    <TicketTableContainer />
  </div>
);

export default TicketIndex;