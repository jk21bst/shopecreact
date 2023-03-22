import React from 'react';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }
  hadelSubmit = async (event) => {
    await this.validateUser(event);
  }
  validateUser = async (event) => {// console.log("testingValidate");  
    const encodedString = Buffer(this.state.username + ':' + this.state.password).toString('base64');
    await fetch('http://localhost:51350/Account/login',
      {
        method: 'GET',
        headers:
        {
          'Content-Type': 'application/json',
          mode: 'cors',
          Authorization: 'Basic ' + encodedString
        }
      })
      .then(result => {
        if (result.ok) {
          return result.json();
        }

        else if (result.status === 401) {
          alert("you are not authorize to use this application please verify credentials");
          return null;
        }
        else if (result.status === 404) {
          alert("no such login exists");
          return null;
        }
      }, Error => {
        console.log(Error.data);
      })
      .then((data) => {
        if (data != null) {
          window.userId = data.principal.id;
          window.location = `/Produts`;
        }
      })
  }
  handelChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    return (
      <>
        <br />
        <div className="card text-center" style={{ border: '0rem' }}>
          <div className="card-body">
            <div>
              <div>
                <h1 style={{ color: 'red' }}> SIGN IN </h1>
              </div>
              <div>
                <form className='form' onSubmit={this.hadelSubmit}>
                  <p style={{ textAlign: "left" }}>Sign In now </p>
                  <input className='form-control' type='email' id='username' placeholder='Email' name='username' onChange={this.handelChange}></input>
                  <br />
                  <input className='form-control' type='password' id='password' placeholder='Password' name='password' onChange={this.handelChange}></input>
                  <br />
                </form>
                <div style={{ display: "flex" }} >
                  <button type='submit' className='btn btn-primary'
                    style={{ borderRadius: '0rem', marginRight: "auto", backgroundColor: 'rgb(114, 222, 255)', border: '0rem' }} id='signinSubmit' onClick={this.hadelSubmit}>Sign in</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default LoginPage;