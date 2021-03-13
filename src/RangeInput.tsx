import React, { useEffect, useRef, useState} from 'react';
import ColorBlock from './ColorBlock';
import Slider from '@material-ui/core/Slider';
import getUserAgent from './getUserAgent';
import pccmtoan from './color.json';
import { ProSidebar, Menu, MenuItem} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { ColorCircle } from './ColorCircle';

/**TOAN ALL
 * PCCSトーンの一覧を決定する
 */
const TOANALL : string[] = [
  "VIVIT",
  "BRIGHT",
  "STRONG",
  "DEEP",
  "LIGHT",
  "SOFT",
  "DULL",
  "DARK",
  "PALE",
  "LIGHTGRAYISH",
  "GRAYISH",
  "DARKGRAYISH"
];

type IRangeProps = {

};



/**
 * RangeInput : 表示する色を決定するレンジを作る
 * @param nonting
 * @returns render()
 */
export const RangeInput :React.FC<IRangeProps> =  () =>

{
    /*Stateの定義 */
    //表示する色のステータス
    const [range,useRange] = useState(50);
    const setRange = useRange;
    const Range = range;

    //マウスカーソル上の色のステータス
    const [mouse_color,useMouseColor] = useState(''); 
    const setMouseColor = useMouseColor;

    //表示するトーンのステータス
    const [show_toan,useToan] = useState(TOANALL[0]);
    const setToan = useToan;

    //表示する位置のステータス
    const [position,setPosition] = useState({
        weight : 0,
        height : 0,
        r : 0
    });

    /*ref の定義  */
    const circleRef = useRef<HTMLDivElement>(null);

    useEffect(() =>{
        const r_window = circleRef.current?.clientWidth! > circleRef.current?.clientHeight! 
                        ? circleRef.current?.clientHeight! 
                        : circleRef.current?.clientWidth! ; 
        setPosition({
            height : circleRef.current?.clientHeight! / 2,
            weight : circleRef.current?.clientWidth! / 2,
            r : r_window / 2
        }) 
    },[]);
    
    let color_doc_list : {[key:string] : string} = {} ;
  
    for(const [toan_name,toan_doc] of Object.entries(pccmtoan.toandoc))
      {
          color_doc_list[toan_name] =  toan_doc;
          
      }


    /* 色の配列を作成 */
    let items : string[] =　[];

    const color_num : number = 120/range;
    let use_toan_list : string[] = [];

    for(const [toan_name,color_list] of Object.entries(pccmtoan.toan))
    {
        if(toan_name === show_toan){
            use_toan_list = color_list;
        }
    }


    /*トーンとレンジの量で配置する色と数を定義する */
    for (let i=0;i<range;i++)
    {   
        const num :string = (i * color_num).toFixed();
        items.push(use_toan_list[Number(num)]);
    }

    function handleMouseOver(color : string)
    {
        console.log("a");
        setMouseColor(color);
    }

    function handleChange(event :React.ChangeEvent<{}>,newValue :number | number[])
    {
        setRange(newValue as number);
    }

    /*円の定義sをする */
    //itemの数
    const  item_num = items.length;
    //一つずつの位相差
    const deg = 360.0/item_num;
    //角度をrad標記に変化
    const red = (deg*Math.PI/180.0);
    


    //レスポンシブ用(カプセル化すること)
    const na =  getUserAgent(window.navigator.userAgent.toLowerCase());

    
    /*rendering */
    return (
        <div className="circle-changer">
                <div className="side-bar">
                    <h3>トーン一覧</h3>
                    <ProSidebar>
                        <Menu iconShape="square">
                            {
                                Object.entries(color_doc_list).map((value,index) =>{
                                return(
                                    <MenuItem key={index} onClick={() => setToan(value[0])}>{value[0]}</MenuItem>
                                );
                                })
                            }
                        </Menu>
                    </ProSidebar> 
                </div>
                

                
            <div className="Color-circle" ref={circleRef}>
                <ColorCircle   
                                MouseOver={(color : string) => handleMouseOver(color)}
                                items = {items} 
                                red = {red}
                                range = {Range}
                                position = {position}
                />
            </div>

            <div className="range"> 
                <Slider 
                        value={Range} 
                        min = {20}
                        max = {120}
                        onChange={handleChange}
                        style={{bottom:0}}
                        valueLabelDisplay="auto" 
                        aria-labelledby="range-slider" />
            </div>
            {
                na === 'pc' ?(
                    <div className="color-doc-area">
                        <div className="color-doc-box" style={{background : mouse_color}}></div>
                            <div className="color-doc">
                                <h3>RGB : {mouse_color}</h3>
                            </div>
                    </div>
                ) : null
            }
        </div>
    );
}


export default RangeInput;