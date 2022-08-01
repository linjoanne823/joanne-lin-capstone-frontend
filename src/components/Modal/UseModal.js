import React from "react";
import Modal from "react-modal";
import RecipeDetails from "../RecipeDetails/RecipeDetails";
import "./UseModal.scss";

const UseModal = (props) => {
  return (
    <div>
      <Modal isOpen={true} className="modal">
        <div className="modal__content" onClick={(e) => e.stopPropagation()}>
          <ul className="modal__list">
            <li className="modal__list-item">{props.children}</li>
          </ul>
          <button
            onClick={() => props.closeModal(-1)}
            className="modal__button"
          >
            Back
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UseModal;
