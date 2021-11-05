import { IsEnum } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class updateTaskStatusDTO {
    @IsEnum(TaskStatus)
    status: TaskStatus;
}