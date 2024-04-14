import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";

/*
PARAMS:
discount // all / with-discount / no-discount
sortBy // name-asc/desc % regularPrice-asc/desc % maxCapacity-asc/desc
*/

function CabinTable() {
  const { cabins, isLoading, error } = useCabins();
  const [searchParams] = useSearchParams();
  const currentDiscountParam = searchParams.get("discount") || "all";
  const currentSortParam = searchParams.get("sortBy") || "startDate-asc";

  if (isLoading) return <Spinner />;
  let filterCabinsData = cabins;
  // 1.FILTER
  if (currentDiscountParam === "with-discount")
    filterCabinsData = cabins.filter((cabin) => cabin.discount > 0);
  if (currentDiscountParam === "no-discount")
    filterCabinsData = cabins.filter((cabin) => cabin.discount === 0);
  // 2.SORT
  const [field, direction] = currentSortParam.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filterCabinsData.sort(
    (a, b) => a[field] - b[field] * modifier
  );
  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>cabin</div>
        <div>capacity</div>
        <div>price</div>
        <div>discount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={sortedCabins}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
}

export default CabinTable;
