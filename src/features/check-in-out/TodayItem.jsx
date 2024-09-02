import styled from "styled-components";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import { Flag } from "../../ui/Flag";
import { Link } from "react-router-dom";

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

function TodayItem({ stay }) {
  const { id, status, guests, numNights } = stay;
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arraiving</Tag>}
      {status === "checked-in" && <Tag type="blue">Arraiving</Tag>}
      <Flag src={guests.countryFlag} alt="countryFlag" />
      <Guest>{guests.fullName}</Guest>
      <div>{numNights} Nights</div>

      {status === "unconfirmed" && (
        <Button
          variations={"primary"}
          sizes={"small"}
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
