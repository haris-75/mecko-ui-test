import React, {Component} from 'react';
import {Modal, ModalHeader, ModalBody, Button} from "reactstrap";
import CreateJob from "../../../jobs/CreateJob";
import Stage from "../../../jobs/Stages/index";

class RightSidebarModal extends Component {
    constructor(props) {
        super(props);
    }

    determineModalBody = (context, toggleModal) => {
        switch (context) {
            case "create_job":
                return <CreateJob {...this.props} />
            case "job_canvas":
                return <Stage {...this.props} />
        }
    }

    render() {
        const { modalOpen, toggleModal, title, context } = this.props;
        const content = this.determineModalBody(context, toggleModal);
        return (
            <Modal
                isOpen={modalOpen}
                toggle={toggleModal}
                wrapClassName="modal-right"
                backdrop={"static"}
            >
                {/*<ModalHeader toggle={toggleModal}>{title}</ModalHeader>*/}
                <ModalBody>
                    {content}
                    <br></br>
                    <Button className={'primary'} onClick={() => this.props.toggleModal()} block>Cancel</Button>
                </ModalBody>
            </Modal>
        );
    }
}

export default RightSidebarModal;