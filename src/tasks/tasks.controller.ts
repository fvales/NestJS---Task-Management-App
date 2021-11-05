import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks.dto';
import { updateTaskStatusDTO } from './dto/update-task-status.dto';
import { Task } from './task.entity';
// import { Task } from './task-status.enum';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDTO): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto);
    }

    // @Get()
    // getTasks(@Query() filterDto: GetTasksFilterDTO): Task[] {
    //     if (Object.keys(filterDto)?.length) {
    //         return this.tasksService.getTasksByFilters(filterDto);
    //     } else {
    //         return this.tasksService.getAllTasks();
    //     }
    // }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    // @Get('/:id')
    // getTaskById(@Param('id') id: string): Task {
    //     return this.tasksService.getTaskById(id);
    // }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    // @Post()
    // createTask(@Body() createTaskDto: CreateTaskDto): Task {
    //     return this.tasksService.createTask(createTaskDto);
    // }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): Promise<void> {
        return this.tasksService.deleteTask(id);
    }

    // @Delete('/:id')
    // deleteTask(@Param('id') id: string): void {
    //     return this.tasksService.deleteTask(id);
    // }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDTO: updateTaskStatusDTO): Promise<Task> {
        const { status } = updateTaskStatusDTO;
        return this.tasksService.updateTaskStatus(id, status);
    }

    // @Patch('/:id/status')
    // updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDTO: updateTaskStatusDTO): Task {
    //     return this.tasksService.updateTaskStatus(id, updateTaskStatusDTO);
    // }
}
