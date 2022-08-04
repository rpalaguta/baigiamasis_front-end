import React from "react";
import './layout.css'
import NavBar from "../NavBar/NavBar";
import Content from "./Content";

export default function Layout() {
    return (
        <div className="layout">
            <NavBar />
            <Content />
        </div>
    )
}