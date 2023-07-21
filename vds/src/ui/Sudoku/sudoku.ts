import { print2DArray, print, print2DCellArray } from "../../utils/arrays";
import Cell from "./cell";
import DifficultRank from './difficult_rank';
import Strings from '../../utils/strings';
import { isEquals } from '../../utils/arrays';

class Generator {

    N = 9;
    BOX_SIZE = 3;
    matrix: Cell[][] = [];
	difficultRank = DifficultRank.EASY;
	originMatrix: Cell[][] = [];
	hasInit = false;
	userFilledMatrix: Cell[][] = [];
	targetArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	constructor() {
		console.log(">>> constructor");
	}

    init() {
		// clear all cells
		if (this.matrix && this.matrix.length > 0) {
			this.matrix = this.matrix.slice(this.matrix.length);
		} else {
			this.matrix = [];
		}
        // init
        for (let i = 0; i < 9; i++) {
            const array: Cell[] = [];
            for (let j = 0; j < 9; j++) {
                array.push(new Cell(0, false, false));
            }
            this.matrix.push(array);
        }
    }

    generate(difficultRank: DifficultRank = DifficultRank.EASY): Cell[][] {
		this.difficultRank = difficultRank;
        // init
        this.init();

        // fill diagonal
        this.fillDiagonal();

        // fill remain
        this.fillRemaining(0, this.BOX_SIZE);

		// save the origin matrix
		this.originMatrix = JSON.parse(JSON.stringify(this.matrix));
		console.log("print origin matrix start:");
		print2DCellArray(this.originMatrix);
		
		// Remove Randomly K digits to make game
		this.removeKDigits();

		// init user filled matrix
		this.initUserFilledMatrix();
		
		console.log("print matrix:");
        print2DCellArray(this.matrix);
        
        return this.userFilledMatrix;
    }

	initUserFilledMatrix() {
		const clonedMatrix: Cell[][] = JSON.parse(JSON.stringify(this.matrix));
		this.userFilledMatrix = clonedMatrix.map(array => {
			return array.map(data => {
				if (!data.isShowNum) {
					data.isShowNum = false;
					data.isShowBlock = false;
					data.num = 0;
				}
				return data;
			})
		});
		return this.userFilledMatrix;
	}

	isInRange(num: number): boolean {
		return num > 0 && num <= 9;
	}

	updateUserFillMatrix(row: number, col: number, numStr: string) {
		const num = Strings.toInt(numStr);
		if (!this.isInRange(num)) {
			console.warn("you input number is out of range, please input number between 1 to 9.");
			return;
		}
		this.userFilledMatrix[row][col] = new Cell(num, true, false);
	}

	getUserFilledMatrix(): Cell[][] {
		return JSON.parse(JSON.stringify(this.userFilledMatrix));
	}

	getRemoveCount(): number {
		switch (this.difficultRank) {
			default:
			case DifficultRank.EASY:
				return DifficultRank.EASY + Math.floor(Math.random() * (DifficultRank.MID - DifficultRank.EASY));
			case DifficultRank.MID:
				return DifficultRank.MID + Math.floor(Math.random() * (DifficultRank.DIFFICULT - DifficultRank.MID))
			case DifficultRank.DIFFICULT:
				return DifficultRank.DIFFICULT + Math.floor(Math.random() * (this.N * this.N - DifficultRank.DIFFICULT))
		}
	}

	// Remove the K no. of digits to
    // complete game
    removeKDigits() {
        let count: number = this.getRemoveCount();
 
        while (count !== 0) {
            // extract coordinates i and j
            const i = Math.floor(Math.random() * this.N);
            const j = Math.floor(Math.random() * this.N);
            if (this.matrix[i][j] &&  this.matrix[i][j].num !== 0) {
                count--;
				const lastCell = this.matrix[i][j];
				lastCell.isShowNum = false;
				lastCell.isShowBlock = false;
                this.matrix[i][j] = lastCell;
            }
        }
 
        return;
    }

    fillDiagonal() {
		for (let i = 0; i < this.N; i += this.BOX_SIZE) {
			// for diagonal box, start coordinates->i==j
			this.fillBox(i, i);
		}
	}

    fillBox(row: number, col: number) {
		let num = 0;
		for (let i = 0; i < this.BOX_SIZE; i++) {
			for (let j = 0; j < this.BOX_SIZE; j++) {
				while (true) {
					num = this.randomGenerator(this.N);
					if (this.unUsedInBox(row, col, num)) {
						break;
					}
				}
				this.matrix[row + i][col + j] = new Cell(num, true, true);
			}
		}
	}

    // Random generator
	randomGenerator(num: number) {
		return Math.floor(Math.random() * num + 1);
	}

    // Returns false if given 3 x 3 block contains num.
	unUsedInBox(rowStart: number, colStart: number, num: number) {
		for (let i = 0; i < this.BOX_SIZE; i++) {
			for (let j = 0; j < this.BOX_SIZE; j++) {
				const cell = this.matrix[rowStart + i][colStart + j];
				if (cell && cell.num === num) {
					return false;
				}
			}
		}
		return true;
	}

    // A recursive function to fill remaining
	// matrix
	fillRemaining(i: number, j: number): boolean {
		// Check if we have reached the end of the matrix
		if (i === this.N - 1 && j === this.N) {
			return true;
		}

		// Move to the next row if we have reached the end of the current row
		if (j === this.N) {
			i += 1;
			j = 0;
		}

		// Skip cells that are already filled
		if (this.matrix[i][j] && this.matrix[i][j].num !== 0) {
			return this.fillRemaining(i, j + 1);
		}

		// Try filling the current cell with a valid value
		for (let num = 1; num <= this.N; num++) {
			if (this.checkIfSafe(i, j, num)) {
				this.matrix[i][j] = new Cell(num, true, true);
				if (this.fillRemaining(i, j + 1)) {
					return true;
				}
				this.matrix[i][j] = null;
			}
		}

		// No valid value was found, so backtrack
		return false;
	}

    // Check if safe to put in cell
	checkIfSafe(i: number, j: number, num: number) {
		return (
			this.unUsedInRow(i, num) &&
			this.unUsedInCol(j, num) &&
			this.unUsedInBox(i - (i % this.BOX_SIZE), j - (j % this.BOX_SIZE), num)
		);
	}

    // check in the row for existence
	unUsedInRow(i: number, num: number) {
		for (let j = 0; j < this.N; j++) {
			if (this.matrix[i][j] && (this.matrix[i][j].num === num)) {
				return false;
			}
		}
		return true;
	}

	// check in the row for existence
	unUsedInCol(j: number, num: number) {
		for (let i = 0; i < this.N; i++) {
			if (this.matrix[i][j] && (this.matrix[i][j].num === num)) {
				return false;
			}
		}
		return true;
	}

	getOriginMatrix(): Cell[][] {
		if (this.hasInit) {
			return this.originMatrix;
		}
		this.hasInit = true;
		const clonedMatrix: Cell[][] = JSON.parse(JSON.stringify(this.matrix));
		this.originMatrix = clonedMatrix.map(array => {
			return array.map(data => {
				data.isShowNum = true;
				return data;
			});
		});
		print2DCellArray(this.originMatrix);
		return this.originMatrix;
	}

	getMatrix(): Cell[][] {
		print2DCellArray(this.matrix);
		return this.matrix;
	}

	reset() {
		this.init();
		this.hasInit = false;
	}

	verify(): boolean {
		console.log("verify user filled matrix: ");
		print2DCellArray(this.userFilledMatrix);
		
		let isValid = false;
		let array: number[] = [];
		// verify row
		for (let i = 0; i < this.N; i++) {
			for (let j = 0; j < this.N; j++) {
				if (this.userFilledMatrix[i][j] && this.userFilledMatrix[i][j].isShowNum) {
					array.push(this.userFilledMatrix[i][j].num);
				}
			}
			isValid = isEquals(array, this.targetArray);
			array = [];
			if (!isValid) {
				return false;
			}
		}

		// verify col
		for (let i = 0; i < this.N; i++) {
			for (let j = 0; j < this.N; j++) {
				if (this.userFilledMatrix[j][i] && this.userFilledMatrix[j][i].isShowNum) {
					array.push(this.userFilledMatrix[j][i].num);
				}
			}
			isValid = isEquals(array, this.targetArray);
			array = [];
			if (!isValid) {
				return false;
			}
		}
		// verify box
		for (let x = 0; x < this.N; x++) {
			const i = Math.floor(x / this.BOX_SIZE);
			const j = x % this.BOX_SIZE;
			for (let k = 0; k < this.BOX_SIZE; k++) {
				for (let w = 0; w < this.BOX_SIZE; w++) {
					if (this.userFilledMatrix[i * this.BOX_SIZE + k][j * this.BOX_SIZE + w] && this.userFilledMatrix[i * this.BOX_SIZE + k][j * this.BOX_SIZE + w].isShowNum) {
						array.push(this.userFilledMatrix[i * this.BOX_SIZE + k][j * this.BOX_SIZE + w].num);
					}
				}
			}
			isValid = isEquals(array, this.targetArray);
			array = [];
			if (!isValid) {
				return false;
			}
		}
		return true;
	}

}


export {
    Generator
}