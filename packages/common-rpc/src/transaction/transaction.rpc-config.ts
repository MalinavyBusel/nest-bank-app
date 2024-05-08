import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const TRANSACTION_RPC_PACKAGE_NAME = 'TRANSACTION_PACKAGE';
export const TRANSACTION_RPC_SERVICE_NAME = 'TransactionService';

export const transactionRpcOptions: () => GrpcOptions = () => {
  return {
    transport: Transport.GRPC,
    options: {
      package: 'transaction',
      protoPath: join(__dirname, './transaction.proto'),
      url: 'localhost:5004',
      loader: { keepCase: true, arrays: true, objects: true, enums: String },
    },
  };
};
