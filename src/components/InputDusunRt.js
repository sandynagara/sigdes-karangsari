import React,{useRef, useState,useEffect} from 'react'
import {MdArrowDropDown} from 'react-icons/md'
import './InputDusunRt.css'

const dusun = ["Kamal","Blumbang","Kedungtangkil","Ringinardi","Gunungpentul","Ngruno","Suruhan","Sendang","Kopat","Dukuh","Cekelan","Josutan"]
const rt = ["1","2","3","4","5","6","7","8","9","10"
            ,"11","12","13","14","15","16","17","18","19","20"
            ,"21A","21B","22","23","24","25","26","27","28","29","30"
            ,"31","32","33","34","35","36","37","38","39","40"
            ,"41","42","43","44","45","46","47","48","49","50"
            ,"51","52","53","54","55","56","57","58","59","60"
            ,"61","62","63","64","65","66","67"]

function InputDusunRt({setDataInput,tipeFilter}) {

    const [active, setActive] = useState(false)
    const [dataFillter, setDataFillter] = useState(false)
    const input = useRef()

    function filterItems(arr, query) {
        return arr.filter(function(el) {
          return el.toLowerCase().indexOf(query.toLowerCase()) !== -1
        })
    }

    useEffect(() => {
        input.current.value=""
        if(tipeFilter === "dusun"){
            setDataFillter(dusun)
        }else{
            setDataFillter(rt)
        }
    }, [tipeFilter])

    var onChangeHandle = (e) =>{
        setActive(true);
        if(tipeFilter === "dusun" ){
            setDataFillter(filterItems(dusun,e.target.value))
        }else{
            setDataFillter(filterItems(rt,e.target.value))
        }
    }


    return (
        <div className='input-dusun-rt'>
            <div style={{display:"flex"}}>
                <input ref={input} onChange={onChangeHandle}/>
                <div className='dropdown-input' onClick={()=>setActive(!active)}>
                    <MdArrowDropDown style={{color:"black",width:"20px",height:"20px"}}/>
                </div>
            </div>
            {active && 
                 <div className='dropdown-input-isi'>
                 {dataFillter.map(e=>{
                     return (
                     <div className='item-dropdown' onClick={()=>{
                         setDataInput(e)
                         setActive(false)
                         input.current.value = e
                         }}>
                         <p>{e}</p>
                     </div>)
                 })}
                </div>
            }
           
        </div>
    )
}

export default InputDusunRt
