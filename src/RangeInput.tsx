import { useEffect, useRef, useState} from 'react';
import ColorBlock from './ColorBlock';
import Slider from '@material-ui/core/Slider';
import getUserAgent from './getUserAgent';
import {ThemeProvider} from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import pccmtoan from './color.json';
import theme from './thema';

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



/**
 * レスポンシブ用スタイル決定
 */
const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    [theme.breakpoints.down('sm')]: {
      width : 20,
    },
    [theme.breakpoints.up('md')]: {
      width : 60,
    },
    [theme.breakpoints.up('lg')]: {
      width : 80,
    },
  },
}),
);

/**
 * RangeInput : 表示する色を決定するレンジを作る
 * @param nonting
 * @returns render()
 */
export const RangeInput  =  () =>

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
        setPosition({
            height : circleRef.current?.clientHeight! / 2,
            weight : circleRef.current?.clientWidth! / 2,
            r : circleRef.current?.clientWidth! / 4
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
        setMouseColor(color);
    }

    function handleChange(event : any,newValue :number | number[])
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

    
  
    const classes = useStyles();
    /*rendering */
    return (
        <div className="circle-changer">
                
                <section className="side-bar">
                    {
                        Object.entries(color_doc_list).map((value,index) =>{
                        return(
                            <div key={index} className={classes.root}>
                            <ThemeProvider key={index} theme={theme}>
                                <Button  className="toan" size="large"  key={index}  onClick={() => setToan(value[0])}>
                                {value[0]}
                                </Button>
                                <h2>{value[1]}</h2>
                            </ThemeProvider>
                            </div>
                        );
                        })
                    }
                </section>
            <div className="Color-circle" ref={circleRef}>
                {items.map((item,index) => {
                    return(
                    
                    <ColorBlock key={index}  
                                onMouseOver={() => handleMouseOver(item)}
                                range={Range} 
                                color = {item} 
                                x={Math.cos(red * index) * position.r + position.weight} 
                                y={Math.sin(red * index) * position.r + position.height}
                    />
                    );
                })}
            </div>

            <div className="range"> 
                <Slider 
                        value={Range} 
                        min = {20}
                        max = {120}
                        onChange={handleChange} 
                        valueLabelDisplay="auto" 
                        aria-labelledby="range-slider" />
            </div>
            {
                na === 'pc' ?(
                    <div>
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