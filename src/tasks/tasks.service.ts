import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model.';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks.dto';
import { updateTaskStatusDTO } from './dto/update-task-status.dto';
@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks() {
        return this.tasks;
    }

    getTasksByFilters(filterDto: GetTasksFilterDTO): Task[] {
        const { status, search } = filterDto;

        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter((task) => task.status === status)
        }

        if (search) {
            tasks = tasks.filter((task) => {
                if (task.title.includes(search) || task.description.includes(search)) {
                    return true
                }
                else return false
            })
        }
        return tasks;
    }

    getTaskById(id: string): Task {
        const found = this.tasks.find((task) => task.id === id);
        if (!found) {
            throw new NotFoundException();
        }
        return found;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };
        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string): void {
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter((task) => task.id !== id)
    }

    updateTaskStatus(id: string, updateStatusDto: updateTaskStatusDTO): Task {
        const { status } = updateStatusDto;
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
