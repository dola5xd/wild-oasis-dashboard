import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

import Spinner from "../../ui/Spinner";
import { useForm } from "react-hook-form";
import { useUptadeSettings } from "./useUptadeSettings";

function UpdateSettingsForm() {
  const { handleSubmit, register } = useForm();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { mutate, isLoading: isUptading } = useUptadeSettings();

  const {
    isLoading,
    data: { maxNights, maxBookings, maxGuests, breakfastPrice } = {},
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  if (isLoading || error) return <Spinner />;

  function onSubmit(data) {
    console.log("data: ", data);
    mutate({ ...data });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={maxNights}
          {...register("maxNights")}
          disabled={isUptading}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookings}
          {...register("maxBookings")}
          disabled={isUptading}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuests}
          {...register("maxGuests")}
          disabled={isUptading}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          {...register("breakfastPrice")}
          disabled={isUptading}
        />
      </FormRow>
      <FormRow>
        <Button disabled={isUptading}>Uptade</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
