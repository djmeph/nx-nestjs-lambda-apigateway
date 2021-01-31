import { Test } from '@nestjs/testing';
import { HelloWorldService } from './hello-world.service';

describe('HelloWorldService', () => {
  let service: HelloWorldService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [HelloWorldService],
    }).compile();

    service = module.get(HelloWorldService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
