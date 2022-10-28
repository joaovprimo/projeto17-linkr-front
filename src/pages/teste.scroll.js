import { useState } from "react"
import styled from "styled-components"
import InfiniteScroll from 'react-infinite-scroller';

const arr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
let c=0;
function loadFunc(){

};
export default function TesteScroll(){
    const [algo,setAlgo]= useState([]);
    const [contador,setContador]=useState(1);
    // if(!this.state.isLoading) {
    //     this.props.fetchItems();
    //   }
    // }
    return(
    <Container>
        <InfiniteScroll
            pageStart={0}
            loadMore={loadFunc}
            hasMore={true || false}
            loader={<div className="loader" key={1}>Loading ...</div>}>
                {arr.map((e)=>(
                    <Teste>
                        {e}
                    </Teste>    
                ))}
        </InfiniteScroll>
    
    </Container>)
};

const Teste=styled.div`
    font-size:40px;
    display:flex;
    flex-direction:column;  
`
const Container=styled.div`
    overflow: auto;

`