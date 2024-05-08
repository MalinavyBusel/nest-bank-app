import { join } from 'path';
import { GrpcOptions, Transport } from '@nestjs/microservices';

export const ACCOUNT_RPC_PACKAGE_NAME = 'ACCOUNT_PACKAGE';
export const ACCOUNT_RPC_SERVICE_NAME = 'AccountService';

export const accountRpcOptions: () => GrpcOptions = () => {
  return {
    transport: Transport.GRPC,
    options: {
      package: 'account',
      protoPath: join(__dirname, './account.proto'),
      url: 'localhost:5003',
      loader: { keepCase: true, arrays: true, objects: true, enums: String },
    },
  };
};
