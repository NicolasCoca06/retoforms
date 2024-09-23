import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function App() {

  const [formValues, setFormValues] = useState({email:"", password:"", favClass:"1"})

  const [validationStates, setValidationStates] = useState({emailState:true, passwordState: true})

  const handleEmailChange = ((e) => {
    setFormValues({...formValues, email: e.target.value})
  });
 
  const handlePasswordChange = (e => {
    const { value: password } = e.target;
    let hasNumber = false;
    let hasLetter = false;
  
    for (const char of password) {
      if (isNaN(char)) {
        hasLetter = true;
      } else {
        hasNumber = true;
      }
    }
  
    const isValidPassword = password.length > 8 && hasNumber && hasLetter;
  
    setValidationStates(prevState => ({
      ...prevState,
      passwordState: isValidPassword
    }));
  
    setFormValues(prevValues => ({
      ...prevValues,
      password
    }));
  });
  
 
  const handleSelectChange = ((e) => {
    setFormValues({...formValues, favClass: e.target.value})
  });

  const clickSubmit = (() => {
    if(!formValues.email.includes("@")){
      setValidationStates({...validationStates, emailState : false})
    }
    else{
      setValidationStates({...validationStates, emailState : true})

      if(validationStates.passwordState){
        alert(JSON.stringify(formValues));
      }
    }
    
  })



  return (
    <div>
      <h1>Ejemplo de formularios!</h1>
     
      <Form>
      <Form.Group className="mb-6" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} value={formValues.email} style={{border: validationStates.emailState? "": "2px solid orange"}}/>
        { !validationStates.emailState && <Form.Text className="text-muted">Email format is not valid</Form.Text>}
      </Form.Group>
 
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control style={{border: validationStates.passwordState? "": "2px solid orange"}} type="password" placeholder="Password" onChange={handlePasswordChange} value={formValues.password} />
        { !validationStates.passwordState && <Form.Text className="text-muted">Your password should be have numbers and letters and should be at least 9 char long</Form.Text>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Favorite Class</Form.Label>
        <Form.Select onChange={handleSelectChange}>
          <option value="1">ISIS3710</option>
          <option value="2">Programación con tecnologias web</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" onClick={clickSubmit}>
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default App;