import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog';
import type { LearningPageModel } from '../useLearningPage';

interface ResetCodeDialogProps {
  learning: LearningPageModel;
}

export function ResetCodeDialog({ learning }: ResetCodeDialogProps) {
  const { edit, exercise, resetOpen, setResetOpen } = learning;
  return (
    <AlertDialog open={resetOpen} onOpenChange={setResetOpen}>
      <AlertDialogContent>
        <AlertDialogTitle>Kembalikan ke kode awal?</AlertDialogTitle>
        <AlertDialogDescription>
          Perubahan kodemu pada latihan ini akan dihapus dan diganti dengan
          kode awal. Status latihan yang sudah selesai tetap tersimpan.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              edit(exercise.starter);
              setResetOpen(false);
            }}
          >
            Kembalikan kode awal
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
