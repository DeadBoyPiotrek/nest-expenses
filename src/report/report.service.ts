import { Injectable } from '@nestjs/common';
import { ReportType, data } from 'src/data';
import { ReportResponseDto, UpdateReportDto } from './dtos/report.dto';
import { v4 as uuid } from 'uuid';
interface Report {
  amount: number;
  source: string;
}

interface UpdateReport {
  amount?: number;
  source?: string;
}

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.report
      .filter((report) => report.type === type)
      .map((report) => new ReportResponseDto(report));
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
    if (!report) return;

    return new ReportResponseDto(report);
  }

  createReport(type: ReportType, { amount, source }: Report) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.report.push(newReport);
    return newReport;
  }

  updateReport(type: ReportType, body: UpdateReport, id: string) {
    const reportToUpdate = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
    if (!reportToUpdate) return 'no report found';
    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    );
    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date(),
    };
    return data.report[reportIndex];
  }

  deleteReport(id) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) return 'report not found';
    data.report.splice(reportIndex, 1);
    return 'report deleted';
  }
}
