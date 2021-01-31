import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloWorldService {
  public message = 'Hello World!';
}
