import { useCheckInBooking } from "./useCheckInBooking";
import { useEffect, useState } from "react";
import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBooking } from "../bookings/useGetBooking";
import { formatCurrency } from "../../utils/helpers";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { data: booking = {}, isLoading } = useGetBooking();
  const { isLoading: isMutating, mutate } = useCheckInBooking();
  const { settings = {}, isLoading: isLoadingSettings } = useSettings();
  const [hasPaid, setHasPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  useEffect(
    function () {
      setHasPaid(booking.isPaid ?? false);
    },
    [booking]
  );

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice = numNights * settings.breakfastPrice;

  function handleCheckin() {
    if (!hasPaid) return;
    if (addBreakfast) {
      mutate({
        hasBreakfast: true,
        extrasPrice: optionalBreakfastPrice,
        totalPrice: totalPrice + optionalBreakfastPrice,
      });
    } else mutate();
  }

  if (isLoading || isLoadingSettings) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={addBreakfast}
          onChange={() => {
            setAddBreakfast((state) => !state);
            setHasPaid(false);
          }}
          id={bookingId}
        >
          Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
        </Checkbox>
      </Box>

      <Box>
        <Checkbox
          checked={hasPaid}
          onChange={() => setHasPaid((state) => !state)}
          disabled={hasPaid}
          id={bookingId}
        >
          I confirm that {guests.fullName} has paid total amount{" "}
          {addBreakfast
            ? `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={isMutating || !hasPaid}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
