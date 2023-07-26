import { v4 as uuid } from 'uuid';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReportType } from 'src/data';
import { data } from 'src/data';
@Controller('report/:type')
export class ReportController {
  @Get()
  getReport(@Param('type') type: ReportType) {
    return data.report.filter((report) => report.type === type);
  }
  @Get(':id')
  getReportById(@Param('type') type: ReportType, @Param('id') id: string) {
    return data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
  }
  @Post()
  createReport(
    @Body() { amount, source }: { amount: number; source: string },
    @Param('type') type: ReportType,
  ) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    return newReport;
  }
  @Put()
  updateReport() {
    return 'report updated';
  }
  @Delete()
  getExpenses() {
    return 'report deleted';
  }
}
