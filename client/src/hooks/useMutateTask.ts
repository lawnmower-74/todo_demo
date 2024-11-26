import axios from 'axios'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Task } from '../types'
import useStore from '../store'

export const useMutateTask = () => {
  const queryClient = useQueryClient()
  const resetEditedTask = useStore((state) => state.resetEditedTask)

  const createTaskMutation = useMutation(
    (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => axios.post<Task>(`${process.env.REACT_APP_API_URL}/`, task),
    {
      onSuccess: (res) => {
        const previousTasks = queryClient.getQueryData<Task[]>(['tasks'])
        if (previousTasks) {
          queryClient.setQueryData(['tasks'], [...previousTasks, res.data])
        }
        resetEditedTask()
      },
      onError: (err: any) => {
        alert('failed to create task.')
        if (err.response.data.message) { console.log(err.response.data.message) }
      },
    }
  )

  const updateTaskMutation = useMutation(
    (task: Omit<Task, 'created_at' | 'updated_at'>) => axios.put<Task>(`${process.env.REACT_APP_API_URL}/${task.id}`, { title: task.title, }),
    {
      onSuccess: (res, variables) => {
        const previousTasks = queryClient.getQueryData<Task[]>(['tasks'])
        if (previousTasks) {
          queryClient.setQueryData<Task[]>(
            ['tasks'],
            previousTasks.map((task) =>
              task.id === variables.id ? res.data : task
            )
          )
        }
        resetEditedTask()
      },
      onError: (err: any) => {
        alert('failed to update task.')
        if (err.response.data.message) { console.log(err.response.data.message) }
      },
    }
  )

  const deleteTaskMutation = useMutation(
    (id: number) =>
      axios.delete(`${process.env.REACT_APP_API_URL}/${id}`),
    {
      onSuccess: (_, variables) => {
        const previousTasks = queryClient.getQueryData<Task[]>(['tasks'])
        if (previousTasks) {
          queryClient.setQueryData<Task[]>(
            ['tasks'],
            previousTasks.filter((task) => task.id !== variables)
          )
        }
        resetEditedTask()
      },
      onError: (err: any) => {
        alert('failed to delete task.')
        if (err.response.data.message) { console.log(err.response.data.message) }
      },
    }
  )

  return {
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
  }
}