import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule} from '@nestjs/config';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/app.config';
import { joiValidationSchema } from './config/joi-validation';



@Module({
  imports: [

    ConfigModule.forRoot({
      load:[EnvConfiguration],
      validationSchema: joiValidationSchema,
    }),
  

    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),

    MongooseModule.forRoot(process.env.MONGODB,{
      dbName:'pokemonsdb'
    }),
    PokemonModule,
    CommonModule,
    SeedModule
  ],
  
  
})
export class AppModule {}
