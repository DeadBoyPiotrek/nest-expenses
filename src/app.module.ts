import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportController } from './report/report.controller';
import { ReportModule } from './report/report.module';
import { ReportService } from './report/report.service';

@Module({
  imports: [ReportModule],
  controllers: [AppController, ReportController],
  providers: [AppService, ReportService],
})
export class AppModule {}
