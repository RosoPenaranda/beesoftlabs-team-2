import { Test, TestingModule } from '@nestjs/testing';
import { DemoAppController } from './demo-app.controller';
import { DemoAppService } from './demo-app.service';

describe('AppController', () => {
  let appController: DemoAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DemoAppController],
      providers: [DemoAppService],
    }).compile();

    appController = app.get<DemoAppController>(DemoAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
