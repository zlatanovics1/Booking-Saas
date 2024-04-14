import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin,";
import { useCreateEditCabin } from "./useCreateEditCabin";

import {
  HiEllipsisVertical,
  HiPencil,
  HiSquare2Stack,
  HiTrash,
} from "react-icons/hi2";
import CreateCabinForm from "./CreateCabinForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 8rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);

  &:has(span) {
    margin-left: 2rem;
  }
`;

function CabinRow({ cabin }) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  const { mutateDelete, isDeleting } = useDeleteCabin();
  const { mutate: mutateCreate, isPending: isDuplicating } =
    useCreateEditCabin();

  function handleDuplicate() {
    const duplicateCabin = {
      name: `${name.startsWith("Copy") ? name : `Copy of cabin ${name}`}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
    };
    mutateCreate({ newCabin: duplicateCabin });
  }

  function handleDelete() {
    mutateDelete(cabinId);
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>{maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>
          {discount ? formatCurrency(discount) : <span>&mdash;</span>}
        </Discount>
        <div>
          <Menus>
            <Modal>
              <Menus.Menu>
                <Menus.Toggle id={cabinId}>
                  <HiEllipsisVertical />
                </Menus.Toggle>
                <Menus.List id={cabinId}>
                  <Menus.Button
                    onClick={handleDuplicate}
                    icon={<HiSquare2Stack />}
                  >
                    Duplicate
                  </Menus.Button>
                  <Modal.Open opensWindowName="edit">
                    <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                  </Modal.Open>

                  <Modal.Open opensWindowName="delete">
                    <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                  </Modal.Open>
                </Menus.List>
              </Menus.Menu>

              <Modal.Window windowName="edit">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>

              <Modal.Window windowName="delete">
                <ConfirmDelete
                  resourceName={`cabin ${name}`}
                  disabled={isDeleting}
                  onConfirm={handleDelete}
                />
              </Modal.Window>
            </Modal>
          </Menus>
        </div>
      </TableRow>
    </>
  );
}

export default CabinRow;
