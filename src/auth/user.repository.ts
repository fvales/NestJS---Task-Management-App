import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDTO } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async createNewUser(authCredentialsDto: AuthCredentialsDTO): Promise<void> {
        const { username, password } = authCredentialsDto;
        const user = this.create({
            username,
            password
        })
        try {
            await this.save(user);
        } catch (error) {
            console.log(error)
            if (error.code === '23505') {
                // duplicate username
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}