/*
 * Class Name: AppModule
 * Version: 2026-11-09
 * Copyright notice: Nguyen Phu Toan - He191566
 */

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard, RolesGuard } from './common/security/security';
import { config } from './config/app.config';
import {
  AppointmentController, AuthController, CatalogController, CustomerLookupController, VehicleController,
} from './controller/controllers';
import { AccountDao, AppointmentDao, CatalogDao, VehicleDao } from './dao/dao';
import { ENTITIES } from './model/entities';
import { AuthService } from './service/account/auth.service';
import { AppointmentService } from './service/appointment/appointment.service';
import { NotificationService } from './service/common/notification.service';
import { VehicleService } from './service/vehicle/vehicle.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.db.host,
      port: config.db.port,
      username: config.db.user,
      password: config.db.password,
      database: config.db.name,
      entities: ENTITIES,
      synchronize: false,            // schema is owned by Giang/database/01_schema.sql (shared database)
      extra: { max: 20 },
    }),
    JwtModule.register({ global: true, secret: config.jwt.secret, signOptions: { expiresIn: config.jwt.expiresIn as any } }),
  ],
  controllers: [AuthController, VehicleController, CatalogController, AppointmentController, CustomerLookupController],
  providers: [
    JwtAuthGuard, RolesGuard,
    AccountDao, VehicleDao, CatalogDao, AppointmentDao,
    NotificationService, AuthService, VehicleService, AppointmentService,
  ],
})
export class AppModule {}
