/* eslint-disable */
import { DisplayProcessor, SpecReporter, StacktraceOption } from 'jasmine-spec-reporter';
import SuiteInfo = jasmine.SuiteInfo;

class CustomProcessor extends DisplayProcessor {
  public displayJasmineStarted(info: SuiteInfo, log: string): string {
    return `${log}`;
  }
}

let reporter = new SpecReporter({
  suite: {
    displayNumber: true
  },
  spec: {
    displayStacktrace: StacktraceOption.NONE
  },
  customProcessors: [CustomProcessor]
});

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(reporter);
