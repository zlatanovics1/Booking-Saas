import styled from "styled-components";
import TodayItem from "./TodayItem";

const StyledTodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

function TodayList({ todaysBookings }) {
  return (
    <StyledTodayList>
      {todaysBookings.map((booking) => (
        <TodayItem booking={booking} key={booking.id} />
      ))}
    </StyledTodayList>
  );
}

export default TodayList;
