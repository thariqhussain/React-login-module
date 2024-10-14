import { useState } from "react";

export default function LoginForm() {
  const [enteredCreds, setEnteredCreds] = useState({
    email: '',
    password: '',
  })

  function handleSubmit(event) {
    event.preventDefault();
    console.log(`email: ${enteredCreds.email}`)
    console.log(`password: ${enteredCreds.password}`)
  }

  function handleInputChange(stateObjProp, value){
    setEnteredCreds(prevValue => ({
      ...prevValue,
      [stateObjProp]: value,
    }))
  }

  return (
    <>
    <h3>Login Form</h3>
      <form onSubmit={handleSubmit}>

        <label htmlFor="email"> email
              <input 
                id="email" 
                type="text" 
                name="email" 
                onChange={(event) => handleInputChange('email',event.target.value)}
              />
        </label> <br />

        <label htmlFor="password"> password
            <input 
              id="password" 
              type="password" 
              name="password" 
              onChange={(event) => handleInputChange('password',event.target.value)}
            />
        </label> <br />

        <input type="submit" />
      </form>
    </>
  )
}