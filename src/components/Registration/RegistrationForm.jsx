import { useState } from "react";

export default function RegistrationForm() {

  const [registeredValue, setRegisteredValue] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [blur, setBlur] = useState(false)

  const isEmailInvalid = blur && !registeredValue.email.includes('@');

  function handleSubmit(event) {
    event.preventDefault();

    fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registeredValue)
    })
    .then(response => response.text())
    // .then(data => console.log(data))
    .catch((err) => {
      console.error('Error', err)
    })
  }

  function handleInputChange(name, value) {
    setRegisteredValue(prevValue => ({
      ...prevValue,
      [name]: value
    }))
    setBlur(false)
  }

  function handleInputBlur() {
    setBlur(true)
  }

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   console.log('User Registered')

  //   const fd = new FormData(event.target);
  //   const termsAndConditions = fd.getAll('termsAndConditions')
  //   const data = Object.fromEntries(fd.entries());
  //   data.termsAndConditions = termsAndConditions;
  //   console.log(data)
  // }

  return (
    <>
    <h3>Registration Form</h3>

    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName"> First name
          <input 
            id="firstName" 
            type="text" 
            name="firstName" 
            value={registeredValue.firstName}
            onChange={(event) => handleInputChange('firstName',event.target.value)}
          />
      </label> <br />

      <label htmlFor="lastName"> Last name
          <input 
            id="lastName" 
            type="text" 
            name="lastName" 
            value={registeredValue.lastName}
            onChange={(event) => handleInputChange('lastName',event.target.value)}
          />
      </label> <br />

      <label htmlFor="email"> Email
          <input 
            id="email" 
            type="text" 
            name="email" 
            onBlur={handleInputBlur}
            value={registeredValue.email}
            onChange={(event) => handleInputChange('email',event.target.value)}
          />
          { isEmailInvalid && <p> please enter valid email </p> }
      </label> <br />
      
      <label htmlFor="phoneNumber"> Phone number
          <input 
            id="phoneNumber" 
            type="number" 
            name="phoneNumber" 
            value={registeredValue.phoneNumber}
            onChange={(event) => handleInputChange('phoneNumber',event.target.value)}
          />
      </label> <br />

      <label htmlFor="password"> password
          <input 
            id="password" 
            type="password" 
            name="password" 
            value={registeredValue.password}
            onChange={(event) => handleInputChange('password',event.target.value)}
          />
      </label> <br />

      <label htmlFor="confirmPassword"> Confirm password
          <input 
            id="confirmPassword" 
            type="password" 
            name="confirmPassword" 
            value={registeredValue.confirmPassword}
            onChange={(event) => handleInputChange('confirmPassword',event.target.value)}
          />
      </label> <br />

      <input type="reset" />
      <input type="submit" />
    </form>
    </>
  )
}
