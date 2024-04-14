import styled from "styled-components";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { useTodayActivity } from "./useTodayActivity";
import Spinner from "../../ui/Spinner";
import TodayList from "./TodayListItems";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity() {
  const { todaysBookings, isLoadingTodaysBookings } = useTodayActivity();

  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>
      {isLoadingTodaysBookings ? (
        <Spinner />
      ) : todaysBookings.length > 0 ? (
        <TodayList todaysBookings={todaysBookings} />
      ) : (
        <NoActivity>No activites at the moment...</NoActivity>
      )}
    </StyledToday>
  );
}

export default TodayActivity;
