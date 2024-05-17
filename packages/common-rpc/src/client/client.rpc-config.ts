import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const CLIENT_RPC_PACKAGE_NAME = 'CLIENT_PACKAGE';
export const CLIENT_RPC_SERVICE_NAME = 'ClientService';

export const clientRpcOptions: () => GrpcOptions = () => {
  return {
    transport: Transport.GRPC,
    options: {
      package: 'client',
      protoPath: join(__dirname, './client.proto'),
      url: 'localhost:5001',
      loader: { keepCase: true, arrays: true, objects: true, enums: String },
    },
  };
};
