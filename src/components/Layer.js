import React,{useRef,useEffect} from 'react'
import './Layer.css'

function Layer({open,setOpacityBasemap}) {

    const input = useRef()

    useEffect(() => {
        input.current.value = 100
    }, [])

    return (
        <div className='layer' style={ open === "Layer" ? {marginLeft:"55px"} :  {marginLeft:"-250px"}}>
            <div className='layer-item'>
                <p>Basemap</p>
                <input ref={input} type="range" onChange={(e)=>setOpacityBasemap(e.target.value)}/>
            </div>
        </div>
    )
}

export default Layer
