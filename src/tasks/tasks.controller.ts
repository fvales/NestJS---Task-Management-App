import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks.dto';
import { updateTaskStatusDTO } from './dto/update-task-status.dto';
import { Task } from './task.entity';
// import { Task } from './task-status.enum';
import { TasksService } from './tasks.service';
import { Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from '../auth/get-user.decorator'
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TasksController');
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDTO, @GetUser() user: User): Promise<Task[]> {
        this.logger.verbose(`Retrieving all tasks. Filters:  ${JSON.stringify(filterDto)}`)
        return this.tasksService.getTasks(filterDto, user);
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
    getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
        return this.tasksService.getTaskById(id, user);
    }

    // @Get('/:id')
    // getTaskById(@Param('id') id: string): Task {
    //     return this.tasksService.getTaskById(id);
    // }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
        this.logger.verbose(`Creating a new task. Data:  ${JSON.stringify(createTaskDto)}`)
        return this.tasksService.createTask(createTaskDto, user);
    }

    // @Post()
    // createTask(@Body() createTaskDto: CreateTaskDto): Task {
    //     return this.tasksService.createTask(createTaskDto);
    // }

    @Delete('/:id')
    deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
        return this.tasksService.deleteTask(id, user);
    }

    // @Delete('/:id')
    // deleteTask(@Param('id') id: string): void {
    //     return this.tasksService.deleteTask(id);
    // }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDTO: updateTaskStatusDTO, @GetUser() user: User): Promise<Task> {
        const { status } = updateTaskStatusDTO;
        return this.tasksService.updateTaskStatus(id, status, user);
    }

    // @Patch('/:id/status')
    // updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDTO: updateTaskStatusDTO): Task {
    //     return this.tasksService.updateTaskStatus(id, updateTaskStatusDTO);
    // }
}
