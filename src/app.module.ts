import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/nestjs'),
    UserModule
  ],


})
export class AppModule {}
