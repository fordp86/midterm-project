import React, { useState } from "react";
import { Form, Button, Alert } from 'react-bootstrap'
import styles from './GuessingGame.module.css'

function GuessingGame(props){

    let currentGuess;

    const [guess, setGuess] = useState({
        guess: ""
      })

      function handleChange(event) {
        setGuess({ ...guess, [event.target.name]: event.target.value });
      }

    function handleSubmit(event) {
        event.preventDefault()
        props.onNewGuess(parseInt(guess.guess))
      }
    
    function submitGuess(){
        return(
            <Form onSubmit={handleSubmit} >
                <Form.Group className="mb-3" controlId="guesses">
                    <Form.Label>You have made {props.newGuesses.length} guesses</Form.Label>
                    <Form.Control type="text" value={guess.guess} onChange={handleChange} name="guess" placeholder="eg. 1" />
                </Form.Group>
                <Button className={styles.prompt} variant="primary" size="lg" type="submit">
                    Guess
                </Button>
                <Button className={styles.prompt} onClick={props.resetGame} variant="danger" size="lg" type="reset">
                    Reset
                </Button>
            </Form>
        )
    }

    

    function findCurrentGuesss(){
        let guessValue = props.newGuesses
        let getlastGuess = guessValue[guessValue.length - 1]
        return getlastGuess
      }

    function guessToNum(){
        let lastGuess = findCurrentGuesss()
        return lastGuess
    }

    function numberHint(){
       currentGuess = guessToNum()
        if (currentGuess === props.luckynumber) {
            return <Alert className={styles.alert} key={'success'} variant={'success'}>Congrats you guessed it!</Alert>;
          } else if (currentGuess < props.luckynumber) {
            return <Alert className={styles.alert} key={'warning'} variant={'warning'}>Number too low</Alert>;
          } else if (currentGuess > props.luckynumber){
            return <Alert className={styles.alert} key={'danger'} variant={'danger'}>Number is too high</Alert>;
        } else{
            return " ";
        }
    }

    return(
        <div className={styles.guessbody}> 
            <h1>I am thinking of a number between 1 and 100. Guess the Lucky Number!</h1>
            {submitGuess()}
            {numberHint()}
        </div>
    )

}
export default GuessingGame