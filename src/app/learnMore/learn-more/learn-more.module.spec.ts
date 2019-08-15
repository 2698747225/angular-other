import { LearnMoreModule } from './learn-more.module';

describe('LearnMoreModule', () => {
  let learnMoreModule: LearnMoreModule;

  beforeEach(() => {
    learnMoreModule = new LearnMoreModule();
  });

  it('should create an instance', () => {
    expect(learnMoreModule).toBeTruthy();
  });
});
