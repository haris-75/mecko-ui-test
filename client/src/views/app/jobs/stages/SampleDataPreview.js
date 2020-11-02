import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap/src";

class SampleDataPreview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false
        }
    }

    toggleModal = () => {
        this.setState(prevState => ({
            modalOpen: !prevState.modalOpen
        }), () => {

        });
    }
    render() {
        const {modalOpen} = this.state;
        return (
            <div>
                <Modal
                    isOpen={modalOpen}
                    toggle={this.toggleModal}
                >
                    <ModalBody>
                        ABC
                        <Button className={'primary'} onClick={() => this.toggleModal()} block>Cancel</Button>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default SampleDataPreview;