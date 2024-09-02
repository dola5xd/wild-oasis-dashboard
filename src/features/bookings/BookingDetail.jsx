import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import Empty from "../../ui/Empty";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate, useParams } from "react-router-dom";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useCheckOut } from "../check-in-out/useCheckOut";
import { BsBoxArrowInUp } from "react-icons/bs";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { isLoading, bookingData } = useBooking(bookingId);

  const { isCheckOut, checkOut } = useCheckOut();

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;
  if (!bookingData) return <Empty resource="Booking" />;

  const { status } = bookingData;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={bookingData} />

      <ButtonGroup>
        {status === "unconfirmed" ? (
          <Button
            variations="primary"
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            Check in
          </Button>
        ) : (
          status !== "checked-out" && (
            <Button
              variations="primary"
              icon={<BsBoxArrowInUp />}
              onClick={() => checkOut(bookingId)}
              disabled={isCheckOut}
            >
              Check out
            </Button>
          )
        )}
        <Button variations="danger" onClick={moveBack}>
          Delete booking
        </Button>
        <Button variations="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
