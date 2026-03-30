import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Session, SessionSchema } from './schemas/session.schema';
import { SessionRepository } from './repositories/session.repository';

@Module({
  imports:[
    MongooseModule.forFeatureAsync([
      {
        name:Session.name,
        useFactory:()=>{
          const schema = SessionSchema;
          return schema;
        }
      }
    ])
  ],
  providers: [SessionService, SessionRepository],
  exports: [SessionService, SessionRepository]
})
export class SessionModule {}
