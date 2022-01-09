import {useState, useEffect} from "react"

const Question = (props) => {

    const [shuffledAnswers, setShuffledAnswers] = useState([])

    function check(event) {
        if (event.target.value === "true") {
            props.setScore(prevScore => prevScore + 1)
        }
    }


    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));

            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        } 
        return array;
    }

    useEffect(() => {
        setShuffledAnswers(shuffleArray(props.answers))
    },[])

    return (
        <div className="question--container">
            <h3 className="question">{props.question.question}</h3>
            <div className="input--container">
                {shuffledAnswers.map((a, i) =>(
                    <div className="input--single--container" key={a.id}>
                    <input onClick={check} type="radio" name={props.question.question} id={a.id} value={a.correct}/> 
                    <label htmlFor={a.id} className={
                        (a.correct && props.checkAnswers) ? "answer right" : "answer" && 
                        (props.checkAnswers && !a.correct) && "answer wrong transparent" || "answer"}>{a.value}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Question