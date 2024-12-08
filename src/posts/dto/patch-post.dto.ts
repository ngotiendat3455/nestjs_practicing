import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class PatchPostDto extends PartialType(CreatePostDto){
    @ApiProperty({
        description: 'The ID of the user that needs to be updated',
      })
    @IsInt()
    @IsNotEmpty()
      id: number;
}