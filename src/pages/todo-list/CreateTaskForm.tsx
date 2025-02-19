import {
  DatePicker,
  TimeInput,
  Input,
  Button,
  RadioGroup,
  Radio,
  Spinner,
} from "@heroui/react";
import { useActionState } from "react";
import { createTaskAction } from "./actions";

export function CreateTaskForm({
  refetchTasks,
  userId,
  onClose,
}: {
  refetchTasks: () => void;
  userId: string;
  onClose: () => void;
}) {
  const [state, dispatch, isPending] = useActionState(
    createTaskAction({ refetchTasks, userId, onClose }),
    { title: "" }
  );

  return (
    <form className="flex flex-col gap-2" action={dispatch}>
      <Input
        isRequired
        errorMessage="Please enter task description"
        labelPlacement="outside"
        name="title"
        placeholder="Enter task description"
        type="text"
      />

      <DatePicker
        className="max-w-[284px]"
        label="Date"
        name="date"
        isRequired
        labelPlacement={"outside-left"}
        selectorButtonPlacement="start"
        errorMessage="Please enter a valid date."
      />

      <TimeInput
        isRequired
        label="Time"
        name="time"
        labelPlacement={"outside-left"}
        hourCycle={24}
        granularity="minute"
      />

      <RadioGroup
        label="Set Priorities"
        orientation="horizontal"
        name="priorities"
        isRequired
      >
        <Radio value="Low" color="success">
          Low
        </Radio>
        <Radio value="Medium" color="warning">
          Medium
        </Radio>
        <Radio value="High" color="danger">
          High
        </Radio>
      </RadioGroup>

      <div className="flex gap-2">
        <Button color="primary" type="submit" disabled={isPending}>
          {isPending ? <Spinner size="md" color="danger" /> : "Submit"}
        </Button>
        <Button type="reset" variant="flat" disabled={isPending}>
          Reset
        </Button>
      </div>
      {state.error && <p className="text-rose-500">{state.error}</p>}
    </form>
  );
}
