import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

import { appConfig, databaseConfig, jwtConfig } from './config';
import { DatabaseProvider } from './providers';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { LogistDetailsModule } from './modules/logist-details/logist-details.module';
import { DriverDetailsModule } from './modules/driver-details/driver-details.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { TrailerModule } from './modules/trailer/trailer.module';
import { VacancyModule } from './modules/vacancy/vacancy.module';
import { OfferModule } from './modules/offer/offer.module';
import { ChatModule } from './modules/chat/chat.module';
import { MessageModule } from './modules/message/message.module';
import { FileModule } from './modules/file/file.module';
import { AddressModule } from './modules/address/address.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    DatabaseProvider,
    AuthModule,
    UserModule,
    LogistDetailsModule,
    DriverDetailsModule,
    VehicleModule,
    TrailerModule,
    VacancyModule,
    OfferModule,
    ChatModule,
    MessageModule,
    FileModule,
    AddressModule,
  ],
})
export class AppModule {}

// TODO: Add null type for nullable entity's column
