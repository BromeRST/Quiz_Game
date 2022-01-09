import React from "react"

export default function Start(props) {
    return (
        <main className="intro">
            <h1 className="intro--title">Quizzical</h1>
            <p className="intro--subtitle">Some description if needed</p>
            <button className="intro--button" onClick={props.startGame}>Start quiz</button>
        </main>
    )
}