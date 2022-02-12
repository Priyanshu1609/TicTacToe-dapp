import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { ethers } from 'ethers'

import TicTacToe from '../src/artifacts/contracts/Tictactoe.sol/TicTacToe.json'
const contractAddress = '0xE98aC8FEa8167A2FcB9fE086a7dd5C73FB3F8c37'

const Game = () => {
    const router = useRouter();
    const [p1, setP1] = useState('')
    const [p2, setP2] = useState('')
    const [wage, setWage] = useState('0');
    const [order, setOrder] = useState(null);
    const [board, setBoard] = useState([" ", " ", " ", " ", " ", " ", " ", " ", " "]);
    const [winner, setWinner] = useState(null);
    const [full, setFull] = useState(false);
    const [current, setCurrent] = useState(null);
    const [playing, setPlaying] = useState(false);

    const requestAccount = async () => {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }


    const handleWager = async () => {
        if (!wage) return;
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(contractAddress, TicTacToe.abi, signer)
            const transaction = await contract.placeWager({ value: ethers.utils.parseEther(wage) })
            await transaction.wait()
            setPlaying(true)
        }
    }
    const handleInit = async () => {
        if (!p1 || !p2) return;
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(contractAddress, TicTacToe.abi, signer)
            const transaction = await contract.startGame(p1, p2);
            await transaction.wait()
        }
    }
    const handleWin = async () => {
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(contractAddress, TicTacToe.abi, signer)
            const transaction = await contract.isWinner(p1);
            await transaction.wait()
        }
    }

    const first = () => {
        return (["X", "0"])
    }

    const placeMarker = (position) => {
        if(!playing) return;
        console.log("placing marker")
        let currentBoard = board
        if (space_check(position)) {
            console.log("space is free")
            currentBoard[position - 1] = current
            if (current === "X") {
                let newCurrent = "0"

                winCheck("X")
                full_board_check()
                setCurrent(newCurrent);
                setBoard(currentBoard);

            } else {
                let newCurrent = "X"
                winCheck("0")
                full_board_check()
                setCurrent(newCurrent);
                setBoard(currentBoard);
            }
            console.log(currentBoard)
        }
    }

    const displayBoard = () => {
        if (order === null) {
            let order = first()
            setOrder(order);
            setCurrent(order[0]);
        }
        if (winner !== null) {
            console.log("winner +" + winner.toString())
            return (
                <div className="w-full h-screen animated fadeIn faster  fixed  flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover bg-dark backdrop-filter backdrop-blur-sm bg-opacity-20 ">
                    <div className="absolute bg-black opacity-80 inset-0 z-0 ">
                        <div className="w-full   max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg mt-24  bg-white ">
                            <p className="text-5xl text-indigo-900 font-bold font-heading text-center mb-20">{winner[1]} wins! Well done!</p>
                            <p className="text-9xl">🏆</p>
                            <button onClick={() => router.push('/')} className="bg-red-600 text-white p-10 py-2 rounded mt-8 border-2 border-red-600 hover:bg-white hover:text-red-600 object-right mx-8 ">Quit</button>
                        </div>
                    </div>
                </div>
            )
        } else if (full === false) {
            console.log("you can keep playing")
            return (
                <div className="flex flex-col items-center justify-center mt-16">
                    <table className="table-fixed h-60 w-60">
                        <tbody>
                            <tr className="justify-center h-1/3">
                                <td className="border border-yellow-500 hover:bg-blue-100">
                                    <a className="p-8 " onClick={() => placeMarker(7)}>{board[6]}</a>
                                </td>
                                <td className="border border-yellow-500 hover:bg-blue-100">
                                    <a className="p-8 " onClick={() => placeMarker(8)}>{board[7]}</a>
                                </td>
                                <td className="border border-yellow-500 hover:bg-blue-100">
                                    <a className="p-8 " onClick={() => placeMarker(9)}>{board[8]}</a>
                                </td>
                            </tr>
                            <tr className="justify-center h-1/3">
                                <td className="border border-yellow-500 hover:bg-blue-100">
                                    <a className="p-8 " onClick={() => placeMarker(4)}>{board[3]}</a>
                                </td>
                                <td className="border border-yellow-500 hover:bg-blue-100">
                                    <a className="p-8 " onClick={() => placeMarker(5)}>{board[4]}</a>
                                </td>
                                <td className="border border-yellow-500 hover:bg-blue-100">
                                    <a className="p-8 " onClick={() => placeMarker(6)}>{board[5]}</a>
                                </td>
                            </tr>
                            <tr className="justify-center h-1/3">
                                <td className="border border-yellow-500 hover:bg-blue-100">
                                    <a className="p-8 " onClick={() => placeMarker(1)}>{board[0]}</a>
                                </td>
                                <td className="border border-yellow-500  hover:bg-blue-100">
                                    <a className="p-8 " onClick={() => placeMarker(2)}>{board[1]}</a>
                                </td>
                                <td className="border border-yellow-500 hover:bg-blue-100">
                                    <a className="p-8 " onClick={() => placeMarker(3)}>{board[2]}</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <p className="text-gold mt-4">{current} is playing.</p>
                </div>
            )
        } else {
            return (
                <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blackblue text-white">
                    <p className="text-5xl text-indigo-900 font-bold font-heading text-center mb-20">The board is full. This results in a tie. </p>
                    <p className="text-9xl">👔</p>
                </div>
            )
        }

    }

    const winCheck = (marker) => {
        let winning = ["159", "357", "123", "456", "789", "147", "258", "369"]
        let won = false

        for (const solution of winning) {
            if (board[parseInt(solution[0]) - 1] === board[parseInt(solution[1]) - 1] && board[parseInt(solution[1]) - 1] ===
                board[parseInt(solution[2]) - 1] && board[parseInt(solution[1]) - 1] != " ") {
                console.log(marker + " wins! Congratulations!")
                won = true
            }
        }
        if (won === true) {
            handleWin();
            setWinner([won, marker]);
        }

    }

    const space_check = (position) => {
        if (board[position - 1] == "X" || board[position - 1] == "O") {
            return false
        } else {
            return true
        }
    }

    const full_board_check = () => {
        let full = true
        for (const position in board) {
            if (board[position] === " ") {
                full = false
            }
        }

        setFull(full);
    }

    return (
        <div className="min-h-screen w-full flex flex-col bg-blackblue text-white items-center justify-center ">
            <div className="text-center  w-full px-14">
                <h1 className="text-4xl sm:text-5xl mt-3 mb-8">TicTacToe Dapp</h1>
                <div className="flex flex-col lg:flex-row max-w-full mx-auto">
                    <div className="flex lg:w-full mx-2  mt-4  text-black rounded-xl ">
                        <span className=" w-24 rounded-l-lg px-4 py-3 bg-gold">P 1</span>
                        <input name='player1' value={p1} onChange={e => setP1(e.target.value)} className=" rounded-r px-4 py-2 w-3/4 flex-grow" type="text" placeholder="0x560c7D1759b86E3EaD22dc2483AfC8cA67e1f3Ad" />
                    </div>
                    <div className="flex lg:w-full mx-2 mt-4 text-black rounded-xl ">
                        <span className=" w-24 rounded-l-lg px-4 py-3 bg-gold">P 2</span>
                        <input name='player2' value={p2} onChange={e => setP2(e.target.value)} className=" rounded-r px-4 flex-grow w-3/4" type="text" placeholder="0xfB2a58c4a63199b48f1385B945c154D74193dc6c" />
                    </div>

                    <button onClick={handleInit} className="bg-yellow-500 w-36 text-white px-2 py-2 rounded mt-4 border-2 border-yellow-500 hover:bg-white hover:text-yellow-500 lg:ml-8 mx-auto lg:mx-1">Initialize</button>
                </div>
                <div className='flex flex-col lg:flex-row w-full lg:w-1/2 mx-auto '>
                    <div className="flex  mx-auto lg:ml-8 mt-4  text-black rounded-xl">
                        <span className="  rounded-l-lg px-4 py-3 bg-gold">Stake</span>
                        <input value={wage} onChange={e => setWage(e.target.value)} className=" rounded-r px-4 py-2 w-24" type="number" placeholder="10eth" />
                    </div>

                    <button onClick={handleWager} className="bg-yellow-500 w-36 text-white  py-2 rounded mt-4 border-2 border-yellow-500 hover:bg-white hover:text-yellow-500 lg:ml-8 mx-auto lg:mx-1">Place Bets</button>
                </div>

                {displayBoard(board)}

                <button onClick={() => router.push('/')} className="bg-red-600 text-white p-10 py-2 rounded mt-8 border-2 border-red-600 hover:bg-white hover:text-red-600 object-right mx-8 ">Quit</button>
            </div>
        </div>
    )
}


export default Game