import React, { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "react-bootstrap";
import './Square.css'

function Square(props) {
    const [x,setX] = useState(props.x)
    const [y,setY] = useState(props.y)
    const [picked,setPicked] = useState(false)
    const [player,setPlayer] = useState(0)
    const [src,setSrc] = useState("")

    const onClick = useCallback(()=>{
        props.callback(x,y)
        setPicked(true)
        if(props.turnP1){
            setPlayer(1)
            setSrc("https://i.pinimg.com/originals/8f/ba/95/8fba95cd291694e902e7ae7f297b3cf6.jpg")
        }else{
            setPlayer(2)
            setSrc("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR32px4KyXIs6svr8yWww458gg_jr6mmYgmgU-XbduLyvQHJ2q-Q-vUI5ps8-1UYRU-t5Y&usqp=CAU")
        }
    })
    return (
        <Button variant="squareButton" className="squareButton" disabled={picked} onClick={onClick}><img className="squareIcon" src={src ? src 
            : "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/screen-shot-2022-03-18-at-5-05-09-pm-1647648368.png?resize=320:*"}/></Button>
    )
}

export default Square