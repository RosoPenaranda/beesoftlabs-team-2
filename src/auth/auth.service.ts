import { Injectable } from "@nestjs/common";
import { UserDetails } from "../utils/userType";
import { UserService } from "../components/user/user.service";

@Injectable()
export class AuthService {

  constructor(
    private readonly UserService: UserService
  ) {
  }

  async validateUser(details: UserDetails) {

    console.log('AuthService: ', details);

    const user = await this.UserService.findByEmail(details.email)

    console.log('Function validateUser:', user);

    if(user) return user;
    console.log('User not found. Creating...')

    return await this.UserService.create(details)
  }

  async findUser(email: string) {
    const user = await this.UserService.findByEmail(email);
    console.log('findUser AuthService:', user);
    return user;
  }

}
