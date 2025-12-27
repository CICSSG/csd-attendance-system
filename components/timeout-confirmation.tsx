import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function TimeoutConfirmation({
  isOpen,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onCancel();
      }}
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader className="h-12">
          <DialogTitle className="text-[#087830] text-lg text-center font-bold my-auto">Are you sure you want to Time Out?</DialogTitle>
        </DialogHeader>
        <DialogFooter className="bg-white gap-4 p-0 mb-4 *:w-24 *:h-10 mx-auto border-none">
          <Button onClick={onConfirm} className="bg-[#087830] hover:bg-[#065c24] text-white hover:cursor-pointer">
            Yes
          </Button>
          <Button variant={"outline"} onClick={onCancel} className="border border-[#087830] text-[#087830] hover:bg-[#e6f4ea] hover:cursor-pointer">
            No
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
