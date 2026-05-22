import { IntersectionType } from '@nestjs/swagger';
import { NameDto } from '../query-patterns/name.dto';
import { PaginationDto } from '../query-patterns/pagination.dto';
import { TitleDto } from '../query-patterns/title.dto';

export class PaginationTitleAndNameDto extends IntersectionType(PaginationDto, TitleDto, NameDto) {}
