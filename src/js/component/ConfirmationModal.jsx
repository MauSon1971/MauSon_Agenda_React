import React, { useEffect, useRef } from "react";

const ConfirmationModal = ({ title, message, onCancel, onConfirm }) => {
    const modalRef = useRef(null); // Referencia al modal de Bootstrap

    useEffect(() => {
        // Inicializa el modal dinámicamente
        if (modalRef.current) {
            const modalInstance = new bootstrap.Modal(modalRef.current);
            modalInstance.show();

            // Limpia el modal al desmontar
            return () => modalInstance.hide();
        }
    }, []);

    return (
        <div className="modal fade" ref={modalRef} id="confirmationModal" tabIndex="-1" aria-labelledby="confirmationModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="confirmationModalLabel">{title}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={onCancel} // Cierra el modal y limpia el estado
                        ></button>
                    </div>
                    <div className="modal-body">
                        {message}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onCancel} // Cierra el modal y limpia el estado
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => {
                                onConfirm(); // Confirma la acción
                                onCancel(); // Limpia el estado y oculta el modal
                            }}
                        >
                            Continuar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;