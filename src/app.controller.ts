import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';


@Controller()
@ApiTags('homepages')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({status: 200, description: 'Welcome to homepage.'})
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
