import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import './modal.css'
import { FaCreativeCommonsZero } from 'react-icons/fa';
class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            BrandElementName: '',
            BrandElementDescription: '',
            Importance: '',
            Hint: '',
        }
        console.log(props)
    }
    componentDidMount = () => {
        console.log(this.props)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            BrandElementName: nextProps.title,
            BrandElementDescription: nextProps.desc,
            Importance: nextProps.Importance,
            Hint: nextProps.Hint,
        })
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton>
                    <h2 className='bold text-center'>{this.state.BrandElementName}</h2>
                </Modal.Header>
                <Modal.Body>
                    <h4 className='mb-2'>Description:</h4>
                    <p className="desc mb-5">{this.state.BrandElementDescription}</p>
                    <h4 className='mb-2'>Why it is important:</h4>
                    <p className="desc mb-5">{this.state.Importance}</p>
                    <h4 className='mb-2'>Hint:</h4>
                    <p className="desc mb-5">{this.state.Hint}</p>
                </Modal.Body>
            </Modal>
        );
    }
}

export default Popup;