"use client"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContextValExtractor } from '@/global_state/context';
import React, { useState } from 'react';
import { typeOfRecent } from './types/type';

const SectionCounter = () => {
    let { valstate, dispatchVal, recentActivity, setrecentActivity }: any = ContextValExtractor();
    const notify = (errMessage: string) => toast(errMessage);
    console.log(recentActivity)

    const increment = () => {
        dispatchVal({
            method: "add",
            payload: 1
        });
        setrecentActivity({
            payload: "push",
            method: "Add",
            value: 1
        })
    };

    const decrement = () => {
        dispatchVal({
            method: "remove",
            payload: 1
        });
        setrecentActivity({
            payload: "push",
            method: "Removed",
            value: 1
        })

    };

    const handlerSubmit = (e: any) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        let inputVal = formData.get("inputVal");
        let buttonName = e.nativeEvent.submitter.value;
        const input = e.target.querySelector('input[type="number"]');
        if (input) {
            input.value = ''; // Clear the input field
        }
        if (!!inputVal) {
            if (buttonName === "add") {
                dispatchVal({
                    method: "add",
                    payload: inputVal,
                });
                setrecentActivity({
                    payload: "push",
                    method: "Add",
                    value: inputVal
                })

            } else {
                dispatchVal({
                    method: "remove",
                    payload: inputVal,
                });
                setrecentActivity({
                    payload: "push",
                    method: "Removed",
                    value: inputVal
                })
            }
        } else {
            if (buttonName === "add") {
                notify("Value is Required to add");
            } else {
                notify("Value is Required to Decrement");
            }

        }
    }

    function handlecCancel(id: string) {
        setrecentActivity({
            payload: "remove",
            id: id,
        })
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <ToastContainer />
            <div className=" bg-blue-500 text-white p-10 rounded-lg shadow-lg space-y-4">
                <div className='flex w-full'>
                    <div className='px-2 w-full'>
                        <h1 className="text-4xl font-semibold mb-4">{valstate}</h1>
                        <div className="flex space-x-4 w-full">
                            <button
                                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg focus:outline-none"
                                onClick={increment}
                            >
                                Increment
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg focus:outline-none"
                                onClick={decrement}
                            >
                                Decrement
                            </button>
                        </div>
                    </div>
                    <div className='border-l-2 px-2 w-full'>
                        <h2 className='text-xs md:text-base text-gray-300'>
                            Recent Activities
                        </h2>
                        <div className='max-h-16 pr-2 overflow-y-auto scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-300'>
                            {recentActivity.length === 0 ? (
                                <div >
                                    Empty
                                </div>
                            ) :
                                recentActivity.map((item: typeOfRecent, index: number) => (
                                    <div key={index} className='flex w-full justify-between'>
                                        <p>{item.name}</p>
                                        <div className='flex gap-3'>
                                            <p>{item.howMuch}</p> &nbsp;
                                            <button onClick={(e) => handlecCancel(item.id)} className='hover:bg-gray-500 px-2 rounded-full'>x</button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <form onSubmit={handlerSubmit} className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-4">
                    <input
                        type='number'
                        className="bg-transparent ring-2 ring-slate-300 rounded-md focus:outline-none focus:ring-slate-400 px-2"
                        name='inputVal'
                        id='inputVal'
                        placeholder='Input your desired Value'
                        max="8999"
                    />
                    <div className='space-x-2'>
                        <button
                            type='submit'
                            className="bg-red-500 hover:bg-red-600 px-8 py-2 rounded-lg focus:outline-none"
                            value={"add"}
                        >
                            Add
                        </button>
                        <button
                            type='submit'
                            className="bg-red-500 hover:bg-red-600 px-8 py-2 rounded-lg focus:outline-none"
                            value={"dec"}
                        >
                            Dec
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SectionCounter;
