import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ActionModal = props => {
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>{props.header}</ModalHeader>
      <ModalBody>{props.body}</ModalBody>
      <ModalFooter>
        <Button
          color={props.actionButtonColor}
          onClick={() => props.actionConfirmed()}
        >
          {props.actionButtonLabel}
        </Button>{" "}
        <Button color={"default"} onClick={props.toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ActionModal;
