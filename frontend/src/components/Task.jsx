import React from 'react'
import TaskEntry from './TaskEntry'





const Task = () => {
  return (
    <div className='flex flex-col my-8 items-center gap-8 justify-center'>
        <h1 className='text-2xl font-bold text-blue-900 '>Create a New Task</h1>
        <TaskEntry/>
    </div>
  )
}

export default Task