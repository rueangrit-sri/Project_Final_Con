import { CREATE_TASK, GET_TASK_ALL , UPDATE_TASK ,DELETE_TASK} from "@/apis/endpoint.api";
import mainApi from "@/apis/main.api";
import { PayloadCreateTask , PayloadDeleteTask ,PayloadUpdateTask} from "@/types/requests/request.task";
import { TaskResponse } from "@/types/response/response.task";

  
  export const getRole = async () => {
    const { data: response} = await mainApi.get(
        GET_TASK_ALL
    );
    return response;
};

export const postRole = async (data: PayloadCreateTask) => {
  const { data: response } = await mainApi.post<TaskResponse>(
      CREATE_TASK,
      data
  );
  return response;
}

export const patchRole = async (data: PayloadUpdateTask) => {
  const { data: response } = await mainApi.put<TaskResponse>(
      UPDATE_TASK,
      data
  );
  return response;
}


export const deleteRole = async (data: PayloadDeleteTask) => {
  const { data: response } = await mainApi.delete<TaskResponse>(
        DELETE_TASK + "/" + data.task_id
  );
  return response;
}