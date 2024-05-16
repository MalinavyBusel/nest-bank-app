import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { status } from 'grpc';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(200).json({
      statusCode: mapStatusCode(exception.code),
      timestamp: new Date().toISOString(),
      message: exception.details,
    });
  }
}

function mapStatusCode(statusCode: number): number {
  switch (statusCode) {
    case status.PERMISSION_DENIED:
      return 403;
    case status.UNAUTHENTICATED:
      return 401;
    case status.UNKNOWN:
      return 500;
    case status.NOT_FOUND:
      return 404;
    case status.FAILED_PRECONDITION:
      return 404;
    default:
      return 500;
  }
}
