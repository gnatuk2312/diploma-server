import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FILE_REPOSITORY, FILE_SERVICE } from './file.constants';
import { FileRepository } from './file.repository';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { File } from './entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  providers: [
    {
      provide: FILE_REPOSITORY,
      useClass: FileRepository,
    },
    {
      provide: FILE_SERVICE,
      useClass: FileService,
    },
  ],
  controllers: [FileController],
  exports: [FILE_SERVICE],
})
export class FileModule {}
