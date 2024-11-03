import { $Enums, User } from "@prisma/client";

import { ApiProperty } from "@nestjs/swagger";

export class UserDTO implements User {
  @ApiProperty({ description: "사용자 ID (UUID)" })
  id: string;

  @ApiProperty({ description: "인증 방식" })
  provider: $Enums.Provider;

  @ApiProperty({ description: "Provider ID" })
  providerId: string;

  @ApiProperty({ description: "사용자 이메일" })
  email: string;

  @ApiProperty({ description: "사용자 비밀번호" })
  password: string;

  @ApiProperty({ description: "사용자 이름" })
  username: string;

  @ApiProperty({ description: "사용자 역할", enum: $Enums.UserRole })
  role: $Enums.UserRole;

  @ApiProperty({ description: "사용자 생성일" })
  createdAt: Date;
}
