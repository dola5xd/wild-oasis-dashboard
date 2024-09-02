import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabin } from "./useCabin";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, error, cabins } = useCabin();
  const [current] = useSearchParams();
  const filter = current.get("discount") || "all";

  let filterdCabins;

  if (filter === "all") {
    filterdCabins = cabins;
  }
  if (filter === "no-discount") {
    filterdCabins = cabins.filter((item) => item.discount === 0);
  }

  if (filter === "with-discount") {
    filterdCabins = cabins.filter((item) => item.discount > 0);
  }

  const sort = current.get("sort") || "name-asc";

  const [field, direction] = sort.split("-");

  let sortedCabins = filterdCabins;

  if (direction === "asc") {
    sortedCabins = sortedCabins?.sort((a, b) => a[field] - b[field]);
  }
  if (direction === "desc") {
    sortedCabins = sortedCabins?.sort((a, b) => b[field] - a[field]);
  }

  if (isLoading) return <Spinner />;
  if (error) return <Empty resource={"Bookings"} />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
