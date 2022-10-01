 import  { useEffect, useRef, useState } from "react";
import React from 'react';
import './index.css';

interface MyProps {
  children?: React.ReactNode;
}

const Dragable: React.FunctionComponent<MyProps> = props => {
  const [width, setWidth] = useState(200)
  const [height, setHeight] = useState(200)
  const wrapper = useRef<HTMLDivElement>(null)
  const canDrag = useRef(false);
  const canMoveRight = useRef(false);
  const canMoveDown = useRef(false);
  const startXPosition = useRef(0);
  const startYPosition = useRef(0);
  const startWidth = useRef(0);
  const startHeight = useRef(0);

  const onMouseMove = (e: MouseEvent) => {
    if(canDrag.current && canMoveRight.current){
      setWidth(((startWidth.current + e.clientX - startXPosition.current)))
    }
    if(canDrag.current && canMoveDown.current){
      setHeight(((startHeight.current + e.clientY - startYPosition.current)))
    }
  }

  const onMouseDown = (e: React.MouseEvent, axis: {x: boolean, y: boolean}) => {
   canDrag.current = true;
    if (axis.x) {
      canMoveRight.current = true
      startXPosition.current = e.clientX
      startWidth.current = wrapper.current?.offsetWidth || 0
    }
    if (axis.y) {
      canMoveDown.current = true
      startYPosition.current = e.clientY
      startHeight.current = wrapper.current?.offsetHeight || 0
    }
  }


  const onMouseUp = () => {
   canDrag.current = false
   canMoveDown.current = false
   canMoveRight.current = false
  }

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <>
      <div className="ceros-test-draggable__wrapper" ref={wrapper} style={{width:  width+ 'px', height: height+ 'px', display: "inline-block"}}>
        <span>
          Ceros test dragable library
        </span>
        {props.children}
        <div
          className="ceros-test-draggable__resizer ceros-test-draggable__right" 
          onMouseDown={(e) => onMouseDown(e, {x:true, y:false})}
        ></div>
        <div 
          className="ceros-test-draggable__resizer ceros-test-draggable__bottomRight"
          onMouseDown={(e) => onMouseDown(e, {x:true, y:true})}>
        </div>
        <div 
          className="ceros-test-draggable__resizer ceros-test-draggable__bottom"
          onMouseDown={(e) => onMouseDown(e, {x:false, y:true})}>
        </div>
      </div>
    </>
  )
}

export default Dragable;
