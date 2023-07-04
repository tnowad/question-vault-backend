import { PrismaClient, User } from ".prisma/client";
import { Service } from "typedi";
import { HttpException } from "../exceptions/http.exception";
import { compare } from "bcrypt";

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

  public async login(userData: User): Promise<User> {
    const { username, email } = userData;

    if (!username && !email) {
      throw new HttpException(
        409,
        "Please provide either a username or an email."
      );
    }

    const user = await this.users.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
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
