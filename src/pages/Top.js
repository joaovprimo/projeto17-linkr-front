import styled from "styled-components";
import { IoChevronDownOutline, IoChevronUpSharp } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";
import { DebounceInput } from "react-debounce-input";
import { useEffect, useState, useContext } from "react";
import { getAllUserSearch, getUserInfo, getUserSearch, logoutUser } from "../services/linkr";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext.js";
import { device } from "../mediaqueries/devices";
import { BsCircleFill } from 'react-icons/bs';

export default function Top() {
    const navigate = useNavigate();
    const { search, setSearch } = useContext(UserContext);
    const [logoutClick, setlogoutClick] = useState("down");
    const [users, setUsers] = useState([]);
    const { user, setUser } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState({ email: "", id: null, pictureUrl: "", username: "" })
    const [header, setHeader] = useState("");
    const { searchs, setSearchs } = useContext(UserContext);
    const [ followed,setFollowed]=useState([]);

    useEffect(() => {
        if (!user) {
            const storageUserInfo = JSON.parse(localStorage.getItem("userInfo"));
            if (storageUserInfo) {
                setUser(storageUserInfo);
            };
        };
    }, []);

    useEffect(() => {
        if (user) {
            const promisse = getUserInfo(user.headers);
            promisse.then(authorized);
            promisse.catch(unauthorized);
            setHeader(user.headers);
        };
    }, [user]);

    function authorized(response) {
        setUserInfo(response.data);
    }

    function unauthorized(error) {
        alert(error.message);
    }

    function handleForm(e) {
        setSearch(e.target.value);  
    };

    function logoutIcon(logo,goToMain) {
        if (logo === 'arrow') {
            if (logoutClick === 'down') {
                setlogoutClick('up');
            }
            if (logoutClick === 'up') {
                setlogoutClick('down');
            }
        }
        if (logo === 'menu') {
            setlogoutClick('down');
        }
        if(goToMain){
            navigate('/main');
        }
    }
    function clickSearch(){
        if(searchs!=undefined){
            navigate(`/search?users=${search}`);
            
        }else{
            alert("search for a user (minimum 3 characters)");
        }
    };
    async function logout() {
        setlogoutClick('down');
        try {
            // console.log(user.headers)
            await logoutUser(user.headers);
            localStorage.removeItem("userInfo");
            setUser(undefined);
            navigate('/')
        } catch (error) {
            // console.log(error)
            alert(error?.response.data);
        }
    }
    useEffect(() => {
        if (search != "") {
            getUserSearch(user.userId, search, header).then((e) => {
                setUsers(e.data.users);
                setFollowed(e.data.followed);
            }).catch((e) => {
                console.log(e);
            });
            getAllUserSearch(search, header).then((e) => {
                setSearchs(e.data);
            }).catch((e) => {
                console.log(e);
            });
        }
    }, [search], [users]);
    
    function handleKeyPress(e) {
        if (e.key === "Enter") {
        //   e.preventDefault();
          if(searchs!=undefined){
            navigate(`/search?users=${e.target.value}`);
            setTimeout(()=>{setSearch("")},10);
        }else{
            alert("search for a user (minimum 3 characters)");
        }
        }
      }

    return (<Header onClick={()=>{setSearch("")}}>
        <Logo onClick={() => { logoutIcon('menu',true) }}>Linkr</Logo>
        <EmptySpace onClick={() => { logoutIcon('menu') }}>.</EmptySpace>
        <Search onClick={() => { logoutIcon('menu') }} >
            <SearchUser>
                <DebounceInput onKeyPress={(e) => handleKeyPress(e)} name="searchUser" placeholder="Search for people"
                    minLength={3} debounceTimeout={300} style={styleInput} onChange={(e) => { handleForm(e) }}
                />
                <DivSearch onClick={() => { clickSearch() }}>
                    <BsSearch style={{ color: "#C6C6C6", fontSize: "23px" }} />
                </DivSearch>
            </SearchUser>
            <SerachRender padding={(!users[0] || search.length < 3) ? `${0}px` : `${20}px 0`} >
                {(search.length >= 3) ?
                    users.map((e, i) => (
                        (followed.includes(e.id)) ?
                        <Users key={i} onClick={() => {
                            navigate(`/user/${e.id}`);
                            window.location.reload();
                        }}>
                            <img src={e.pictureUrl} />
                            <h1>{e.username}</h1>
                            <h2><BsCircleFill style={styleIconBall}/>following</h2>
                        </Users>
                        :
                        <Users key={i} onClick={() => {
                            navigate(`/user/${e.id}`);
                            window.location.reload();
                        }}>
                            <img src={e.pictureUrl} />
                            <h1>{e.username}</h1>
                        </Users>
                    )) 
                    : ''}
            </SerachRender>
        </Search>
        <EmptySpace onClick={() => { logoutIcon('menu') }}>.</EmptySpace>
        <Profile>
            {logoutClick === 'down' ? <IoChevronUpSharp onClick={() => { logoutIcon('arrow') }}
                style={{ color: "white", fontSize: "21px" }} />
                :
                <>
                    <IoChevronDownOutline onClick={() => { logoutIcon('arrow') }}
                        style={{ color: "white", fontSize: "21px" }} />
                    <Logout onClick={logout}>Logout</Logout>
                </>}
            <Photo onClick={() => { logoutIcon('menu'); navigate(`/user/${user.userId}`) }} src={userInfo.pictureUrl} />
        </Profile>
    </Header>);
};
const styleIconBall ={
    fontSize:`10px`,
    margin:`0 5px 0 20px`
}
const styleInput = {
    boxSizing: "borderBox",
    width: "563px",
    height: "45px",
    background: "#ffffff",
    borderRadius: "8px 0 0 8px",
    outline: "none",
    border: "1px solid transparent",
    fontFamily: "Lato",
    fontWeight: "400",
    fontSize: "19px",
    lineHeight: "23px",
    padding: "0 20px    ",
    color: "black"
};
const Header = styled.div`
    box-sizing: border-box;
    position: fixed;
    top:0;
    left:0;
    z-index:1;
    width: 100vw;
    height: 75px;
    background-color: #151515;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:0 25px;
`;
const Logo = styled.h1`
    font-family: "Passion One";
    font-style: normal;
    font-weight: 700;
    font-size: 49px;
    color: #ffffff;
`;
const Profile = styled.div`
    display: flex;
    align-items: center;
    width: 100px;
`;
const Photo = styled.img`
    width: 55px;
    height: 55px;
    border-radius: 26.5px;
    margin-left: 15px;
    object-fit: cover;
    cursor: pointer;
`;
const DivSearch = styled.div`
    height: 45px;
    width: 60px;
    box-sizing: border-box;
    background: white;
    border-radius: 0 8px 8px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;
const Search = styled.div`
    display: flex;
    flex-direction: column;
    @media ${device.mobileM} {
        max-width: 50%;
    }
`;
const SearchUser = styled.div`
    display:flex;
    position:relative;
    z-index: 2;
    @media ${device.mobileM} {
        max-width: 70%;
      }
`
const SerachRender = styled.div`
    box-sizing: border-box;
    width: 623px;
    padding: ${e => e.padding};
    background: #E7E7E7;
    position: absolute;
    z-index: 1;
    top: 54px;
    max-height:175px;
    overflow-y: scroll;
    border-radius: 0 0 8px 8px;
    @media ${device.mobileM} {
        max-width: 35%;
    }
`
const Users = styled.div`
    height: 50px;
    display:flex;
    align-items:center;
    padding:0 20px;
    &:hover {
        background: #d3d3d3;
    }
    h1{
        font-family: 'Lato';
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #515151;
        margin-left:20px;
    }
    img{
        width:40px;
        height:40px;
        border-radius:100%;
    }
    h2{
        font-family: 'Lato';
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #C5C5C5;

    }
`
const Logout = styled.div`
    width: 150px;
    height: 47px;
    border-radius: 0 0 20px 20px;
    position: absolute;
    right: 0px;
    top: 75px;
    background-color: #171717;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
`

const EmptySpace = styled.div`
    width: 100%;
    height: 100%;
`

