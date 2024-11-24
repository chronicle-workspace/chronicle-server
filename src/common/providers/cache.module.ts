import { redisStore } from "cache-manager-redis-yet";

import { CacheModule, CacheModuleAsyncOptions } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

const options: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService) => {
    const store = await redisStore({
      socket: {
        host: configService.get("REDIS_HOST"),
        port: configService.get("REDIS_PORT"),
      },
    });

    return {
      store,
      ttl: configService.get("CACHE_TTL"),
    };
  },
  inject: [ConfigService],
};

@Module({
  imports: [CacheModule.registerAsync(options)],
})
export class GlobalCacheModule {}
