import { PrismaClient, User } from ".prisma/client";
import { Service } from "typedi";
import { HttpException } from "../exceptions/http.exception";
import { compare, hash } from "bcrypt";

@Service()
export class AuthService {
  public users = new PrismaClient().user;
  public async register(userData: User): Promise<User> {
    const existingUser = await this.users.findFirst({
      where: { email: userData.email },
    });
    if (existingUser) {
      throw new HttpException(409, "Email already exists");
    }

    const hashedPassword = await hash(userData.password, 10);
    const user = this.users.create({
      data: { ...userData, password: hashedPassword },
    });

    return user;
  }

  public async login(userData: User): Promise<User> {
    const user = await this.users.findFirst({
      where: { email: userData.email },
    });

    if (!user) throw new HttpException(409, "This user was not found");

    const isPasswordMatching: boolean = await compare(
      userData.password,
      user.password
    );

    if (!isPasswordMatching)
      throw new HttpException(409, "Password is not matching");

    return user;
  }
}
