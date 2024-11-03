import { $Enums } from "@prisma/client";

import { PartialType, PickType } from "@nestjs/swagger";

import { UserDTO } from "./user.dto";

export class CreateUserDTO extends PartialType(
  PickType(UserDTO, [
    "email",
    "provider",
    "providerId",
    "password",
    "username",
  ]),
) {
  username: string;
  email: string;
  provider: $Enums.Provider;
}
