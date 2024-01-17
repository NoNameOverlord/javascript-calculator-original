import { useState } from 'react'

import './App.css'

function App() {
  const [numbers, setNumbers] = useState("0")
  const [display, setDisplay] = useState("0")

  let regexOpGlobal = /[\+x:\*](?=[0-9])|[\+x:\*](?=-[0-9])|\-?(?=[0-9])[0-9]*\.?[0-9]+/g

  function handleClick(e: any){
    console.log(e.target.value)
    if (e.target.value == "C"){
      setNumbers("0")
      setDisplay("0")
    }
    //if number displayed is longer than 1 and the first digit is 0 and the second isn't a dot
    //just drop the 0
    else if (numbers.length > 1 && numbers[0] == "0" && numbers[1] != "."){
      setNumbers(numbers.slice(1,))
    }

    //if number displayed is 0, substitute with input (but you can't start with x or :)
    else if (numbers == "0" ){
      if (/[x:]/.test(e.target.value)){
        return
      }
      //but if the number displayed is 0 and the input is dot, then set decimal
      else if (e.target.value == "."){
        setNumbers("0.")
        setDisplay("0.")
      }else{
      setNumbers(e.target.value)
      setDisplay(e.target.value)
      }
    }
    //if previous character was dot, you can't dot again
    else if (/\./.test(numbers[numbers.length-1]) && e.target.value == "."){
      return
    }
    //if you input a dot, check if there are 2 dots connected by digits and merge them
    else if (e.target.value == "."){
      if (/\.[0-9]*\./g.test(numbers+".")){
        return
      }
      setNumbers(prev => prev + e.target.value)
      setDisplay(e.target.value)
    }
    //if second-to-last character was an operation and last was 0,
    //if the input is not a dot, update the 0
    else if (/[\+\-:x]/.test(numbers[numbers.length - 2]) && numbers[numbers.length-1] == "0"){
      if (e.target.value != "."){
        setNumbers(prev => prev.slice(0,prev.length-1) + e.target.value)
        setDisplay(e.target.value)
      }      
    }
    //if both the input and the previous element input are
    //operators, reset the display and update history so that
    //the last input operator is the only one 
    else if (regexOpGlobal.test(e.target.value) && regexOpGlobal.test(numbers[numbers.length-1])){
      if (!/\-/.test(e.target.value)){
        setDisplay(e.target.value)
        setNumbers(prev => {
          return prev.slice(0,prev.length-1) + e.target.value
        })
      } 
      else{
        if (/\-/.test(numbers[numbers.length-1])){
          setDisplay(e.target.value)
          setNumbers(prev => {
            return prev.slice(0,prev.length-1) + e.target.value
          })
        }
        else{
          setDisplay(e.target.value)
          setNumbers(prev => {
            return prev + e.target.value
          })
        }
      }
    }
    //if both the input and the previous element input are
    //different, reset the display, but keep the history
    else if(regexOpGlobal.test(e.target.value) != regexOpGlobal.test(numbers[numbers.length-1])){
      setDisplay(e.target.value)
      setNumbers(prev => {
        return prev + e.target.value
      })
    }
    else{
          setNumbers(prevState => {
          return prevState + e.target.value
        })
          setDisplay(prev => {
            return prev + e.target.value
          })
      }
    }

  function calculate(){
    console.log("premuto")
    //trova i -, se quello che è all'indice prima non esiste
    //o appartiene a regexOp, allora si tratta di un numero negativo
    let newNumberList = numbers.match(regexOpGlobal)
    if (!newNumberList){
      return;
    }
  
    let neoNumberList = newNumberList.map(i => i == "x" ? "*" : i)
    neoNumberList = neoNumberList.map(i => i == ":" ? "/" : i)
    
   
    setDisplay(eval(neoNumberList.join("")))
    setNumbers(eval(neoNumberList.join("")))


    
}
  return (
    <>
      <div id="history">{display}</div>
      <div id="display">{numbers}</div>
      <button id="equals" value="=" onClick={calculate}>=</button>
      <button id="zero" value="0" onClick={(e) => handleClick(e)}>0</button>
      <button id="one" value="1" onClick={(e) => handleClick(e)}>1</button>
      <button id="two" value="2" onClick={(e) => handleClick(e)}>2</button>
      <button id="three" value="3" onClick={(e) => handleClick(e)}>3</button>
      <button id="four" value="4" onClick={(e) => handleClick(e)}>4</button>
      <button id="five" value="5" onClick={(e) => handleClick(e)}>5</button>
      <button id="six" value="6" onClick={(e) => handleClick(e)}>6</button>
      <button id="seven" value="7" onClick={(e) => handleClick(e)}>7</button>
      <button id="eight" value="8" onClick={(e) => handleClick(e)}>8</button>
      <button id="nine" value="9" onClick={(e) => handleClick(e)}>9</button>
      <button id="add" value="+" onClick={(e) => handleClick(e)}>+</button>
      <button id="subtract" value="-" onClick={(e) => handleClick(e)}>-</button>
      <button id="multiply" value="x" onClick={(e) => handleClick(e)}>x</button>
      <button id="divide" value=":" onClick={(e) => handleClick(e)}>:</button>
      <button id="decimal" value="." onClick={(e) => handleClick(e)}>.</button>
      <button id="clear" value="C" onClick={(e) => handleClick(e)}>C</button>
    </>
  )
}

export default App
