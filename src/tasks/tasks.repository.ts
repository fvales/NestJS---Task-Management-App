import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDTO } from "./dto/get-tasks.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from "src/auth/user.entity";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
    private logger = new Logger('TasksRepository');
    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user
        });

        await this.save(task);
        return task;
    }

    async getTask(filterDto: GetTasksFilterDTO, user: User): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');
        query.where({ user })

        if (status) {
            query.andWhere('task.status = :status', { status: status })
        }

        if (search) {
            query.andWhere('(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))', { search: `%${search}%` })
        }
        try {
            const tasks = await query.getMany();
            return tasks;
        } catch {
            this.logger.error(`Failed to get task`)
            throw new InternalServerErrorException()
        }
    }
}