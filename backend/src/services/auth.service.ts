import { PrismaClient, User } from ".prisma/client";
import { Service } from "typedi";
import { HttpException } from "../exceptions/http.exception";

@Service()
export class AuthService {
  public users = new PrismaClient().user;
  public async register(userData: User): Promise<User> {
    const existingUser = await this.users.findMany({
      where: {
        OR: [{ username: userData.username }, { email: userData.email }],
      },
    });
    if (existingUser.length > 0) {
      throw new HttpException(409, "Username or email already exists");
    }
    const hashedPassword = "";
    const user = this.users.create({
      data: { ...userData, password: hashedPassword },
    });
    return user;
  }
}
