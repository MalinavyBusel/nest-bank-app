import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { status } from 'grpc';

@Catch()
export class GrpcExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let message: string;
    let status: number;
    if (this.isRpcException(exception)) {
      status = mapRpcStatusCode(exception.code);
      message = exception.details;
    } else {
      status = exception.status;
      message = exception.message;
    }

    response.status(status).json(message);
  }

  private isRpcException(exception: any): boolean {
    return (
      exception instanceof Error &&
      exception.hasOwnProperty('code') &&
      exception.hasOwnProperty('details') &&
      Object.values(status).includes((exception as any).code)
    );
  }
}

function mapRpcStatusCode(statusCode: number): number {
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
