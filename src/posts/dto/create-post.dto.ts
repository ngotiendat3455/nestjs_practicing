import { IsArray, IsEnum, IsInt, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MinLength, ValidateNested } from "class-validator";
import { postStatus } from "../enum/post-status.enum";
import { PostType } from "../enum/post-type.enum";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { CreatePostMetaOptionsDto } from "src/meta-options/dtos/create-post-meta-options.dto";

export class CreatePostDto {
    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    title: string;

    @IsEnum(PostType)
    @IsNotEmpty()
    postType: PostType;

    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message:
        'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
    })
    slug: string;

    @IsEnum(postStatus)
    @IsNotEmpty()
    status: postStatus;

    @IsOptional()
    @IsString()
    content: string;

    @IsOptional()
    @IsJSON()
    schema: string;

    @IsOptional()
    @IsUrl()
    featuredImageUrl: string;

    @ApiProperty({
        description: 'Must be a valid timestamp in ISO8601',
        example: '2024-03-16T07:46:32+0000',
      })
    @IsISO8601()
    @IsOptional()
    publishOn?: Date;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    @MinLength(3, { each: true })
    tags?: string[];


    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreatePostMetaOptionsDto)
    metaOptions?: CreatePostMetaOptionsDto;

    @ApiProperty({
      type: 'integer',
      required: true,
      example: 1,
    })
    @IsNotEmpty()
    @IsInt()
    authorId: number;
  }