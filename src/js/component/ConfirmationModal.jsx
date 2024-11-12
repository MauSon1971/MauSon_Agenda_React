import React from "react";

const ConfirmationModal = ({ title, message, onCancel, onConfirm }) => {

    return (
        <div className="modal fade" id="confirmationModal" tabIndex="-1" aria-labelledby="confirmationModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="confirmationModalLabel">{title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onCancel}></button>
                    </div>
                    <div className="modal-body">
                        {message}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onCancel}>
                            Cancelar
                        </button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={onConfirm}>
                            Continuar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal