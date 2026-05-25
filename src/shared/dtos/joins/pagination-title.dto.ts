import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from '../query-patterns/pagination.dto';
import { TitleDto } from '../query-patterns/title.dto';

export class PaginationTitleDto extends IntersectionType(PaginationDto, TitleDto) {}
