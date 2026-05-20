import { IntersectionType } from '@nestjs/swagger';
import { EmailDto } from '../querys-patterns/email.dto';
import { NameDto } from '../querys-patterns/name.dto';
import { PaginationDto } from '../querys-patterns/pagination.dto';

export class PaginationNameAndEmailDto extends IntersectionType(PaginationDto, NameDto, EmailDto) {}
