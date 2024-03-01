import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccountsModule } from './accounts/accounts.module';
import { AuthEmailModule } from './auth-email/auth-email.module';
import { AuthGithubModule } from './auth-github/auth-github.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';
import { DatabaseSeederModule } from './database-seeder/database-seeder.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { ConfigsModule } from './configs/configs.module';
import appConfig from './common/configs/app.config';
import jwtConfig from './common/configs/jwt.config';
import databaseConfig from './common/configs/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig],
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get('database.host'),
          port: config.get('database.port'),
          username: config.get('database.username'),
          password: config.get('database.password'),
          database: config.get('database.database'),
          synchronize: true,
          autoLoadEntities: true,
          logging: true,
        };
      },
    }),
    UsersModule,
    AuthModule,
    AccountsModule,
    AuthEmailModule,
    AuthGithubModule,
    PermissionsModule,
    RolesModule,
    DatabaseSeederModule,
    PostsModule,
    CommentsModule,
    ConfigsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
