import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { SessionModule } from './modules/session/session.module';
import { GeminiModule } from './modules/gemini/gemini.module';
import { ChatModule } from './modules/chat/chat.module';



@Global()
@Module({
    imports:[
        ConfigModule.forRoot({
            envFilePath:'.env.development',
            isGlobal:true
        }),
       MongooseModule.forRootAsync({
        useFactory:(config:ConfigService)=>({
            uri:config.getOrThrow<string>('MONGO_URI'),
            dbName:config.getOrThrow<string>('DB_NAME')
        }),
         inject:[ConfigService]
       }),
       SessionModule,
       GeminiModule,
       ChatModule
    ],
    controllers:[],
    providers:[],
    exports:[]
})
export class ApiConfigModule{

}