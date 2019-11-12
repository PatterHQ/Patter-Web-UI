import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import './modal.css'
class Popup extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton>

                    <h2 className='bold text-center'>Mission or Purpose</h2>
                </Modal.Header>
                <Modal.Body>
                    <h4 className='mb-2'>Why it is important:</h4>
                    <p className="desc mb-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                    <h4 className='mb-2'>Why it is important:</h4>
                    <p className="desc mb-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                    <h4 className='mb-2'>Why it is important:</h4>
                    <p className="desc mb-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                </Modal.Body>
            </Modal>
        );
    }
}

export default Popup;