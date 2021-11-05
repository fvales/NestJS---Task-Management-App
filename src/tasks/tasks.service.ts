import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks.dto';
import { updateTaskStatusDTO } from './dto/update-task-status.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository
    ) { }

    // private tasks: Task[] = [];

    getTasks(filterDto: GetTasksFilterDTO): Promise<Task[]> {
        return this.tasksRepository.getTask(filterDto)
    }

    // getAllTasks() {
    //     return this.tasks;
    // }

    // getTasksByFilters(filterDto: GetTasksFilterDTO): Task[] {
    //     const { status, search } = filterDto;

    //     let tasks = this.getAllTasks();

    //     if (status) {
    //         tasks = tasks.filter((task) => task.status === status)
    //     }

    //     if (search) {
    //         tasks = tasks.filter((task) => {
    //             if (task.title.includes(search) || task.description.includes(search)) {
    //                 return true
    //             }
    //             else return false
    //         })
    //     }
    //     return tasks;
    // }

    async getTaskById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOne(id);
        if (!found) {
            throw new NotFoundException();
        }
        return found;
    }

    // getTaskById(id: string): Task {
    //     const found = this.tasks.find((task) => task.id === id);
    //     if (!found) {
    //         throw new NotFoundException();
    //     }
    //     return found;
    // }

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto);
    }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, description } = createTaskDto;
    //     const task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     };
    //     this.tasks.push(task);
    //     return task;
    // }

    async deleteTask(id: string): Promise<void> {
        const result = await this.tasksRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with id "${id}" not found`)
        }
    }

    // deleteTask(id: string): void {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter((task) => task.id !== id)
    // }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await this.tasksRepository.save(task)
        return task;
    }

    // updateTaskStatus(id: string, updateStatusDto: updateTaskStatusDTO): Task {
    //     const { status } = updateStatusDto;
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}
