import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from '../querys-patterns/pagination.dto';
import { SearchDto } from '../querys-patterns/search.dto';

export class PaginationSearchDto extends IntersectionType(PaginationDto, SearchDto) {}
