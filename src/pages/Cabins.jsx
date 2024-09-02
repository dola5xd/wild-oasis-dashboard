import Heading from "../ui/Heading.jsx";
import Row from "../ui/Row";
import TableOperations from "../ui/TableOperations";

import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin.jsx";
import Filter from "../ui/Filter.jsx";
import Sorting from "../ui/Sorting.jsx";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <TableOperations>
          <Filter
            setValue="discount"
            buttonValues={[
              { value: "all", label: "all" },
              { value: "no-discount", label: "no discount" },
              { value: "with-discount", label: "with discount" },
            ]}
          />
          <Sorting
            Options={[
              { value: "name-asc", label: "Sort by name A-Z" },
              { value: "name-desc", label: "Sort by name Z-A" },
              { value: "regularPrice-asc", label: "Sort by price (low first)" },
              {
                value: "regularPrice-desc",
                label: "Sort by price (high first)",
              },
              {
                value: "maxCapacity-asc",
                label: "Sort by Capacity (low first)",
              },
              {
                value: "maxCapacity-desc",
                label: "Sort by Capacity (high first)",
              },
            ]}
          />
        </TableOperations>
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
