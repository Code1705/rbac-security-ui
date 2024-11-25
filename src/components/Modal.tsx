import { IoMdClose } from "react-icons/io";
import { useEffect, useRef } from "react";
import { ModalProps } from "../types/index";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title">
      <div
        className="bg-gradient-to-br from-gray-50 to-white shadow-xl rounded-xl w-full max-w-lg p-6 relative transform transition-transform duration-300 scale-95 hover:scale-100"
        ref={modalRef}>
        <div className="flex justify-between items-center mb-4 border-b pb-2 border-gray-200">
          <h2 id="modal-title" className="text-2xl font-bold text-gray-800">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 rounded-full p-1"
            aria-label="Close modal">
            <IoMdClose size={24} />
          </button>
        </div>
        <div className="text-gray-700">{children}</div>
      </div>
    </div>
  );
}
