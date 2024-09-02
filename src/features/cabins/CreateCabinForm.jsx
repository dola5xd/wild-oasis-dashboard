import { useForm } from "react-hook-form";
import { useUptadeCabin } from "./useUptadeCabin";
import { useCreateCabin } from "./useCreateCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ editCabin = {}, onCloseModal }) {
  const { id: editID, ...editValues } = editCabin;

  const isEditSession = Boolean(editID);

  /*
  register => register input with name to database
  handleSubmit => on submiot funvtion
  reset => to reset all form inputs
  getValues => to get form inputs values
  formState => to get errors
  */

  const { register, handleSubmit, getValues, formState, reset } = useForm({
    // if we edit form we need default values if not then no nned for defult values
    defaultValues: isEditSession ? { ...editValues } : {},
  });

  const { errors } = formState;

  // for Create
  const { createCabin, isCreating } = useCreateCabin();

  // for Editing
  const { editingCabin, isEditing } = useUptadeCabin();

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      editingCabin(
        { data: { ...data, image }, id: editID },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label={"Cabin name"} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", { required: "this field is required!" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating || isEditing}
          {...register("maxCapacity", {
            required: "this field is required!",
            // min check if value greater than min value or not
            min: {
              value: 1,
              message: "This field must be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regulerPrice?.message}>
        <Input
          type="number"
          id="regulerPrice"
          disabled={isCreating || isEditing}
          {...register("regulerPrice", { required: "this field is required!" })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating || isEditing}
          defaultValue={0}
          {...register("discount", {
            required: "this field is required!",
            // validate => this function check if value is valid or not
            validate: {
              value: (value) =>
                Number(value) <= Number(getValues().regulerPrice) ||
                "This field must be equal or less than Reguler Price!",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isCreating || isEditing}
          {...register("description", { required: "this field is required!" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          disabled={isCreating || isEditing}
          {...register("image", {
            required: isEditSession ? false : "this field is required!",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variations="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating || isEditing}>
          {isEditSession ? "Edit cabin" : "Create cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
