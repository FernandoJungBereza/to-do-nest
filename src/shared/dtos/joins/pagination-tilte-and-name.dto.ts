import { IntersectionType } from '@nestjs/swagger';
import { NameDto } from '../querys-patterns/name.dto';
import { PaginationDto } from '../querys-patterns/pagination.dto';
import { TitleDto } from '../querys-patterns/title.dto';

export class PaginationTitleAndNameDto extends IntersectionType(PaginationDto, TitleDto, NameDto) {}
