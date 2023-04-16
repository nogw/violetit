import { AnimatePresence, motion } from 'framer-motion';

type BackdropProps = {
  isOpen: boolean;
  handleClose?: () => void;
  children?: React.ReactNode;
};

export const Backdrop = ({ isOpen, handleClose, children }: BackdropProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="z-100 fixed top-0 left-0 h-full w-full overflow-y-hidden bg-black bg-opacity-75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
