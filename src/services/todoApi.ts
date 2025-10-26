import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task, CreateTaskRequest } from "../types";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // GET /tasks - get all tasks
    getAllTasks: builder.query<Task[], void>({
      query: () => "/tasks",
    }),

    // GET /tasks/completed - only completed tasks
    getCompletedTasks: builder.query<Task[], void>({
      query: () => "/tasks/completed",
    }),

    // POST /tasks - create new task
    createTask: builder.mutation<Task, CreateTaskRequest>({
      query: (taskData) => ({
        url: "/tasks",
        method: "POST",
        body: taskData,
      }),
      async onQueryStarted(taskData, { dispatch, queryFulfilled }) {
        // new task with temporary ID for optimistic update
        const tempTask: Task = {
          id: `temp-${Date.now()}`,
          text: taskData.text,
          completed: false,
          createdDate: Date.now(),
        };

        // optimistically update the cache
        const patchResult = dispatch(
          todoApi.util.updateQueryData("getAllTasks", undefined, (draft) => {
            draft.unshift(tempTask);
          })
        );

        try {
          // if the query succeeds, get the actual task from the resonse
          const { data: actualTask } = await queryFulfilled;
          // replace temp task with actual task
          dispatch(
            todoApi.util.updateQueryData("getAllTasks", undefined, (draft) => {
              const tempIndex = draft.findIndex((t) => t.id === tempTask.id);
              if (tempIndex !== -1) {
                draft[tempIndex] = actualTask;
              }
            })
          );
        } catch {
          // if the query fails, undo the optimistic update
          patchResult.undo();
        }
      },
    }),

    // POST /tasks/{id} - Update task text
    updateTaskText: builder.mutation<Task, { id: string; text: string }>({
      query: ({ id, text }) => ({
        url: `/tasks/${id}`,
        method: "POST",
        body: { text },
      }),
      async onQueryStarted({ id, text }, { dispatch, queryFulfilled }) {
        const updateTask = (draft: Task[]) => {
          const task = draft.find((t) => t.id === id);
          if (task) {
            task.text = text;
          }
        };

        // both endpoints need to be updated
        const patchResults = [
          dispatch(
            todoApi.util.updateQueryData("getAllTasks", undefined, updateTask)
          ),
          dispatch(
            todoApi.util.updateQueryData(
              "getCompletedTasks",
              undefined,
              updateTask
            )
          ),
        ];

        try {
          await queryFulfilled;
        } catch {
          patchResults.forEach((patch) => patch.undo());
        }
      },
    }),

    // DELETE /tasks/{id} - Delete a task
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const removeTask = (draft: Task[]) => {
          const taskIndex = draft.findIndex((t) => t.id === id);
          if (taskIndex !== -1) {
            draft.splice(taskIndex, 1);
          }
        };

        const patchResults = [
          dispatch(
            todoApi.util.updateQueryData("getAllTasks", undefined, removeTask)
          ),
          dispatch(
            todoApi.util.updateQueryData(
              "getCompletedTasks",
              undefined,
              removeTask
            )
          ),
        ];

        try {
          await queryFulfilled;
        } catch {
          patchResults.forEach((patch) => patch.undo());
        }
      },
    }),

    // POST /tasks/{id}/complete - Mark task as completed
    completeTask: builder.mutation<Task, string>({
      query: (id) => ({
        url: `/tasks/${id}/complete`,
        method: "POST",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResults = [
          dispatch(
            todoApi.util.updateQueryData("getAllTasks", undefined, (draft) => {
              const task = draft.find((t) => t.id === id);
              if (task) {
                task.completed = true;
                task.completedDate = Date.now();
              }
            })
          ),
          dispatch(
            todoApi.util.updateQueryData(
              "getCompletedTasks",
              undefined,
              (draft) => {
                const task = draft.find((t) => t.id === id);
                if (task) {
                  task.completed = true;
                  task.completedDate = Date.now();
                }
              }
            )
          ),
        ];

        try {
          await queryFulfilled;
        } catch {
          patchResults.forEach((patch) => patch.undo());
        }
      },
    }),

    // POST /tasks/{id}/incomplete - Mark task as incomplete
    incompleteTask: builder.mutation<Task, string>({
      query: (id) => ({
        url: `/tasks/${id}/incomplete`,
        method: "POST",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResults = [
          dispatch(
            todoApi.util.updateQueryData("getAllTasks", undefined, (draft) => {
              const task = draft.find((t) => t.id === id);
              if (task) {
                task.completed = false;
                delete task.completedDate;
              }
            })
          ),
          dispatch(
            todoApi.util.updateQueryData(
              "getCompletedTasks",
              undefined,
              (draft) => {
                const taskIndex = draft.findIndex((t) => t.id === id);
                if (taskIndex !== -1) {
                  draft.splice(taskIndex, 1);
                }
              }
            )
          ),
        ];

        try {
          await queryFulfilled;
        } catch {
          patchResults.forEach((patch) => patch.undo());
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetAllTasksQuery,
  useGetCompletedTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskTextMutation,
  useDeleteTaskMutation,
  useCompleteTaskMutation,
  useIncompleteTaskMutation,
} = todoApi;
