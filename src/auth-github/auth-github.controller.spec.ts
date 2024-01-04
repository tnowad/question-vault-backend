import { Test, TestingModule } from '@nestjs/testing';
import { AuthGithubController } from './auth-github.controller';

describe('AuthGithubController', () => {
  let controller: AuthGithubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthGithubController],
    }).compile();

    controller = module.get<AuthGithubController>(AuthGithubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
