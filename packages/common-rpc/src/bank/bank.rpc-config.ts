import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const BANK_RPC_PACKAGE_NAME = 'BANK_PACKAGE';
export const BANK_RPC_SERVICE_NAME = 'BankService';

export const bankRpcOptions: () => GrpcOptions = () => {
  return {
    transport: Transport.GRPC,
    options: {
      package: 'bank',
      protoPath: join(__dirname, './bank.proto'),
      url: 'localhost:5000',
      loader: { keepCase: true, arrays: true, objects: true, enums: String },
    },
  };
};
