import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'Returns all posts.' })
  async findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the post with the given ID.',
  })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  async findOne(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
  })
  async create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a post by ID' })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  async update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post by ID' })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  async remove(@Param('id') id: number) {
    return this.postsService.remove(id);
  }
}
