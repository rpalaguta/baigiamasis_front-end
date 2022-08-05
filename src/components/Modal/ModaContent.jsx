import React from "react";
import * as ReactDOM from 'react-dom';

export default function ModalContent({ message, onClose }) {

    return (
       <div style={{width: '200px', height: '200px', backgroundColor: 'white' }} className="modalContent">
        <span>{message}</span>
        <button onClick={onClose}>Close</button>
       </div>
    )
}