import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [ inputList, setInputList ] = useState([{value: undefined}]);
  const [ status, setStatus ] = useState(0);
  const [ lot, setLot ] = useState(undefined);

  //+ 누르면 input 추가
  const addList = () => {
    setInputList( inputList.concat([{value: undefined}]));
  }

  //input에 값이 입력되면 state에 set 해주기
  const setValue = (e) => {
    const { id, value } = e.target;
    let copyList = [...inputList];
    copyList[id].value = value;
    
    setInputList(copyList);
  }

  //실행하기를 누르면 당첨자와 클릭 여부가 set 된다
  const execute = () => {

    let list = document.querySelectorAll('input[type="text"]');
    list.forEach((e, i) => {
      if( e.value === '' ){
        e.style.borderColor = 'red';
        return;
      }
    });

    let selectedIndex = Math.floor(Math.random()*(inputList.length+1));
    let who = inputList[selectedIndex].value;
    
    setLot(who);
    setStatus(1);
  }

  //Footer 렌더링
  const renderFooter = () => {
    if(status === 0){
      return <Before onClick={ execute }/>;
    }else{
      return <After onClick={ goBack }/>;
    }
  }

  const goBack = () => {
    
    setStatus(0);
    setLot(undefined);
  }

  //Main 렌더링
  const renderMain = (lot) => {
    if( lot === undefined ){
      return <First onClick={ addList } onChange={ setValue } list = { inputList }/>
    }else{
      return <Result who={lot}/>
    }
  }

  return (
    <div className='App'>
      <Header/>
        <div className='main'>
          { renderMain(lot) }
        </div>
        { renderFooter() }
    </div>
  )
}

function Header(){
  return(
    <div className='header'>
      제비 뽑기
    </div>
  )
}

function Main({value, id, onChange}){
  return(
    <div>
      <input 
        type='text' id={id} className='input' placeholder='Enter the name' 
        value={ value || '' } onChange={ onChange } 
      />
    </div>
  )
}

function Before({onClick}){
  return (
    <div  className='footer' onClick={ onClick }> 
      실행 하기
    </div>
  )
}

function After({ onClick }){
  return(
    <div  className='footer' onClick={ onClick }> 
      돌아 가기
    </div>
  )
}

const scroll = {
  overflowY: 'auto',
  height: '635px'
};

function First({list, onClick, onChange }){
  return (
    <div style={ scroll }>
      {list.map((e,i) => {
        return <Main key={i} value={e.value} id={i} onChange={ onChange }/>
      })}
      <div className='button' onClick={ onClick }> + </div>
    </div>
  )
}

const style = {
  fontSize: '45px',
  fontWeight: '600',
  color: 'gray',
  textShadow : '1px 1px 5px #000'
}

function Result({who}){
  return(
    <div className='result'>
      <div className='lot'>
        당첨자
      </div><br/>
      <div className='who' style={style}> 
        { who } 
      </div>
    </div>
    )
}

export default App;
