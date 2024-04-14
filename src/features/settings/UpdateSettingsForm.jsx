import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { settings = {}, isLoading } = useSettings();

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings;

  const { updateSetting, isPending } = useUpdateSettings();

  function handleOnBlur(e, field) {
    const { value } = e.target;
    if (!value || +value === settings[field]) return;
    updateSetting({ [field]: value });
  }
  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) => handleOnBlur(e, "minBookingLength")}
          disabled={isPending}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleOnBlur(e, "maxBookingLength")}
          disabled={isPending}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleOnBlur(e, "maxGuestsPerBooking")}
          disabled={isPending}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleOnBlur(e, "breakfastPrice")}
          disabled={isPending}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
