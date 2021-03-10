import Popup from 'reactjs-popup';

function ColorBlock(props : any)
{
    /*props定義 */
    const color = props.color;
    const range = props.range / 32;
    const mouseOverEvent = props.onMouseOver;

    /*style定義 */
    const circle_r = 50 - range * 10;
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
                        <h1>{props.color}</h1>
                        
                    </div>
                </div>
            </Popup>
              
        </div>
    );

}

export default ColorBlock;