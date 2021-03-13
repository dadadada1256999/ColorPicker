import React from "react";
import { ColorBlock } from "./ColorBlock";

type IColorCircle = {
    MouseOver : any,
    items : string[],
    red: number,
    range : number,
    position : {
        r : number,
        weight : number,
        height : number
    }
};


export const ColorCircle :React.FC<IColorCircle> = (props) => 
{
    const items = props.items;
    const circle_r = 50 - (props.range/32) * 10;
    return (
        <div className="Color-circle">
                {items.map((item,index) => {
                    return(
                    
                    <ColorBlock key={index}  
                                onMouseOver={() => props.MouseOver(item)}
                                circle_r ={circle_r}
                                color = {item} 
                                x={Math.cos(props.red * index) * props.position.r + props.position.weight} 
                                y={Math.sin(props.red * index) * props.position.r + props.position.height}
                    />
                    );
                })}
        </div>
    );
}

