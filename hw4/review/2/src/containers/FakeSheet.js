import React, {
  Component,
  useEffect,
  useState,
  useRef,
  createRef,
} from "react";
import Header from "../components/Header";

const FakeSheet = () => {
  //
  const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
  const colNumber = [...Array(26).keys()];
  const [colIdx, setColIdx] = useState(colNumber);

  const rowNumber = [...Array(100).keys()].map((x) => ++x);
  const [rowIdx, setRowIdx] = useState(rowNumber);

  const [cellData, setCellData] = useState(
    Array(colIdx)
      .fill(null)
      .map((x) => Array(rowIdx).fill(null))
  );

  const cellRefs = useRef(
    Array.from({ length: rowIdx }, () =>
      Array.from({ length: colIdx }, () => null)
    )
  );

  const singleClick = (row, col) => {
    // if single click => focus the input
    // setFocusedCell(cellId);
    // focusedCell.current[cellId].select();
    console.log(cellData);
    // console.log(cellData[parseInt(cellId[0])][String(cellId[1])]);
    console.log("Single", row, col);
  };

  const doubleClick = (row, col) => {
    // if double click => set cursor position to end of the text
    // setFocusedCell(cellId);
    // focusedCell.current[cellId].blur();
    // focusedCell.current[cellId].focus();
    // focusedCell.current[cellId].setSelectionRange(
    //   cellData[parseInt(cellId[0])][String(cellId[1])].length
    // );
    // console.log(focusedCell.current);
    console.log("Double", row, col);
  };

  let timer;
  const handleClick = (row, col, event) => {
    clearTimeout(timer);
    if (event.detail === 1) {
      timer = setTimeout(singleClick, 200, row, col);
    } else if (event.detail === 2) {
      doubleClick(row, col);
    }
  };

  const handleBlur = (e) => {
    // setFocusedCell("");
  };

  const handleEnter = (row, col, event) => {
    if (event.key === "Enter") {
      console.log("Enter");
    }
  };

  const handleChange = (r, c, e) => {
    // let copy = [...cellData];
    // copy[r][c] = e.target.value;
    // setCellData(copy);
  };

  // useEffect(() => {
  //   cellsRef.current = cellsRef.current
  //     .slice(0, alphabet.length)
  //     .map((row) => row.slice(0, number.length));
  // });

  // const handleCell = (operation) => {
  //   if (focusedCell) {
  //     const [col, row] = [focusedCell[0], focusedCell[1]];
  //   } else {
  //     const [col, row] = [null, null];
  //   }
  //   if (operation === "addrow") {
  //   }
  //   if (operation === "addcol") {
  //   }
  //   if (operation === "delrow") {
  //   }
  //   if (operation === "delcol") {
  //   }
  // };

  return (
    <>
      <div className="fake-sheet__left">
        <button id="buttons">+</button>
        <button id="buttons">-</button>
      </div>
      <div className="fake-sheet__right">
        <div className="fake-sheet__right-top">
          <button id="buttons">+</button>
          <button id="buttons">-</button>
        </div>
        <table className="fake-sheet__right-table">
          <thead>
            <tr>
              <th> </th>
              {colIdx.map((col, i) => {
                return (
                  <th id="column-bar" key={col}>
                    {parseInt(i / 26) === 0
                      ? alphabet[i % 26]
                      : alphabet[parseInt(i / 26)] + alphabet[i % 26]}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rowIdx.map((row, i) => {
              return (
                <tr key={row}>
                  <th id="row-bar">{row}</th>
                  {colIdx.map((col, j) => {
                    return (
                      <td key={`sheet-${row}-${col}`} tabIndex={0}>
                        <div id={`sheet-${row}-${col}`}>
                          <input
                            id={`sheet-${row}-${col}`}
                            onClick={(event) => handleClick(row, col, event)}
                            onKeyDown={(event) => handleEnter(row, col, event)}
                            // ref={(ref) => {
                            // cellRefs.current[row][col].push(ref);
                            // console.log(cellRefs);
                            // console.log(ref);
                            // }}
                            onChange={(event) => handleChange(row, col, event)}
                            // onBlur={handleBlur}
                          ></input>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FakeSheet;
