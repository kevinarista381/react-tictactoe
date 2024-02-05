import React from "react";
import Button from "./Button";

const GeneralModal = ({ isVisible, prompt, buttons = [] }) => {
  return (
    isVisible && (
      <div className="modal">
        <div className="modal-container">
          <div className="modal-prompt">{prompt}</div>

          <div className="modal-footer">
            {!!buttons.length &&
              buttons.map((item) => (
                <Button clickhandler={item.handler} type={item.type}>
                  {item.text}
                </Button>
              ))}
          </div>
        </div>
      </div>
    )
  );
};

export default GeneralModal;
