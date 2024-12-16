import { PickType } from "@nestjs/swagger";

import { DeviceDTO } from "./device.dto";

export class AlertSettingDTO extends PickType(DeviceDTO, ["isAllowed"]) {}
