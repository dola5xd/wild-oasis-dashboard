import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open>
        <Button>Add new Cabin</Button>
      </Modal.Open>
      <Modal.Window>
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

/* 
<Button onClick={() => setShowForm(true)}>Add new Cabin</Button>
    {showForm && (
        <Modal onClose={() => setShowForm(false)}>
            <CreateCabinForm onCloseModal={() => setShowForm(false)} />
        </Modal>
        )}
*/

export default AddCabin;
