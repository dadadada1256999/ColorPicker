import RangeInput from './RangeInput';



/**ColorPicker
 * サイト全体を統括する
 * props : なし
 * state : show_toan : string
 *          表示するトーンを決定する
 */
function ColorPicker()
{

  return (
    <div className="color-picker">
      <h2 className="page-title">PCCSトーンピッカー</h2>
      <div className="page-doc">
          <h3>こちらはPCCSトーンに従い作成しております。</h3>
          <h4>PCCSトーンとは、日本色研株式会社が定めた明度と彩度が同じ組み合わせの色を色相環にしたものです</h4>
          <a href="http://www.sikiken.co.jp/pccs/index.html">こちらが日本色研株式会社のサイトです。</a>
      </div>
      <RangeInput key="range-input"/>

      
    </div>
  );
}

export default ColorPicker;