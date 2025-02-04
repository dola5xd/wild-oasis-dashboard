import Sorting from "../../ui/Sorting";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        setValue="status"
        buttonValues={[
          { value: "all", label: "all" },
          { value: "checked-out", label: "checked out" },
          { value: "checked-in", label: "checked in" },
          { value: "unconfirmed", label: "unconfirmed" },
        ]}
      />

      <Sorting
        Options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
