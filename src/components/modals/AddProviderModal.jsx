// components/AddProviderModal.jsx
const AddProviderModal = ({ 
  isOpen, 
  onClose, 
  formData, 
  setFormData,
  handleFormSubmit 
}) => {
  return (
    isOpen && (
      <div className="arkansas-providers-modal-overlay">
        {/* Modal content */}
      </div>
    )
  );
};

export default AddProviderModal;