import Popup from 'reactjs-popup';

type IColorProps = {
    color : string,
    x : number,
    y : number,
    circle_r : number,
    onMouseOver : React.MouseEventHandler,
}

export const ColorBlock :React.FC<IColorProps> = (props) =>
{
    /*props定義 */
    const color = props.color;
    //const range = props.range / 32;
    const mouseOverEvent = props.onMouseOver;

    /*style定義 */
    //const circle_r = 50 - range * 10;
    const circle_r = props.circle_r;
    const block_style = {
        left : props.x,
        top : props.y,
        background : color,
        height : String(circle_r) + 'px',
        width : String(circle_r) + 'px'
    };
    
    return (
        <div className="circle">
            
            <Popup trigger={<div className='color-box'
                                id={color + '-block'}
                                style={block_style}
                                onMouseOver={mouseOverEvent}
                                >
                            </div>
                           }
                    closeOnDocumentClick
            >
                <div className="color-popup">
                    <div className="color-popup-inner">
                        <h1>{color}</h1>
                        <div className="color-doc-box" style={{background : color}}></div>
                    </div>
                </div>
            </Popup>
              
        </div>
    );

}

export default ColorBlock;