import { Module } from '@nestjs/common';
import { HelloWorldService } from './hello-world.service';

@Module({
  controllers: [],
  providers: [HelloWorldService],
  exports: [HelloWorldService],
})
export class HelloWorldModule {}
