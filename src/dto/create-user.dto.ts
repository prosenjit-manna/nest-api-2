import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty()
  readonly emailId: string;

  @ApiModelProperty()
  readonly password: string;

  @ApiModelProperty({
    required: false,
  })
  readonly name: string;
}
