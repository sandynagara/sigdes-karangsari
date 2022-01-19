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

function Layer({open,setOpacityBasemap,setOpacityBangunan,setOpacityLanduse,setOpacityJalan,setOpacityBatasRt,setOpacitySungai,setOpacityBatasDusun,setOpacityIrigasi}) {
 
    return (
        <div className='layer' style={ open === "Layer" ? {marginLeft:"55px"} :  {marginLeft:"-250px"}}>
            <ItemLayer label="Batas Rt" setOpacity={setOpacityBatasRt}/>
            <ItemLayer label="Batas Dusun" setOpacity={setOpacityBatasDusun}/>
            <ItemLayer label="Basemap" setOpacity={setOpacityBasemap}/>
            <ItemLayer label="Bangunan" setOpacity={setOpacityBangunan}/>
            <ItemLayer label="Irigasi" setOpacity={setOpacityIrigasi}/>
            <ItemLayer label="Jalan" setOpacity={setOpacityJalan}/>
            <ItemLayer label="Penggunaan Lahan" setOpacity={setOpacityLanduse}/>
            <ItemLayer label="Sungai" setOpacity={setOpacitySungai}/>
        </div>
    )
}

export default Layer
