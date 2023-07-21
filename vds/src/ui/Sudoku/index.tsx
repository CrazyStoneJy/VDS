import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import "./index.css";
import { Generator } from "./sudoku";
import DifficultRank from './difficult_rank';
import Cell from "./cell";

const gen = new Generator();

function Sudoku() {
    const [datas, setDatas] = useState<Array<Array<Cell>>>([]);
    const [difficultRank, setDifficultRank] = useState(DifficultRank.EASY);
    const [toggle, setToggle] = useState(true);

    function change(event: any) {
        let rank = DifficultRank.EASY;
        switch (event.target.value) {
            default:
            case "easy":
                rank = DifficultRank.EASY;
            break;
            case "mid":
                rank = DifficultRank.MID;
            break;
            case "difficult":
                rank = DifficultRank.DIFFICULT;
            break;
        }
        setDifficultRank(rank);
    }

    function solution() {
        if (toggle) {
            console.log("toggle on");
            setDatas(gen.getOriginMatrix());
            setToggle(false);
        } else {
            console.log("toggle off");
            setDatas(gen.getMatrix());
            setToggle(true);
        }
    }

    useEffect(() => {
        // Update the document title using the browser API
        console.log(">>>useEffect");
    });

    return (
        <div>
            <div className="broad-title">数独</div>
            <div className="broad-settings">
            <select name="languages" id="rank" onChange={change}>
                <option value="easy">简单</option>
                <option value="mid">中等</option>
                <option value="difficult">困难</option>
            </select>
                <button className="broad-button" onClick={initData}>
                    初始化
                </button>
                <button className="broad-button" onClick={verify}>验证答案</button>
                <button className="broad-button" onClick={solution}>{toggle ? "查看答案" : "隐藏答案"}</button>
                <button className="broad-button">自动解题</button>
                <button className="broad-button" onClick={reset}>
                    重置
                </button>
            </div>
            <div className="broad-container-style">{initBoard()}</div>
        </div>
    );

    function verify() {
        if (!toggle) {
            alert("请关闭答案");
            return;
        }
        if(gen.verify()) {
            alert("解答正确，请点击初始化或者重置，进入下一个题！");
        } else {
            alert("答案不对，请继续答题！");
        }
    }

    function initData() {
        gen.reset();
        setDatas(gen.generate(difficultRank));
    }

    function reset() {
        setDatas([]);
        gen.reset();
    }

    function initBoard(): Array<React.ReactElement> {
        if (!datas) {
            return;
        }
        const boards: ReactElement[] = [];
        for (let i = 0; i < 9; i++) {
            const children = new Array<ReactNode>();
            const data = datas[i];
            for (let j = 0; j < 9; j++) {
                const num = (data && data[j] && data[j].isShowNum && data[j].num) ? data[j].num : "";
                const key = `key_${(i + 1) * (j + 1)}`;
                const isLastRow: boolean = (j === 8);
                const isLastCol: boolean = (i === 8);
                let itemStyle = isLastRow ? "broad-last-row-item-style" : (isLastCol ? "broad-last-col-item-style" : "broad-item-style");
                itemStyle = (isLastCol && isLastRow) ? "broad-last-item-style" : itemStyle;
                itemStyle = (data && data[j] && data[j].isShowBlock) ? `${itemStyle} broad-item-has-num-style` : itemStyle;
                const canClick = data && data[j] && data[j].isShowNum && data[j].isShowBlock ? true : false;
                children.push(
                    <div key={key} className={`${itemStyle}`} onClick={() => {
                        if (canClick) {
                            return;
                        }
                        const filledNum: string = prompt("click");
                        gen.updateUserFillMatrix(i, j, filledNum)
                        setDatas(gen.getUserFilledMatrix());
                    }}>
                        {num}
                    </div>
                );
            }
            const rKey = `r_num${i}`;
            const board = React.createElement(
                "div",
                { className: "broad-row-style", key: rKey },
                children
            );
            boards.push(board);
        }
        return boards;
    }

}

export default Sudoku;
