import { Injectable } from '@nestjs/common';
import { ReportType, data } from 'src/data';
import { ReportResponseDto } from './dtos/report.dto';
@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.report
      .filter((report) => report.type === type)
      .map((report) => new ReportResponseDto(report));
  }
}
