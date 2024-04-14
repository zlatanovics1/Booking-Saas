import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import Button from "../ui/Button";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
  return (
    <Row>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin opens="modal">
          <Button>Add new cabin</Button>
        </AddCabin>
      </Row>
    </Row>
  );
}

export default Cabins;
