import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { CreateTaskForm } from "./CreateTaskForm";

type Prop = {
  isOpen: boolean;
  onOpenChange: () => void;
  refetchTasks: () => void;
  userId: string;
};
export function ModalCreateTaskForm({
  isOpen,
  onOpenChange,
  refetchTasks,
  userId,
}: Prop) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" placement="top">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Create task</ModalHeader>
            <ModalBody>
              <CreateTaskForm
                refetchTasks={refetchTasks}
                userId={userId}
                onClose={onClose}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
