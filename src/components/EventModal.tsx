import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface EventModalProps {
  open: boolean;
  event: {
    title: string;
    description: string;
    options: Array<{
      label: string;
      isCorrect: boolean;
      feedback: string;
    }>;
  } | null;
  onChoice: (isCorrect: boolean, feedback: string) => void;
}

const EventModal = ({ open, event, onChoice }: EventModalProps) => {
  if (!event) return null;

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            ⚠️ {event.title}
          </DialogTitle>
          <DialogDescription className="text-base pt-4">
            {event.description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col gap-3 sm:flex-col">
          {event.options.map((option, index) => (
            <Button
              key={index}
              variant="action"
              size="lg"
              className="w-full"
              onClick={() => onChoice(option.isCorrect, option.feedback)}
            >
              {option.label}
            </Button>
          ))}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
