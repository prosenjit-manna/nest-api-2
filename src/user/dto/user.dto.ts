import { ApiModelProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UserDto extends CreateUserDto {
  @ApiModelProperty()
  readonly id: string;
}
