import { Controller, Get } from '@nestjs/common';
import { HelloWorldService } from '@nx-nestjs-lambda-apigateway/hello-world';

@Controller()
export class AppController {
  constructor(private readonly helloWorldService: HelloWorldService) {}

  @Get()
  getData() {
    return this.helloWorldService.message;
  }
}
