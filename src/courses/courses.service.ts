import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import type { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  private readonly items: Course[] = [
    {
      id: '1',
      title: 'Основи веброзробки',
      price: 1200,
      durationHours: 24,
      difficultyLevel: 'beginner',
      instructor: 'Олена Коваль',
    },
    {
      id: '2',
      title: 'TypeScript для розробників',
      price: 1800,
      durationHours: 32,
      difficultyLevel: 'intermediate',
      instructor: 'Андрій Мельник',
    },
    {
      id: '3',
      title: 'Архітектура Node.js',
      price: 2400,
      durationHours: 40,
      difficultyLevel: 'advanced',
      instructor: 'Марія Шевченко',
    },
  ];

  findAll(search?: string, limit?: number): Course[] {
    let result = [...this.items];

    if (search?.trim()) {
      const normalizedSearch = search.trim().toLocaleLowerCase();
      result = result.filter((course) =>
        course.title.toLocaleLowerCase().includes(normalizedSearch),
      );
    }

    if (limit !== undefined && Number.isFinite(limit) && limit >= 0) {
      result = result.slice(0, limit);
    }

    return result;
  }

  findOne(id: string): Course {
    const course = this.items.find((item) => item.id === id);
    if (!course) {
      throw new NotFoundException(`Сутність з ID ${id} не знайдена`);
    }
    return course;
  }

  create(dto: CreateCourseDto): Course {
    const course: Course = { id: randomUUID(), ...dto };
    this.items.push(course);
    return course;
  }

  update(id: string, dto: UpdateCourseDto): Course {
    const course = this.findOne(id);
    Object.assign(course, dto);
    return course;
  }

  remove(id: string): void {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Сутність з ID ${id} не знайдена`);
    }
    this.items.splice(index, 1);
  }
}
