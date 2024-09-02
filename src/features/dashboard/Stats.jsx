import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendar } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirimedStays, numDays, numCabins }) {
  // 1)

  const bookingsNum = bookings.length;

  // 2)

  const Sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3)
  const checkIn = confirimedStays.length;

  // 4)
  const Rate =
    confirimedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays + numCabins);

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        value={bookingsNum}
        color={"blue"}
        title="Bookings"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(Sales)}
        color={"green"}
        title="Sales"
      />
      <Stat
        icon={<HiOutlineCalendar />}
        value={checkIn}
        color={"indigo"}
        title="Check ins"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        value={Math.round(Rate * 100) + "%"}
        color={"yellow"}
        title="Occupancy Rate"
      />
    </>
  );
}

export default Stats;
