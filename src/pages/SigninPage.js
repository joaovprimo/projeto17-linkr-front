import styled from 'styled-components';
import { Grid } from 'react-loader-spinner';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { postLogin } from '../services/linkr.js';
import { device } from '../mediaqueries/devices';

export default function SigninPage() {
    const [signin, setSignin] = useState({ email: "", password: "" });
    const [disableForm, setDisableForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [corEntrar, setCorEntrar] = useState(1);
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            setUser(userInfo);
        }
    }, []);

    useEffect(() => {
        if (user) {
            const userInfo = JSON.stringify(user);
            localStorage.setItem("userInfo", userInfo);
            navigate("/main");
        }
    }, [user]);

    function loginInfo(event) {
        event.preventDefault();
    }

    async function userLogin() {
        setCorEntrar(0.8);
        setDisableForm(true);
        try {
            const token = await postLogin(signin);
            autorizado(token);
        } catch (error) {
            unautorized(error);
        }
    }
    function unautorized(error) {
        console.log(error);
        if (error.message === "Network Error") {
            setErrorMessage(error.message);
        } else {
            setErrorMessage(error.response.data);
        }
        setCorEntrar(1);
        setDisableForm(false);
    }

    function autorizado(token) {
        const tokenAuthorization = {
            headers: {
                "Authorization": `Bearer ${token.data.token}`
            },
            userId: token.data.userid
        }
        console.log(tokenAuthorization);
        setUser(tokenAuthorization);
        setDisableForm(false);
        setCorEntrar(1);
        navigate('/main');
    }

    return (
        <Container>
            <BlackContainer>
                <Title>linkr</Title>
                <Description>save,share and discover the best links on the web</Description>
            </BlackContainer>
            <GrayContainer>
                <Form onSubmit={loginInfo}>
                    <Input type="text" placeholder=' e-mail' onChange={event => setSignin({ ...signin, email: event.target.value })}
                        disabled={disableForm} required />
                    <Input type="password" placeholder=' password' onChange={event => setSignin({ ...signin, password: event.target.value })}
                        disabled={disableForm} required />
                    {typeof errorMessage !== 'string' ? errorMessage.map((msg) => <ErrorMessage>{msg}</ErrorMessage>) :
                        <ErrorMessage>{errorMessage}</ErrorMessage>}
                    <Entrar disabled={disableForm} cor={corEntrar} onClick={userLogin} type="submit">
                        {disableForm ? <div><Grid color='white' radius="10" heigth="90" width="90" /></div> : "Log In"}
                    </Entrar>
                </Form>
                <GoToSingUp onClick={() => { navigate('/sign-up') }}>First time? Create an account!</GoToSingUp>
            </GrayContainer>
        </Container>
    )
}
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;

  @media ${device.mobileM} {
    display: unset;
  }
`;
const BlackContainer = styled.div`
  width: 60%;
  background-color: #151515;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10%;

  @media ${device.mobileM} {
    width: 100%;
    height: 30vh;
    align-items: center;
    padding-left: 0;
  }
`;
const GrayContainer = styled.div`
  width: 40%;
  background-color: #333333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media ${device.mobileM} {
    width: 100%;
    height: 70vh;
    justify-content: start;
    padding-top: 10%;
  }
`;
const Title = styled.div`
  font-size: 106px;
  font-weight: 700;
  width: 442px;
  @media ${device.mobileM} {
    font-size: 76px;
    display: flex;
    justify-content: center;
  }
`;
const Description = styled.div`
  font-size: 43px;
  font-weight: 700;
  width: 442px;
  display: flex;
  overflow-x: auto;
  @media ${device.mobileM} {
    text-align:center;
    font-size: 23px;
    width: 237px;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;
const Input = styled.input`
  margin-top: 10px;
  width: 80%;
  height: 65px;
  background-color: white;
  border-radius: 6px;
  font-size: 20px;
  font-weight: 700;
  font-family: "Oswald";
  @media ${device.mobileM} {
    height: 55px;
  }
`;
const Entrar = styled.button`
  width: 80%;
  height: 65px;
  border-radius: 6px;
  border: none;
  background-color: #1877f2;
  opacity: ${(props) => props.cor};
  color: white;
  font-size: 27px;
  font-weight: 700;
  font-family: "Oswald";
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    height: 30px;
    overflow: hidden;
  }
  @media ${device.mobileM} {
    height: 55px;
  }
`;
const ErrorMessage = styled.div`
  margin-top: 20px;
  color: red;
  font-size: 20px;
  margin-bottom: 10px;
`;
const GoToSingUp = styled.div`
  margin-top: 20px;
  font-size: 20px;
  font-weight: 400;
  font-family: "Lato";
  text-decoration-line: underline;
  color: white;
  display: flex;
  justify-content: center;
`;

export {
    Container,
    BlackContainer,
    GrayContainer,
    Title,
    Description,
    Form,
    Input,
    Entrar,
    ErrorMessage,
    GoToSingUp,
};
