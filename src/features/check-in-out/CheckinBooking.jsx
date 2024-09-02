import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import CheckBox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { useCheckIn } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmdPaid, setConfirmdPaid] = useState(false);
  const [addBreakfast, setBreakfast] = useState(false);

  const moveBack = useMoveBack();

  const { bookingId } = useParams();
  const { isLoading, bookingData: booking } = useBooking(bookingId);
  const { isCheckIn, checkIn } = useCheckIn();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => setConfirmdPaid(booking?.isPaid ?? false), [booking]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  const { id, guests, totalPrice, hasBreakfast, numNights } = booking;

  const totalPriceWithBreakfast =
    settings.breakfastPrice * numNights + totalPrice;

  function handleCheckin() {
    if (!confirmdPaid) return;

    if (addBreakfast) {
      checkIn({
        id,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: settings.breakfastPrice,
          totalPrice: totalPriceWithBreakfast,
        },
      });
    } else {
      checkIn({ id, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <CheckBox
            checked={addBreakfast}
            disabled={addBreakfast}
            onChange={() => {
              setConfirmdPaid(false);
              setBreakfast((prev) => !prev);
            }}
            id={"breakfast"}
          >
            Want to add breakfast for {settings.breakfastPrice}?
          </CheckBox>
        </Box>
      )}

      <Box>
        <CheckBox
          checked={confirmdPaid}
          disabled={confirmdPaid || isCheckIn}
          onChange={() => setConfirmdPaid((confirm) => !confirm)}
          id={"confirm"}
        >
          I confirmd that <strong>{guests.fullName}</strong> has paid{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPriceWithBreakfast)} (${formatCurrency(
                totalPrice
              )} + ${formatCurrency(settings.breakfastPrice)})`}
          .
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmdPaid || isCheckIn} onClick={handleCheckin}>
          Check in booking #{id}
        </Button>
        <Button variations="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
