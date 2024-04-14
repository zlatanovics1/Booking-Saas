import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin({ opens, children }) {
  return (
    <Modal>
      <Modal.Open opensWindowName={opens}>{children}</Modal.Open>
      <Modal.Window windowName={opens}>
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
