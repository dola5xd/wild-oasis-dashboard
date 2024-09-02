import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import { useForm } from "react-hook-form";
import { addEditCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const queryClint = useQueryClient();

  /*
  register => register input with name to database
  handleSubmit => on submiot funvtion
  reset => to reset all form inputs
  getValues => to get form inputs values
  formState => to get errors
  */
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => addEditCabin(data),
    onSuccess: () => {
      toast.success("Cabin has been created Succesfully!");
      queryClint.invalidateQueries({
        queryKey: ["Cabins"],
      });
      reset();
    },
    onError: () => toast.error("Falid to create new cabin!"),
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }
  //  Not very important but it exist
  function onError(error) {
    // console.log(error);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label={"Cabin name"} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register("name", { required: "this field is required!" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isLoading}
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
          disabled={isLoading}
          {...register("regulerPrice", { required: "this field is required!" })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isLoading}
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
          disabled={isLoading}
          {...register("description", { required: "this field is required!" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          disabled={isLoading}
          {...register("image", { required: "this field is required!" })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variations="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
