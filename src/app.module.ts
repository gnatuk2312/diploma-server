import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { appConfig, databaseConfig, jwtConfig } from './config';
import { DatabaseProvider } from './providers';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { LogistDetailsModule } from './modules/logist-details/logist-details.module';
import { DriverDetailsModule } from './modules/driver-details/driver-details.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { TrailerModule } from './modules/trailer/trailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig],
    }),
    DatabaseProvider,
    AuthModule,
    UserModule,
    LogistDetailsModule,
    DriverDetailsModule,
    VehicleModule,
    TrailerModule,
  ],
})
export class AppModule {}

// TODO: Remove unnecessary awaits
// TODO: Remove public properties
// TODO: Rename all method's prefixes from "find" to "get"
// TODO: Add null type for nullable entity's column
