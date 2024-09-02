import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useCabin } from "../cabins/useCabin";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const { isLoading, bookings } = useRecentBookings();
  const { isLoading: staysLoading, confirimedStays, Days } = useRecentStays();

  const { isLoading: LoadingCabins, cabins } = useCabin();
  if (isLoading || staysLoading || LoadingCabins) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirimedStays={confirimedStays}
        numDays={Days}
        numCabins={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirimedStays={confirimedStays} />
      <SalesChart bookings={bookings} numDays={Days} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
