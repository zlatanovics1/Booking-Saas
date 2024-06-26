import { Link } from "react-router-dom";
import styled from "styled-components";
import Tag from "../../ui/Tag";
import Flag from "../../ui/Flag";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";

import { useCheckOutBooking } from "./useCheckOutBooking";
const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ booking }) {
  const { id, status, guests, numNights } = booking;
  const { isLoading, mutate: checkOut } = useCheckOutBooking();
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}
      <Flag
        src={guests.countryFlag}
        alt={`Flag of guest's country (${guests.nationality})`}
      />
      <Guest>{guests.fullName}</Guest>
      <div>{numNights}</div>
      {status === "unconfirmed" ? (
        <Button size="small" as={Link} to={`/checkin/${id}`}>
          {isLoading ? <SpinnerMini /> : "Check in"}
        </Button>
      ) : (
        <Button size="small" onClick={() => checkOut(id)}>
          {isLoading ? <SpinnerMini /> : "Check out"}
        </Button>
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
