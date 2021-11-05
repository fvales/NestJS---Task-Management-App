import { IsEnum } from "class-validator";
import { TaskStatus } from "../task.model.";

export class updateTaskStatusDTO {
    @IsEnum(TaskStatus)
    status: TaskStatus;
}