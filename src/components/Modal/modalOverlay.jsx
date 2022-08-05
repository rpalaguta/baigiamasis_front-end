import React from "react";
import * as ReactDOM from 'react-dom';
// import Modal from "./Modal";
import Modal from 'react-modal';
import ModalContent from "./ModaContent";


export default function ModalOverlay({ message, isOpen, onClose, children, style }) {

    if (!isOpen) return null;
    return ReactDOM.createPortal(
       <div id="modal" style={style}>
        <ModalContent message='test message'/>
       </div>
    ,document.body)
}