import React,{useRef,useEffect} from 'react'
import './Layer.css'

function ItemLayer({setOpacity,label}){
    const input = useRef()

    useEffect(() => {
        if(label==="Penggunaan Lahan"){
            input.current.value = 40
        }else{
            input.current.value = 100
        }
        
    }, [])

    return(<div className='layer-item'>
    <p>{label}</p>
    <input ref={input} type="range" onChange={(e)=>setOpacity(e.target.value)}/>
</div>
    )
}

function Layer({open,setOpacityBasemap,setOpacityBangunan,setOpacityLanduse}) {
 
    return (
        <div className='layer' style={ open === "Layer" ? {marginLeft:"55px"} :  {marginLeft:"-250px"}}>
            <ItemLayer label="Basemap" setOpacity={setOpacityBasemap}/>
            <ItemLayer label="Bangunan" setOpacity={setOpacityBangunan}/>
            <ItemLayer label="Penggunaan Lahan" setOpacity={setOpacityLanduse}/>
        </div>
    )
}

export default Layer
