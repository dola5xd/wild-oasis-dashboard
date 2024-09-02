import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;
  text-transform: capitalize;
  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
function Filter({ setValue, buttonValues }) {
  const [searchParams, setParams] = useSearchParams();

  const filterSearch = searchParams.get(setValue) || buttonValues.at(0);

  function handelClick(value) {
    searchParams.set(setValue, value);
    searchParams.set("page", 1);
    setParams(searchParams);
  }

  return (
    <StyledFilter>
      {buttonValues?.map((btn, i) => (
        <FilterButton
          key={i}
          onClick={() => handelClick(btn.value)}
          active={+(btn.value === filterSearch)}
          disabled={+(btn.value === filterSearch)}
        >
          {btn.label.replace("-", " ")}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
