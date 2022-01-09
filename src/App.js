import {useState, useEffect} from "react"
import Start from "./components/Start"
import Question from "./components/Question"
import { nanoid } from "nanoid"


export default function App() {
    const [gameStarted, setGameStarted] = useState(false)

    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [checkAnswers, setCheckAnswers] = useState(false)
    const [score, setScore] = useState(0)

    function toggleCheckAnswers() {
        setCheckAnswers(!checkAnswers)
    }
    
    function toggleGameStart() {
        setGameStarted(prevGameStarted => !prevGameStarted)
    }


    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => {
                setQuestions(data.results)
                setAnswers(data.results.map (a => {
                    if (a.type === "boolean") {
                        return [
                            {value: a.correct_answer, correct: true, id:nanoid()},
                            {value: a.incorrect_answers[0], correct: false, id:nanoid()}
                        ]
                    } else {
                        return [
                            {value: a.correct_answer, correct: true, id:nanoid()},
                            {value: a.incorrect_answers[0], correct: false, id:nanoid()},
                            {value: a.incorrect_answers[1], correct: false, id:nanoid()},
                            {value: a.incorrect_answers[2], correct: false, id:nanoid()}
                        ]
                    }
                }))
            })
    },[gameStarted])

    function restart() {
        toggleGameStart();
        toggleCheckAnswers();
        setScore(0)
    }

    return (
        <main >
            {
                gameStarted 
                
                ?
                <div className="container">
                    {questions.map((q, i) => {
                    return <Question 
                                key={i} 
                                question={q} 
                                answers={answers[i]} 
                                checkAnswers={checkAnswers}
                                setScore={setScore}
                                score={score} 
                            />
                    })}
                    <p className="score"><span className={checkAnswers ? "visible" : "invisible"}>You scored {score}/5 correct answers</span>
                    <button className="check--btn endgame" onClick={checkAnswers ? restart : toggleCheckAnswers}>{checkAnswers ? "Play Again" : "Check Answers"}</button></p>
                </div>
            
                : 
               
                <Start startGame={toggleGameStart} />
            }
        </main>
    )
}