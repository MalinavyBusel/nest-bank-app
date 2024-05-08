import { join } from 'path';
import { GrpcOptions, Transport } from '@nestjs/microservices';

export const AUTH_RPC_PACKAGE_NAME = 'AUTH_PACKAGE';
export const AUTH_RPC_SERVICE_NAME = 'AuthService';

export const authRpcOptions: () => GrpcOptions = () => {
  return {
    transport: Transport.GRPC,
    options: {
      package: 'auth',
      protoPath: join(__dirname, './auth.proto'),
      url: 'localhost:5002',
      loader: { keepCase: true, arrays: true, objects: true, enums: String },
    },
  };
};
