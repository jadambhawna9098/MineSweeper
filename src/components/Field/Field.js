import React, { useState, useEffect } from "react";
import "./FieldStyles.css";
import fieldUtils from "../../utils/FieldUtils";
import FlagsCounter from "../ControlPanel/FlagsCounter";
import Reset from "../ControlPanel/Reset";
import Timer from "../ControlPanel/Timer";

const Field = () => {
    const [field, setField] = useState([]);
    const [flags, setFlags] = useState(24);
    const [stage, setStage] = useState("init"); // init, playing, ended, won
    const [firstMove, setFirstMove] = useState(true);

    // Creates the initial field when the page is loaded
    useEffect(() => {
        setField(fieldUtils.generateField(9, 9, 10));
    }, []);

    // Handle left click (show content of cell)
    const handleCellClick = (cell, e) => {
        e.preventDefault();
        if (stage === "init") {
            setStage("playing");
            if (!firstMove) {
                setFirstMove(true);
            }
        }
        if (cell.isOpened === false && stage !== "ended" && stage !== "won") {
            let tempArr = [...field];
            tempArr[cell.cellID].isOpened = true;
            if (cell.bombsAround === 0) {
                tempArr = fieldUtils.findEmptyCellsAroundCell(tempArr);
            }
            setField(tempArr);
        }
        if (cell.containBomb) {
            if (!firstMove) {
                handleReset();
            } else {
                let tempArr = [...field];
                setStage("ended");
                tempArr.forEach((cell) => {
                    if (cell.containBomb) {
                        cell.isOpened = true;
                    }
                });
                setField(tempArr);
            }
        }
        if (fieldUtils.checkWin(field, flags)) {
            setStage("won");
        }
    };

    // Handle right click (mark cells)
    const handleContext = (cell, e) => {
        e.preventDefault();
        if (stage === "init") {
            setStage("playing");
        }
        if (cell.isOpened === false && stage !== "ended" && stage !== "won") {
            let increment = cell.isFlagged ? 1 : -1;
            let flagsAfterIncrement = flags + increment;
            if (flagsAfterIncrement >= 0 && flagsAfterIncrement <= 24) {
                let tempArr = [...field];
                tempArr[cell.cellID].isFlagged = !cell.isFlagged;
                setField(tempArr);
                setFlags(flagsAfterIncrement);
            }
        }
        if (fieldUtils.checkWin(field, flags)) {
            setStage("won");
        }
    };

    // Handle click on reset button
    const handleReset = () => {
        // Reset field by creating a new one
        setField(fieldUtils.generateField(9, 9, 10));
        setFlags(24);
        setStage("init");
        setFirstMove(false);
    };



    const generateStyle = (cell) => {
        return cell.isOpened === false ? (cell.isFlagged ? "cell flagged" : "cell") : (cell.containBomb ? "cell fired" : "cell opened");
    };



    const generateContent = (cell) => {
        return cell.isOpened && !cell.containBomb && cell.bombsAround > 0 ? cell.bombsAround : "";
    };

    return (
        <div>
            {/* Adds the control panel components */}
            <div className='control-panel'>
                <FlagsCounter flags={flags} />
                <Reset stage={stage} callback={handleReset} />
                <Timer stage={stage} />
            </div>
            <div className='field'>
                {field.map((cell) => (
                    <div
                        className={generateStyle(cell)}
                        key={cell.cellID}
                        onClick={(e) => handleCellClick(cell, e)}
                        onContextMenu={(e) => handleContext(cell, e)}
                    >
                        {generateContent(cell)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Field;
