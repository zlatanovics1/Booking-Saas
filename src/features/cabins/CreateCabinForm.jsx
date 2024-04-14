import { useForm } from "react-hook-form";
import { useCreateEditCabin } from "./useCreateEditCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const editSeason = Boolean(editId);

  const { mutate, isPending } = useCreateEditCabin(editSeason);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: editSeason ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    const newCabin = {
      ...data,
      image,
      regularPrice: +data.regularPrice,
      discount: +data.discount,
      maxCapacity: data.maxCapacity,
    };
    mutate(
      { newCabin, id: editId },
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
      <FormRow label="Cabin's name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isPending}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isPending}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity has to be greater than 0",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isPending}
          {...register("regularPrice", {
            required: "This field is required",
            validate: (value) =>
              +value >= 0 || "Regular price should be a positive value",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isPending}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              (+value < +getValues().regularPrice && +value >= 0) ||
              "Discount should be a positive value and less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          disabled={isPending}
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          disabled={isPending}
          accept="image/*"
          {...register("image", {
            required: !editSeason && "This field is required",
          })}
        />
      </FormRow>

      <FormRow type="buttons">
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isPending}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isPending}>
          {`${editSeason ? "Edit" : "Create"} cabin`}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
