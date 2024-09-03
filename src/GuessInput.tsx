import { useEffect, useState } from "react";

export default function GuessInput(){

    const [guess, setGuess] = useState<number>(0);
    const [inputValue, setInputValue] = useState<number | undefined>(undefined);
    const [lastGuess, setLastGuess] = useState<number>(0)
    const [lowest, setLowest] = useState<number>(0)
    const [highest, setHighest] = useState<number>(100)

    const [randomNumber, setRandomNumber] = useState(0)
    const [attempts, setAttempts] = useState(0)
    const [answer, setAnswer] = useState<JSX.Element[]>([])

    // 0 = equal, 1 = higher, -1 = lower
    const [algoDirection, setAlgoDirection] = useState<number>(0)
    useEffect(() => {
        setRandomNumber(Math.floor( Math.random()*100))
        setAnswer([<p>Gæt et tal mellem 0 og 100</p>])
    }, []);

    const handleGuessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(Number(event.target.value));
    };
    function addToAnswer(message: string){
        setAnswer([...answer, <p>{message}</p>])
    }
    function compare(number: number){
        return number - randomNumber
    }
    function getRandomInt(x: number, y: number){ 
    if (x > y) [x, y] = [y, x];

    return Math.floor(Math.random() * (y - x + 1)) + x;
    }
    function giveGuess() {
        if (guess === undefined) return;
    
        setAttempts(attempts + 1);
        const comp = compare(guess);
        if (comp === 0) {
            addToAnswer("Tillykke! Du gættede rigtigt!, Det tog dig " + attempts + " forsøg");
        } else {
            if (comp < 0) {
                addToAnswer("Højere end " + guess);
                setAlgoDirection(1);
                setLowest(guess +1);
            } else {
                addToAnswer("Lavere end " + guess);
                setAlgoDirection(-1);
                setHighest(guess -1);
            }
        }
        setLastGuess(guess);

        console.log("lowest", lowest);
        console.log("highest", highest);
        console.log("lastGuess", lastGuess);
        console.log("direction", algoDirection);
        console.log("guess", guess);
    }
    useEffect(() => {
        if (guess !== undefined && guess !== 0) {
            giveGuess();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [guess]);


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inputValue !== undefined) {
            setGuess(inputValue);
        }
    };



    const giveGuessHandler = () => {
        let newGuess: number;
        // give a random guess between last guess
        newGuess = Math.floor( (highest + lowest) / 2);

        setGuess(newGuess);
    }

    return (
        <>
        <p>{answer}</p>
        <form onSubmit={handleSubmit}>
            <input name="guess" value={inputValue} placeholder="" type="number" onChange={handleGuessChange}></input>
            <button type="submit">Gæt</button>
        </form>
        <button onClick={giveGuessHandler} >Gæt for mig!</button>
        </>
    );



}