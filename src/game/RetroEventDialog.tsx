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

  // Warning icon as pixel art placeholder
  const WarningIcon = () => (
    <div className="relative w-8 h-8 mx-auto mb-4">
      <div
        className="absolute inset-0 bg-yellow-500 border-4 border-yellow-700"
        style={{
          clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 w-1 h-3 bg-black" />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-black" />
    </div>
  );

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[500px] retro-border bg-card pixel-perfect">
        <DialogHeader>
          <WarningIcon />
          <DialogTitle className="text-2xl text-center uppercase tracking-wider font-bold">
            {event.title}
          </DialogTitle>
          <DialogDescription className="text-base pt-4 text-center font-mono">
            {event.description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col gap-3 sm:flex-col mt-4">
          {event.options.map((option, index) => (
            <Button
              key={index}
              variant="default"
              size="lg"
              className="w-full retro-border bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-wide retro-shadow"
              onClick={() => onChoice(option.isCorrect, option.feedback)}>
              {String.fromCharCode(65 + index)}: {option.label}
            </Button>
          ))}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
