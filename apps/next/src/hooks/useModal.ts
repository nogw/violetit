import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { pathname } = useRouter();

  const toggleModal = () => setModalOpen(!modalOpen);
  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  useEffect(() => {
    closeModal();
  }, [pathname]);

  return { modalOpen, openModal, closeModal, toggleModal };
};
