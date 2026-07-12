import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import { HomepageModule } from './homepage/homepage.module';
import { ProductsModule } from './products/products.module';
import { UploadModule } from './upload/upload.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ServicesModule,
    HomepageModule,
    ProductsModule,
    UploadModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
